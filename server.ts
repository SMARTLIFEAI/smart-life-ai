import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("smarthome.db");
const JWT_SECRET = process.env.JWT_SECRET || "smart-home-secret-2026";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
  CREATE TABLE IF NOT EXISTS saved_comparisons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category_id TEXT,
    product_ids TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
      const info = stmt.run(email, hashedPassword);
      const token = jwt.sign({ id: info.lastInsertRowid, email }, JWT_SECRET);
      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
      res.json({ id: info.lastInsertRowid, email });
    } catch (err: any) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
    res.json({ id: user.id, email: user.email });
  });

  app.get("/api/auth/me", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json(null);
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json(decoded);
    } catch (err) {
      res.json(null);
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
  });

  // Saved Comparisons Routes
  app.post("/api/comparisons", authenticate, (req: any, res) => {
    const { categoryId, productIds } = req.body;
    const stmt = db.prepare("INSERT INTO saved_comparisons (user_id, category_id, product_ids) VALUES (?, ?, ?)");
    const info = stmt.run(req.user.id, categoryId, JSON.stringify(productIds));
    res.json({ id: info.lastInsertRowid, categoryId, productIds });
  });

  app.get("/api/comparisons", authenticate, (req: any, res) => {
    const rows = db.prepare("SELECT * FROM saved_comparisons WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
    const comparisons = rows.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      categoryId: row.category_id,
      productIds: JSON.parse(row.product_ids),
      createdAt: row.created_at
    }));
    res.json(comparisons);
  });

  app.delete("/api/comparisons/:id", authenticate, (req: any, res) => {
    const stmt = db.prepare("DELETE FROM saved_comparisons WHERE id = ? AND user_id = ?");
    stmt.run(req.params.id, req.user.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
