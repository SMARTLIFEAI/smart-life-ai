/**
 * ==========================================
 * SMART HOME AI - MAIN APPLICATION ENGINE
 * Apple-inspired Interaction & Navigation System
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    renderGlobalMenu(); // 23機種のメニュー生成
});

/**
 * 1. NAVIGATION CONTROL
 * 三本線メニューの変形（Apple Style）とスクロールロックの制御
 */
function initNavigation() {
    const trigger = document.getElementById('global-menu-trigger');
    const nav = document.getElementById('global-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    const body = document.body;

    // 三本線（×ボタン）のクリックイベント
    trigger.addEventListener('click', () => {
        const isOpen = trigger.classList.toggle('active');
        nav.classList.toggle('nav-open', isOpen);
        overlay.classList.toggle('active', isOpen);
        
        // 背景スクロールの固定/解除
        if (isOpen) {
            const scrollY = window.scrollY;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
        } else {
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    });

    // メニューが開いている時にエスケープキーで閉じる
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && trigger.classList.contains('active')) {
            trigger.click();
        }
    });
}

/**
 * 2. GLOBAL MENU RENDERER
 * 23機種すべての名前を日本語で一つずつ出力し、詳細ページへのリンクを構築
 */
function renderGlobalMenu() {
    const categories = ['cleaning', 'lighting', 'security'];
    const container = document.querySelector('.mobile-nav-featured');
    
    // カテゴリーごとにメニューを構築
    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'menu-category-block';
        
        // カテゴリー名の日本語変換
        const catNameJP = {
            'cleaning': '掃除機',
            'lighting': '照明',
            'security': '防犯・セキュリティ'
        }[cat];

        // 各機種のリンクを一つずつ生成
        const productLinks = MASTER_DATABASE[cat].map(product => `
            <div class="mobile-nav-item">
                <a href="#/product/${product.id}" class="mobile-nav-link" data-nav-id="${product.id}">
                    <span class="product-name-jp">${product.name}</span>
                    <span class="product-sub-name">${product.subName}</span>
                </a>
            </div>
        `).join('');

        section.innerHTML = `
            <h3 class="featured-label">${catNameJP}</h3>
            <div class="category-links-grid">
                ${productLinks}
            </div>
        `;
        
        container.appendChild(section);
    });

    // リンククリック時にメニューを閉じる処理
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (document.getElementById('global-menu-trigger').classList.contains('active')) {
                document.getElementById('global-menu-trigger').click();
            }
        });
    });
}

/**
 * 3. SCROLL EFFECTS
 * スクロール位置に応じたナビゲーションの透過・変色
 */
function initScrollEffects() {
    const nav = document.getElementById('global-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // スクロールダウンでナビを少し透過、アップで強調
        if (currentScroll > 50) {
            nav.style.background = 'rgba(251, 251, 253, 0.8)';
            nav.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'var(--bg-glass)';
            nav.style.borderBottom = '1px solid transparent';
        }

        lastScroll = currentScroll;
    });
}
/**
 * 4. ROUTING SYSTEM & DETAIL VIEW RENDERER
 * URLのハッシュ（#/product/r10等）を監視し、
 * 該当する機種のApple風詳細ページを瞬時に生成します。
 */
window.addEventListener('hashchange', handleRouting);

function handleRouting() {
    const hash = window.location.hash;
    const mainContent = document.getElementById('main-content'); // index.htmlのメイン領域

    if (hash.startsWith('#/product/')) {
        const productId = hash.replace('#/product/', '');
        const product = MASTER_DATABASE.all.find(p => p.id === productId);
        
        if (product) {
            renderProductDetail(product);
        }
    } else {
        // ハッシュがない、またはトップの場合は全機種一覧（Home）を表示
        renderHome();
    }
}

/**
 * 23機種それぞれの詳細ページを構築するエンジン
 */
function renderProductDetail(product) {
    const container = document.getElementById('main-content');
    
    // スクロールをトップに戻し、フェードインアニメーションを準備
    window.scrollTo(0, 0);
    container.style.opacity = '0';

    const html = `
        <article class="product-detail-view" data-category="${product.category}">
            <section class="detail-hero reveal-node">
                <div class="detail-hero-content">
                    <span class="detail-eyebrow">${product.brand}</span>
                    <h1 class="detail-main-title">${product.name}</h1>
                    <p class="detail-hero-copy">${product.heroCopy.headline}</p>
                    <div class="detail-price">税込 ${product.price.toLocaleString()}円〜</div>
                </div>
                <div class="detail-hero-image">
                    <div class="placeholder-img" style="background: ${product.colors[0]}"></div>
                </div>
            </section>

            <section class="detail-story">
                ${product.story.map(item => `
                    <div class="story-block reveal-node">
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                    </div>
                `).join('')}
            </section>

            <section class="detail-comparison reveal-node">
                <h2 class="comparison-title">${product.category === 'cleaning' ? '掃除機' : product.category === 'lighting' ? '照明' : 'セキュリティ'}を比較する</h2>
                <div class="comparison-scroller">
                    <table class="apple-comparison-table">
                        <thead>
                            <tr>
                                <th>モデル</th>
                                ${MASTER_DATABASE[product.category].slice(0, 4).map(p => `
                                    <th class="${p.id === product.id ? 'current-p' : ''}">
                                        <img src="" alt="${p.name}" class="comp-thumb"><br>${p.name}
                                    </th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.keys(product.specs).map(specKey => `
                                <tr>
                                    <td class="spec-name">${getSpecLabelJP(specKey)}</td>
                                    ${MASTER_DATABASE[product.category].slice(0, 4).map(p => `
                                        <td class="${p.id === product.id ? 'current-p' : ''}">${p.specs[specKey] || '-'}</td>
                                    `).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        </article>
    `;

    setTimeout(() => {
        container.innerHTML = html;
        container.style.opacity = '1';
        container.classList.add('revealed');
        // Part 1のアニメーションエンジンを発火
        initScrollReveal();
    }, 400);
}

/**
 * スペックキーの日本語変換
 */
function getSpecLabelJP(key) {
    const labels = {
        suction: '吸引力',
        navigation: 'ナビゲーション',
        mopping: '水拭き機能',
        baseStation: 'ドック機能',
        battery: '稼働時間',
        aiSense: 'AI検知',
        petFriendly: 'ペット対応',
        height: '本体高さ',
        voice: '音声アシスタント',
        warranty: '保証期間',
        brightness: '明るさ',
        colorTemp: '色温度',
        resolution: '解像度',
        viewAngle: '視野角',
        nightVision: '夜間撮影'
    };
    return labels[key] || key;
}

/**
 * 5. SCROLL REVEAL ENGINE
 * 画面内に入った要素をAppleのようにふわっと表示させる
 */
function initScrollReveal() {
    const nodes = document.querySelectorAll('.reveal-node');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    nodes.forEach(node => observer.observe(node));
}
/**
 * 6. APPLE-STYLE NAV TRANSFORM (HAMBURGER TO CLOSE)
 * 三本線メニューと中央メニューバーがAppleのように滑らかに動く演出を制御
 */
function animateNavigation() {
    const trigger = document.querySelector('.menu-trigger-wrapper');
    const bars = document.querySelectorAll('.menu-bar');
    
    trigger.addEventListener('mouseenter', () => {
        if (!trigger.parentElement.classList.contains('active')) {
            bars[0].style.transform = 'translateY(-2px)';
            bars[1].style.transform = 'translateY(2px)';
        }
    });

    trigger.addEventListener('mouseleave', () => {
        if (!trigger.parentElement.classList.contains('active')) {
            bars.forEach(bar => bar.style.transform = 'translateY(0)');
        }
    });
}

/**
 * 7. GLOBAL FOOTER RENDERER
 * 23機種すべての名前をサイト最下部にも展開。
 * Appleのフッターのように、整理された知性を表現。
 */
function renderFooter() {
    const footerContainer = document.getElementById('global-footer-links');
    if (!footerContainer) return;

    const categories = ['cleaning', 'lighting', 'security'];
    const catLabels = {
        'cleaning': '掃除・メンテナンス',
        'lighting': '照明・アンビエント',
        'security': '防犯・セキュリティ'
    };

    let footerHTML = '';

    categories.forEach(cat => {
        footerHTML += `
            <div class="footer-column">
                <h4 class="footer-label">${catLabels[cat]}</h4>
                <ul class="footer-list">
                    ${MASTER_DATABASE[cat].map(p => `
                        <li><a href="#/product/${p.id}">${p.name}</a></li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    footerContainer.innerHTML = footerHTML;
}

/**
 * 8. SMOOTH INTERNAL ANCHOR
 * ページ内リンクや比較表からの遷移を、
 * 物理的な加速・減速（Ease-out）を伴って実行
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // プロダクト詳細へのハッシュルーティングの場合はデフォルト挙動（handleRouting）に任せる
            if (href.startsWith('#/product/')) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 9. INITIALIZE ALL ENGINES
 * 1万行のデータとロジックを一つに束ね、実行を開始
 */
function launchApp() {
    console.log("Smart Home AI: Launching Engine...");
    
    // 各エンジンの起動
    initNavigation();
    animateNavigation();
    renderGlobalMenu(); // 23機種をメニューに展開
    renderFooter();     // 23機種をフッターに展開
    initScrollEffects();
    initSmoothScroll();
    
    // 初回ルーティング処理（URLにハッシュがある場合に対応）
    handleRouting();

    // ページロード完了時のフェードイン
    document.body.classList.add('app-loaded');
}

// アプリケーション起動
launchApp();

/**
 * ==========================================
 * END OF CORE LOGIC
 * ==========================================
 */
