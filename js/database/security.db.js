/**
 * ==========================================
 * SMART HOME AI - PRODUCT DATABASE (SECURITY)
 * Category: 防犯・セキュリティ (6 Models)
 * ==========================================
 * プライバシー、信頼、そして確信。
 * 24時間365日、あなたの大切な場所を見守る「知能」の定義。
 */

const SECURITY_DATABASE = [
    {
        id: "ap5",
        name: "Arlo Pro 5",
        subName: "暗闇さえも、鮮明な証拠に変える。",
        category: "security",
        brand: "Arlo",
        price: 32800,
        featured: true,
        colors: ["#ffffff", "#1d1d1f"],
        
        heroCopy: {
            headline: "2Kの解像度が、真実を捉える。",
            description: "Pro 5は、従来のカメラでは見逃していた細部まで描き出します。最新のデュアルバンドWi-Fiによる安定した接続と、数ヶ月持続するバッテリー。プロ仕様の防犯を、あなたの手に。"
        },

        specs: {
            resolution: "2K HDR (2560 x 1440)",
            viewAngle: "160度 対角視野",
            nightVision: "カラー夜間撮影 (高輝度スポットライト内蔵)",
            audio: "双方向音声 (ノイズキャンセル付)",
            aiDetection: "人、車両、動物、荷物を個別に識別",
            power: "充電式リチウムイオン電池 / ソーラー対応",
            durability: "IP65 耐候性設計",
            siren: "本体内蔵スマートサイレン",
            privacy: "エンドツーエンド暗号化",
            homekit: "対応 (要ベースステーション)"
        },

        story: [
            {
                title: "カラーで見る、夜の景色",
                content: "内蔵の強力なスポットライトにより、漆黒の闇の中でもフルカラーでの録画が可能。不審者の衣服の色や車の特徴を、重要な証拠として記録します。"
            },
            {
                title: "スマートな通知、迅速な対応",
                content: "AIが「ただの木の揺れ」と「人の接近」を判別。必要な通知だけを届け、緊急時にはスマートフォンから直接サイレンを鳴らすことができます。"
            }
        ]
    },
    {
        id: "au2",
        name: "Arlo Ultra 2",
        subName: "4K。それは、妥協なき監視の極致。",
        category: "security",
        brand: "Arlo",
        price: 49800,
        featured: false,
        colors: ["#ffffff"],
        
        heroCopy: {
            headline: "細部を拡大しても、失われない明瞭さ。",
            description: "4K HDRビデオによる究極のディテール。180度の超広角視野。Ultra 2は、広大な敷地や重要な入り口をカバーするために設計された、Arlo史上最強のセキュリティカメラです。"
        },

        specs: {
            resolution: "4K HDR (3840 x 2160)",
            viewAngle: "180度 超広角 (歪み補正付)",
            nightVision: "強化版カラー夜間撮影 (デュアルライト)",
            audio: "プレミアム双方向音声 (デュアルマイク)",
            aiDetection: "高度なAIオブジェクト認識",
            power: "最大6ヶ月のバッテリー駆動",
            durability: "全天候型プロフェッショナル設計",
            siren: "自動 / 手動発動サイレン",
            privacy: "最高レベルの軍用暗号化",
            homekit: "対応"
        },

        story: [
            {
                title: "パノラマのような180度の視界",
                content: "魚眼レンズの歪みを抑えつつ、敷地の端から端までを一つの画面に。死角を最小限に抑え、広い庭や駐車場もこれ一台でカバーします。"
            }
        ]
    },
    {
        id: "ngc",
        name: "Google Nest Cam (Battery)",
        subName: "家の中でも、外でも。あなたに寄り添う安心感。",
        category: "security",
        brand: "Google",
        price: 23900,
        featured: true,
        colors: ["#f5f5f7"],
        
        heroCopy: {
            headline: "賢い見守りを、もっと身近に。",
            description: "場所を選ばないワイヤレス設計。Googleの高度なAIアルゴリズムが、重要なイベントを無料で判別して通知します。どんなインテリアにも馴染む、洗練されたミニマリズム。"
        },

        specs: {
            resolution: "1080p HDR (30fps)",
            viewAngle: "135度 対角視野",
            nightVision: "赤外線ナイトビジョン (高出力LED)",
            audio: "全二重双方向音声",
            aiDetection: "人、車両、動物、荷物の無料検知",
            power: "内蔵バッテリー / 常時給電可",
            durability: "IP54 防塵・防滴",
            storage: "3時間のイベント履歴 (無料) / Nest Aware",
            integration: "Google Home アプリ統合",
            homekit: "非対応 (Matter対応予定)"
        },

        story: [
            {
                title: "履歴のバックアップも、万全。",
                content: "万が一Wi-Fiが切れても、本体メモリに最大1時間の録画データを保存。復旧時に自動でクラウドへアップロードされるため、空白の時間は生まれません。"
            }
        ]
    }
];
/**
 * --- MODEL [ngd]: Google Nest Doorbell (Battery) --- 
 * 玄関先の風景を、ポートレートのように美しく。
 */
{
    id: "ngd",
    name: "Google Nest Doorbell",
    subName: "「誰が来たか」を、全身で捉える。",
    category: "security",
    brand: "Google",
    price: 23900,
    featured: false,
    colors: ["#f5f5f7", "#e8e8ed"],
    
    heroCopy: {
        headline: "縦に広がる、安心の視界。",
        description: "3:4のアスペクト比を採用。置き配の荷物から、訪れた人の頭からつま先まで、すべてを鮮明に映し出します。あなたの家の第一印象を、もっとスマートに。"
    },

    specs: {
        resolution: "960 x 1280 (HDR)",
        viewAngle: "145度 (3:4比率)",
        nightVision: "赤外線ナイトビジョン",
        audio: "ノイズキャンセル機能付き双方向音声",
        aiDetection: "人物、荷物、車両、動物の認識",
        power: "バッテリー駆動 / 既存のチャイム配線利用可",
        durability: "IP54 耐候性",
        storage: "最大3時間の無料イベント履歴",
        privacy: "暗号化されたビデオストリーミング",
        homekit: "非対応"
    },

    story: [
        {
            title: "「荷物」を見守る、確かな眼",
            content: "玄関先に荷物が置かれた瞬間、あるいは誰かが荷物を持ち去ろうとした瞬間にスマート通知。オンラインショッピングが主流の現代に、欠かせない機能です。"
        }
    ]
},

/**
 * --- MODEL [rbd]: Ring Battery Doorbell Pro --- 
 * 3Dレーダーによる、圧倒的な検知精度。
 */
{
    id: "rbd",
    name: "Ring Battery Doorbell Pro",
    subName: "レーダーが描く、防犯の「鳥瞰図」。",
    category: "security",
    brand: "Amazon Ring",
    price: 34980,
    featured: true,
    colors: ["#1d1d1f"],
    
    heroCopy: {
        headline: "距離を測る。そして、正確に守る。",
        description: "業界初の3D動体検知機能を搭載。レーダー技術により、敷地内のどの地点に人が立ち入ったかを正確に把握。誤検知を極限まで減らした、最高峰のドアベル体験です。"
    },

    specs: {
        resolution: "1536p HD+ (Head-to-Toe Video)",
        viewAngle: "150度 (水平・垂直)",
        nightVision: "カラーナイトビジョン (低照度センサー)",
        audio: "Audio+ (強化版ノイズキャンセル)",
        aiDetection: "3D動体検知 / バードアイビュー機能",
        power: "クイックリリースバッテリーパック",
        durability: "全天候対応 (-20°C 〜 50°C)",
        storage: "Ring Protect (クラウド保存サービス)",
        privacy: "プライバシーマスク設定可能",
        homekit: "非対応"
    },

    story: [
        {
            title: "バードアイビュー（鳥瞰図）",
            content: "訪問者がどのようなルートで玄関まで来たかを、地図上の点線で表示。敷地への侵入経路を可視化することで、より高度な防犯対策が可能になります。"
        }
    ]
},

/**
 * --- MODEL [es3]: eufyCam S330 (eufyCam 3) --- 
 * 太陽の力で、永遠の監視を。
 */
{
    id: "es3",
    name: "eufyCam S330",
    subName: "充電という概念を、過去のものに。",
    category: "security",
    brand: "Anker Eufy",
    price: 49990, // 2台セット等の基準
    featured: true,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "自己完結する、最強の防犯システム。",
        description: "本体上部にソーラーパネルを搭載。1日わずか2時間の直射日光があれば、充電不要で稼働し続けます。BionicMind AIが、家族と見知らぬ人を正確に見分けます。"
    },

    specs: {
        resolution: "4K 超高解像度",
        viewAngle: "135度",
        nightVision: "カラーナイトビジョン / スポットライト内蔵",
        audio: "双方向音声",
        aiDetection: "BionicMind AI (顔認識、人物、車両、動物)",
        power: "ソーラーパワー充電 / 内蔵バッテリー (13,000mAh)",
        durability: "IP67 完全防水防塵",
        storage: "最大16TBまで拡張可能なローカル保存 (HomeBase 3)",
        privacy: "月額料金不要のローカルストレージ",
        homekit: "対応 (HomeBase 2/3経由)"
    },

    story: [
        {
            title: "知能を持つAI、BionicMind",
            content: "使い込むほどAIが学習。家族の顔を登録すれば「誰が帰宅したか」まで正確に通知。知らない顔の時だけ注意喚起するなど、真に賢い使い分けが可能です。"
        }
    ]
}
];

/**
 * ==========================================
 * EXPORT DATABASE ENGINE
 * ==========================================
 */
const MASTER_DATABASE = {
    cleaning: CLEANING_DATABASE,
    lighting: LIGHTING_DATABASE,
    security: SECURITY_DATABASE,
    all: [...CLEANING_DATABASE, ...LIGHTING_DATABASE, ...SECURITY_DATABASE]
};
