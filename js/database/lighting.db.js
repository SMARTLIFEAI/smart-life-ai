/**
 * ==========================================
 * SMART HOME AI - PRODUCT DATABASE (LIGHTING)
 * Category: 照明 (7 Models)
 * ==========================================
 * 光の質、色温度、そして空間との調和。
 * Apple HomeKitとの親和性が最も高いカテゴリーの核となるデータ。
 */

const LIGHTING_DATABASE = [
    {
        id: "hwg",
        name: "Philips Hue ホワイトグラデーション",
        subName: "光で、心と身体を整える。",
        category: "lighting",
        brand: "Signify (Philips)",
        price: 4800,
        featured: false,
        colors: ["#ffffff"],
        
        // メインコピー
        heroCopy: {
            headline: "太陽の光を、あなたの部屋に。",
            description: "爽やかな朝の光から、更けゆく夜の温かい灯火まで。ホワイトグラデーションは、人間のサーカディアンリズムに寄り添い、あなたの生産性とリラックスを最適化します。"
        },

        // 詳細スペック
        specs: {
            brightness: "800 / 1100 / 1600 ルーメン",
            colorTemp: "2200K - 6500K (電球色〜昼光色)",
            colorRange: "5万色の白",
            protocol: "Zigbee / Bluetooth / Matter(via Bridge)",
            base: "E26 / E17 / GU10",
            lifespan: "25,000 時間",
            ra: "90+ (高演色)",
            sync: "非対応 (カラーのみ)",
            dimming: "0.1% - 100% 滑らかな調光",
            homekit: "対応 (要ブリッジ)"
        },

        story: [
            {
                title: "集中と休息のスイッチ",
                content: "「集中する」「やる気を出す」「読書」「くつろぐ」の4つのプリセットが、最適な色温度と明るさを即座に提供。ボタン一つで、部屋の空気が変わります。"
            },
            {
                title: "目覚ましライトで、健やかな朝を",
                content: "設定した時間に合わせ、朝日が昇るように少しずつ明るさをアップ。アラーム音に頼らない、自然で心地よい目覚めをサポートします。"
            }
        ]
    },
    {
        id: "hfc",
        name: "Philips Hue フルカラー",
        subName: "1,600万色が描き出す、無限の表現力。",
        category: "lighting",
        brand: "Signify (Philips)",
        price: 7800,
        featured: true,
        colors: ["#rainbow"],
        
        heroCopy: {
            headline: "光は、もはやエンターテインメントだ。",
            description: "映画、音楽、ゲーム。あらゆる体験を光が拡張します。1,600万色の色彩が壁を彩り、リビングをスタジアムや映画館に変貌させる。これまでにない没入感を、その手に。"
        },

        specs: {
            brightness: "800 / 1100 ルーメン",
            colorTemp: "2000K - 6500K + 1600万色",
            colorRange: "フルカラー (Rich Colors)",
            protocol: "Zigbee / Bluetooth / Matter",
            base: "E26 / E17 / GU10",
            lifespan: "25,000 時間",
            ra: "90+ (高演色)",
            sync: "Hue Sync対応 (TV・PC・Spotify)",
            dimming: "フリッカーレス超低輝度対応",
            homekit: "対応"
        },

        story: [
            {
                title: "エンターテインメントとの完全同期",
                content: "Hue Syncを使えば、画面上の色や音楽のビートに合わせて光がリアルタイムに躍動。視覚的な境界線が消え、物語の中に入り込んだような体験を生み出します。"
            },
            {
                title: "プロがデザインした「シーン」",
                content: "「熱帯の黄昏」「オーロラ」「春の花々」など、照明デザイナーが作成した数十種類のシーンを選択可能。あなたの部屋を瞬時にアート空間へと変貌させます。"
            }
        ]
    },
    {
        id: "hpb",
        name: "Hue Play ライトバー",
        subName: "テレビの背後から、没入感があふれ出す。",
        category: "lighting",
        brand: "Signify (Philips)",
        price: 19800, // 2個セット想定
        featured: false,
        colors: ["#1d1d1f", "#ffffff"],
        
        heroCopy: {
            headline: "壁を、キャンバスに変える。",
            description: "テレビの横に置く。背面に貼り付ける。床に隠す。コンパクトなボディから放たれる強力な間接光が、空間の奥行きを劇的に広げます。"
        },

        specs: {
            brightness: "530 ルーメン (1本あたり)",
            colorTemp: "2000K - 6500K + 1600万色",
            colorRange: "フルカラー",
            protocol: "Zigbee",
            base: "専用ACアダプター (3本まで連結可)",
            lifespan: "25,000 時間",
            ra: "80+",
            sync: "対応 (Hue Play HDMI Sync Box推奨)",
            dimming: "対応",
            homekit: "対応"
        },

        story: [
            {
                title: "シネマティックな間接照明",
                content: "テレビ画面の端の色を壁に投影することで、画面サイズが物理的な枠を超えて広がっているかのような錯覚を作り出します。目の疲れを軽減する効果も。"
            }
        ]
    }
];
/**
 * --- MODEL [nsh]: Nanoleaf Shapes (Hexagons) --- 
 * 壁を、光のアートに変える。
 */
{
    id: "nsh",
    name: "Nanoleaf Shapes Hexagons",
    subName: "触れる。踊る。光と遊ぶ。",
    category: "lighting",
    brand: "Nanoleaf",
    price: 27800, // 9枚セット想定
    featured: true,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "あなたの部屋を、唯一無二のギャラリーに。",
        description: "六角形のパネルを、パズルのように自由に組み合わせ。タッチに反応し、音楽に合わせて脈動する。Shapesは、照明という概念を超えた、次世代のインタラクティブ・アートです。"
    },

    specs: {
        brightness: "100 ルーメン (1パネルあたり)",
        colorTemp: "1200K - 6500K + 1600万色",
        colorRange: "フルカラー",
        protocol: "Wi-Fi (2.4GHz) / Thread",
        base: "壁面貼り付け (ドリル不要)",
        lifespan: "25,000 時間",
        ra: "80+",
        sync: "ミュージックビジュアライザー / スクリーンミラーリング",
        dimming: "タッチ操作 / アプリ / 音声",
        homekit: "対応"
    },

    story: [
        {
            title: "指先から広がる、光の波紋",
            content: "パネルに触れると、その場所から色が波のように広がります。お子様の知育遊びから、大人のリラックスタイムまで、光との新しい対話を楽しめます。"
        },
        {
            title: "Thread対応による、異次元のレスポンス",
            content: "最新のスマートホーム規格「Matter over Thread」に対応。遅延を極限まで排除した操作感で、ストレスのないスマートライフを実現します。"
        }
    ]
},

/**
 * --- MODEL [nes]: Nanoleaf Essentials Bulb --- 
 * 高品質なThread通信を、すべてのソケットに。
 */
{
    id: "nes",
    name: "Nanoleaf Essentials Bulb",
    subName: "基本こそ、究極。Threadが導く、新しい標準。",
    category: "lighting",
    brand: "Nanoleaf",
    price: 3200,
    featured: false,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "美しさと、スピードの融合。",
        description: "多面体（菱形十二面体）の美しいフォルム。Threadテクノロジーによる瞬時の反応。Essentialsは、最も手軽に、最も高度なスマート照明体験を提供します。"
    },

    specs: {
        brightness: "806 ルーメン (平均) / 1100 ルーメン (最大)",
        colorTemp: "2700K - 6500K + 1600万色",
        colorRange: "フルカラー",
        protocol: "Thread / Bluetooth / Matter",
        base: "E26",
        lifespan: "25,000 時間",
        ra: "90+ (鮮やかな色彩再現)",
        sync: "Nanoleafデスクトップアプリと同期",
        dimming: "対応",
        homekit: "対応"
    }
},

/**
 * --- MODEL [scl]: SwitchBot シーリングライト Pro --- 
 * 日本の天井に、真の知性を。
 */
{
    id: "scl",
    name: "SwitchBot シーリングライト Pro",
    subName: "これ一台で、部屋中の家電を意のままに。",
    category: "lighting",
    brand: "SwitchBot",
    price: 13980;
    featured: false,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "照明は、スマートホームのハブになる。",
        description: "高演色のLEDシーリングライトに、スマートリモコン機能を内蔵。エアコンもテレビも、天井から一括コントロール。日本のリビングをアップデートする、最も合理的な解答です。"
    },

    specs: {
        brightness: "3699 - 4899 ルーメン (〜8畳/〜10畳)",
        colorTemp: "2700K - 6500K (無段階調節)",
        colorRange: "ホワイトグラデーション",
        protocol: "Wi-Fi / Bluetooth / 赤外線(Hub機能)",
        base: "引掛シーリング (日本専用規格)",
        lifespan: "40,000 時間",
        ra: "Ra85",
        sync: "SwitchBot製品群との連携",
        dimming: "1%刻みの調光・調色",
        homekit: "Matter対応 (近日公開)"
    },

    story: [
        {
            title: "家電を操作する「天井の司令塔」",
            content: "内蔵の赤外線送信機により、古いエアコンやテレビもスマート化。温度センサー（別売）と連携すれば、「28度を超えたら自動でエアコンをつける」といった自動化も容易です。"
        }
    ]
},

/**
 * --- MODEL [itr]: IKEA TRÅDFRI --- 
 * 優れたデザインと機能を、誰もが手に取れる価格で。
 */
{
    id: "itr",
    name: "IKEA TRÅDFRI (トロードフリ)",
    subName: "スマートな暮らしを、民主的に。",
    category: "lighting",
    brand: "IKEA",
    price: 1999,
    featured: false,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "セットアップは、電球を替えるだけ。",
        description: "複雑な設定は不要。リモコンやアプリで、温かみのある光をコントロール。IKEAが目指すのは、誰もが簡単に、より快適な家を築ける未来です。"
    },

    specs: {
        brightness: "470 / 806 / 1100 ルーメン",
        colorTemp: "2200K / 2700K / 4000K (3段階または無段階)",
        colorRange: "ホワイトグラデーション / カラー",
        protocol: "Zigbee / Matter(via DIRIGERA)",
        base: "E26 / E17 / GU10",
        lifespan: "25,000 時間",
        ra: "90+",
        sync: "IKEA Home smart 連携",
        dimming: "対応",
        homekit: "対応 (要DIRIGERAハブ)"
    }
}
];
