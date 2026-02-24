/**
 * ==========================================
 * SMART HOME AI - MASTER CONTROL ENGINE
 * ==========================================
 * 23機種全てのスペック、ストーリー、
 * 物理アニメーション、ルーティングを完全制御。
 */

// --- 23 PRODUCTS COMPLETE DATABASE (NO OMISSION) ---
const PRODUCT_DB = {
    cleaning: {
        title: "掃除機",
        subtitle: "10の知性が、床を磨き上げる。",
        labels: ["吸引力", "AI障害物回避", "自動ドック機能", "最大走破段差", "稼働音", "サブスク/月", "設置面積", "Matter連携", "最大稼働時間", "ストーリー"],
        items: {
            r10: { name: "Roomba 10 Max", price: "197,800", specs: ["8,000Pa", "物体学習AI v4", "AutoWashドック", "20mm", "58dB", "800円", "35.3cm", "対応", "180分", "掃除を概念から消し去る、究極の自律。床の汚れを検知し、自ら洗浄、乾燥までを完璧にこなします。"] },
            rj9: { name: "Roomba j9+", price: "129,800", specs: ["10,000Pa相当", "PrecisionVision", "自動ゴミ収集", "20mm", "59dB", "600円", "33.9cm", "非対応", "120分", "信頼のブランドが生んだ進化。ペットの排泄物を回避する知能と、圧倒的な吸引力を両立。"] },
            ri5: { name: "Roomba i5+", price: "79,800", specs: ["標準吸引", "バンパーセンサー", "自動ゴミ収集", "18mm", "62dB", "400円", "34.2cm", "非対応", "75分", "シンプルであることの、スマートな答え。無駄を削ぎ落とし、基本性能を極限まで高めました。"] },
            rs8: { name: "Roborock S8 MaxV", price: "188,000", specs: ["10,000Pa", "3Dストラクチャライト", "全自動Ultraドック", "20mm", "62dB", "900円", "35.0cm", "対応", "180分", "隅々まで磨き上げる、技術の結晶。壁際のゴミを逃さないサイドブラシと、最高クラスの吸引力。"] },
            rqr: { name: "Roborock Q Revo", price: "170,000", specs: ["18,500Pa", "AI回避システム", "全自動ドック", "22mm", "63dB", "700円", "35.3cm", "非対応", "180分", "メンテナンスさえも、ロボットに委ねる。回転モップと強力な乾燥機能で、常に清潔を保ちます。"] },
            ex1: { name: "Eufy X10 Pro", price: "99,990", specs: ["8,000Pa", "AI.See", "Omniドック", "19mm", "60dB", "500円", "35.3cm", "非対応", "120分", "最高峰の機能を、すべての家庭へ。圧倒的なコストパフォーマンスで、スマートホームのハードルを下げます。"] },
            es1: { name: "Eufy S1 Pro", price: "120,000", specs: ["8,000Pa", "3D LiDAR", "浄水循環システム", "20mm", "59dB", "600円", "35.0cm", "非対応", "150分", "常に洗いたての床を。独自の浄水システムにより、汚れた水で床を拭くことは二度とありません。"] },
            dvs: { name: "Dyson Vis Nav", price: "189,200", specs: ["Dyson最強", "360°カメラ", "なし", "21mm", "65dB", "1000円", "33.0cm", "非対応", "50分", "ダイソンの吸引力、ついに全自動へ。サイクロンテクノロジーをそのままロボットに凝縮。"] },
            prs: { name: "Panasonic RSF1000", price: "148,000", specs: ["高精度センサー", "レーザーSLAM", "自動収集", "25mm", "56dB", "700円", "34.5cm", "非対応", "100分", "日本の住環境を考え抜いた、角に強い形。ルーロが、あなたの家の隅々まで理解します。"] },
            sk1: { name: "SwitchBot K10+", price: "59,800", specs: ["2,500Pa", "LiDAR", "世界最小級ドック", "15mm", "45dB", "300円", "24.8cm", "非対応", "120分", "日本の家のために生まれた、最小の相棒。椅子の脚の間もスイスイ通り抜けます。"] }
        }
    },
    lighting: {
        title: "照明",
        subtitle: "7つの光が、感情を灯す。",
        labels: ["最大輝度", "演色性", "色彩", "安定性", "同期機能", "レスポンス", "設置方式", "寿命", "消費電力", "ストーリー"],
        items: {
            hwg: { name: "Hue ホワイトグラデ", price: "12,000", specs: ["800lm", "Ra 90", "暖白〜冷白", "Zigbee", "不可", "0.1s", "E26", "25,000h", "9W", "体内時計を整える、上質な光。一日のリズムに合わせて、自動で光の色を変えられます。"] },
            hfc: { name: "Hue フルカラー", price: "16,800", specs: ["1,100lm", "Ra 90", "1,600万色", "Zigbee", "可能", "0.1s", "E26", "25,000h", "11W", "色彩が、暮らしの質を変えていく。どんなシーンも、一瞬であなたの好みの色に染め上げます。"] },
            hpb: { name: "Hue Playバー", price: "14,000", specs: ["530lm", "Ra 90", "1,600万色", "Zigbee", "最適", "0.1s", "据置", "25,000h", "6W", "エンターテインメントを、部屋全体へ。映画やゲームの画面と同期し、没入感を最大化します。"] },
            nsh: { name: "Nanoleaf Shapes", price: "28,500", specs: ["100lm/枚", "Ra 80", "1,600万色", "Wi-Fi", "音楽連動", "タッチ", "壁貼", "25,000h", "2W/枚", "触れるアート、踊る光。壁面を自由自在にカスタマイズし、あなただけの光の彫刻を。"] },
            nes: { name: "Nanoleaf Essentials", price: "3,500", specs: ["800lm", "Ra 90", "1,600万色", "Thread", "可能", "0.2s", "E26", "25,000h", "9W", "Matter時代の新基準。Thread通信により、驚くほど安定した操作と高速な反応を実現。"] },
            scl: { name: "SwitchBot シーリング", price: "12,000", specs: ["5,499lm", "Ra 85", "暖白〜冷白", "Wi-Fi", "不可", "標準", "引掛", "40,000h", "40W", "家中をスマート化するハブ。照明としての性能はもちろん、赤外線リモコン機能で家電を統合。"] },
            itr: { name: "IKEA TRÅDFRI", price: "3,990", specs: ["806lm", "Ra 80", "暖白〜冷白", "Zigbee", "不可", "標準", "E26", "25,000h", "9W", "もっと身近に、スマートな光を。民主的なデザインと手頃な価格で、誰でも始められるスマートライフ。"] }
        }
    },
    security: {
        title: "防犯",
        subtitle: "6つの眼差しが、安心を刻む。",
        labels: ["解像度", "視野角", "AI検知", "ナイトビジョン", "電源供給", "保存先", "双方向通話", "耐候性", "サイレン", "ストーリー"],
        items: {
            ap5: { name: "Arlo Pro 5", price: "34,800", specs: ["2K HDR", "160°", "人車荷物", "カラー", "電池", "クラウド", "あり", "IP65", "あり", "一歩先を照らす、2Kの真実。高解像度な映像と、夜間でも鮮明なカラー表示で安心を。"] },
            au2: { name: "Arlo Ultra 2", price: "50,000", specs: ["4K HDR", "180°", "人車荷物", "カラー", "電池", "ローカル", "あり", "IP65", "あり", "4Kが見せる、圧倒的な証拠。広大な視野角と最高峰の解像度で、死角を一切許しません。"] },
            ngc: { name: "Google Nest Cam", price: "23,900", specs: ["1080p", "135°", "顔認識", "赤外線", "電池", "クラウド", "あり", "IP54", "なし", "知的な知覚。Googleの高度なAIが、大切な出来事だけを正確に通知します。"] },
            ngd: { name: "Google Nest Doorbell", price: "23,900", specs: ["960p", "145°", "顔認識", "赤外線", "電池", "クラウド", "あり", "IP54", "あり", "玄関から、スマートな対話を。不在時でも、スマートフォンから来客とリアルタイムに話せます。"] },
            rbd: { name: "Ring Doorbell Plus", price: "24,980", specs: ["1536p", "150°", "荷物検知", "カラー", "電池", "クラウド", "あり", "耐候", "あり", "頭から足元まで、死角なし。荷物の置き配も、玄関先の不審な動きも逃さずキャッチ。"] },
            es3: { name: "Eufy SoloCam S340", price: "24,900", specs: ["3K", "360°", "AI追尾", "カラー", "ソーラー", "ローカル", "あり", "IP65", "あり", "死角なし、ソーラー駆動の自由。360°のパンチルト機能で、家中を完璧に監視します。"] }
        }
    }
};

// --- CORE ENGINE MODULES ---

/**
 * Routing & View Navigation
 */
const Router = {
    currentCategory: 'cleaning',
    
    go(viewId, param = null) {
        // Close menus first
        MegaMenu.hide();
        MobileMenu.close();
        
        // Update data context
        if (param) this.currentCategory = param;
        
        // View switch with fade effect
        const sections = document.querySelectorAll('.view-section');
        sections.forEach(s => s.classList.remove('active'));
        
        const target = document.getElementById(`view-${viewId}`);
        target.classList.add('active');
        
        // Trigger specific view renders
        if (viewId === 'category') this.renderCategory();
        if (viewId === 'compare') CompareEngine.init(this.currentCategory);
        if (viewId === 'detail') this.renderDetail(param); // param is productId here
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderCategory() {
        const cat = PRODUCT_DB[this.currentCategory];
        document.getElementById('category-title-text').innerText = cat.title;
        document.getElementById('category-subtitle-text').innerText = cat.subtitle;
        
        const grid = document.getElementById('product-grid-container');
        grid.innerHTML = '';
        
        Object.keys(cat.items).forEach(key => {
            const p = cat.items[key];
            const card = document.createElement('div');
            card.className = 'p-card reveal';
            card.onclick = () => this.go('detail', key);
            card.innerHTML = `
                <h3 style="font-size: 24px;">${p.name}</h3>
                <p style="color: #86868b; margin-top: 10px;">${p.price}円〜</p>
            `;
            grid.appendChild(card);
        });
        Observer.refresh();
    },

    renderDetail(productId) {
        const cat = PRODUCT_DB[this.currentCategory];
        const p = cat.items[productId];
        const container = document.getElementById('detail-page-container');
        
        container.innerHTML = `
            <section class="detail-hero reveal">
                <h1 style="font-size: 72px; letter-spacing: -0.04em;">${p.name}</h1>
                <p style="font-size: 28px; color: #86868b; max-width: 800px; margin: 20px auto;">${p.specs[9]}</p>
                <div style="margin-top: 40px;">
                    <button style="background: #0066cc; color: #fff; border: none; padding: 18px 40px; border-radius: 980px; font-weight: 600; font-size: 18px; cursor: pointer;">購入する - ${p.price}円</button>
                </div>
            </section>
            <section class="detail-specs-grid">
                ${cat.labels.slice(0, 9).map((label, i) => `
                    <div class="spec-item reveal">
                        <h4 style="font-size: 12px; color: #86868b; text-transform: uppercase;">${label}</h4>
                        <p style="font-size: 32px; font-weight: 600; margin-top: 10px;">${p.specs[i]}</p>
                    </div>
                `).join('')}
            </section>
        `;
        Observer.refresh();
    }
};

/**
 * Apple-style Mega Menu Controller
 */
const MegaMenu = {
    show(catId) {
        const container = document.getElementById('mega-menu-container');
        const sections = document.querySelectorAll('.mega-section');
        sections.forEach(s => s.style.display = 'none');
        
        document.getElementById(`mega-${catId}`).style.display = 'block';
        container.classList.add('active');
        document.getElementById('global-nav').style.background = '#fff';
    },
    hide() {
        const container = document.getElementById('mega-menu-container');
        container.classList.remove('active');
        document.getElementById('global-nav').style.background = 'rgba(251, 251, 253, 0.8)';
    }
};

/**
 * Mobile Navigation (Three-Line to X)
 */
const MobileMenu = {
    toggle() {
        const btn = document.getElementById('nav-menu-toggle');
        const overlay = document.getElementById('mobile-nav-overlay');
        const isActive = btn.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    },
    close() {
        document.getElementById('nav-menu-toggle').classList.remove('active');
        document.getElementById('mobile-nav-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }
};

/**
 * Comparison Logic Matrix
 */
const CompareEngine = {
    catId: '',
    init(catId) {
        this.catId = catId;
        const cat = PRODUCT_DB[catId];
        const keys = Object.keys(cat.items);
        
        const sl = document.getElementById('compare-select-left');
        const sr = document.getElementById('compare-select-right');
        
        const options = keys.map(k => `<option value="${k}">${cat.items[k].name}</option>`).join('');
        sl.innerHTML = sr.innerHTML = options;
        sr.selectedIndex = 1;
        
        this.update();
    },
    update() {
        const kl = document.getElementById('compare-select-left').value;
        const kr = document.getElementById('compare-select-right').value;
        const pl = PRODUCT_DB[this.catId].items[kl];
        const pr = PRODUCT_DB[this.catId].items[kr];
        const labels = PRODUCT_DB[this.catId].labels;
        
        const container = document.getElementById('compare-matrix-container');
        container.innerHTML = labels.map((label, i) => `
            <div class="compare-row reveal">
                <div class="compare-label">${label}</div>
                <div class="compare-value">${pl.specs[i]}</div>
                <div class="compare-value">${pr.specs[i]}</div>
            </div>
        `).join('');
        Observer.refresh();
    }
};

/**
 * Intersection Observer for Apple "Reveal" Animation
 */
const Observer = {
    refresh() {
        const options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, options);
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
};

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
    Observer.refresh();
    console.log("Smart Home AI Engine v1.0 - All 23 models loaded.");
});
