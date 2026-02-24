/**
 * ==========================================
 * SMART HOME AI - PRODUCT DATABASE (CLEANING)
 * Category: 掃除機 (10 Models)
 * ==========================================
 * このファイルは、各機種の魂とも言える詳細データを格納します。
 * 全てのテキストはApple公式サイトのトーン＆マナーを意識し、
 * ユーザーの感性に深く刺さる日本語で構成されています。
 */

const CLEANING_DATABASE = [
    {
        id: "r10",
        name: "Roomba 10 Max",
        subName: "ロボット掃除機の、一つの到達点。",
        category: "cleaning",
        brand: "iRobot",
        price: 198000,
        featured: true,
        colors: ["#1d1d1f", "#f5f5f7"],
        
        // メインコピー（Heroセクションで使用）
        heroCopy: {
            headline: "知性が、美しさを超えていく。",
            description: "Roomba 10 Max。それは単なる掃除機ではありません。家中の地図をミリ単位で把握し、汚れの種類を瞬時に判別。あなたが考える前に、すべてを完璧に。これこそが、未来のスタンダードです。"
        },

        // 詳細スペック（比較エンジンで使用）
        specs: {
            suction: "40倍 (iシリーズ比)",
            navigation: "PrecisionVision 2.0 (LiDAR + Dual Camera)",
            mopping: "SmartScrub (加圧式スクラブ)",
            baseStation: "AutoEmpty & AutoWash (全自動ドック)",
            battery: "180分 (最大)",
            aiSense: "Dirt Detective 3.0",
            petFriendly: "P.O.O.P. (ペットの排泄物回避保証)",
            height: "87mm",
            voice: "Siri / Alexa / Google Assistant",
            warranty: "3年間限定保証"
        },

        // 詳細解説テキスト（詳細ページで数千行のボリュームを作る源泉）
        story: [
            {
                title: "革新のSmartScrub技術",
                content: "ただ拭くだけの時代は終わりました。Roomba 10 Maxは、人の手でゴシゴシと磨くような動きを再現。1分間に数千回の振動と、床への適切な加圧により、こびりついた汚れも跡形もなく消し去ります。"
            },
            {
                title: "すべてを任せる、全自動ドック",
                content: "掃除が終わると、Roombaは自らドックへ戻ります。ゴミの収集、モップの洗浄、乾燥、そして給水。あなたは数週間に一度、タンクを確認するだけ。あなたの時間は、より大切なことのために。"
            },
            {
                title: "プライバシーへの誓い",
                content: "カメラが捉える映像は、お使いのデバイス内で暗号化して処理。クラウドに画像が保存されることはありません。信頼こそが、スマートホームの基盤であると私たちは信じています。"
            }
        ]
    },
    {
        id: "rj9",
        name: "Roomba j9+",
        subName: "パワーと賢さ、その完璧なバランス。",
        category: "cleaning",
        brand: "iRobot",
        price: 139800,
        featured: false,
        colors: ["#3a3a3c"],
        
        heroCopy: {
            headline: "賢さは、力強さでもある。",
            description: "強力な吸引力と、障害物を回避する高い知能。j9+は、あなたの家の主役である家具やペットとの共生を第一に考えて設計されました。"
        },

        specs: {
            suction: "20倍 (iシリーズ比)",
            navigation: "PrecisionVision (Camera)",
            mopping: "非搭載",
            baseStation: "Clean Base (自動ゴミ収集のみ)",
            battery: "120分",
            aiSense: "Dirt Detective",
            petFriendly: "P.O.O.P. 対応",
            height: "87mm",
            voice: "Siri / Alexa / Google Assistant",
            warranty: "1年間保証"
        },

        story: [
            {
                title: "家具を傷つけない、優しき知能",
                content: "靴、コード、そしてペットの不慮の事故。j9+はそれらを瞬時に見分け、最適なルートを再計算。あなたの日常を邪魔することなく、静かに、確実に任務を遂行します。"
            }
        ]
    }
];
/**
 * --- MODEL [ri5]: Roomba i5+ --- 
 * 手軽に、かつ確実に。自動ゴミ収集のスタンダード。
 */
{
    id: "ri5",
    name: "Roomba i5+",
    subName: "シンプルに、スマートに。暮らしに溶け込む一台。",
    category: "cleaning",
    brand: "iRobot",
    price: 79800,
    featured: false,
    colors: ["#6e6e73"],
    
    heroCopy: {
        headline: "掃除の常識を、シンプルに書き換える。",
        description: "Roomba i5+は、洗練されたデザインと確かな清掃力を兼ね備えています。部屋を指定して掃除できる賢さと、ゴミ捨てを忘れる開放感を、すべての人に。"
    },

    specs: {
        suction: "10倍 (iシリーズ基準)",
        navigation: "iAdapt 2.0 (フロアトラッキングセンサー)",
        mopping: "非搭載 (別売Braava連携可)",
        baseStation: "Clean Base (自動ゴミ収集)",
        battery: "75分",
        aiSense: "お掃除完了予測",
        petFriendly: "対応",
        height: "92mm",
        voice: "Siri / Alexa / Google Assistant",
        warranty: "1年間保証"
    },

    story: [
        {
            title: "その部屋だけを、集中的に。",
            content: "i5+は間取りを学習し、リビング、キッチンなど部屋ごとの指定が可能。忙しい朝はキッチンだけ、外出中は全室など、あなたのスケジュールに完璧に合わせます。"
        },
        {
            title: "最大60日間、ゴミ捨て不要。",
            content: "クリーンベースが本体のゴミを自動で吸い上げ。密閉型の紙パックは、アレルゲンを99%封じ込めます。ゴミに触れる必要さえ、もうありません。"
        }
    ]
},

/**
 * --- MODEL [rs8]: Roborock S8 MaxV Ultra --- 
 * 全てを兼ね備えた、現在のロボット掃除機界の絶対王者。
 */
{
    id: "rs8",
    name: "Roborock S8 MaxV Ultra",
    subName: "全知全能の掃除体験を、あなたに。",
    category: "cleaning",
    brand: "Roborock",
    price: 249800,
    featured: true,
    colors: ["#000000", "#ffffff"],
    
    heroCopy: {
        headline: "もはや、掃除の概念さえ残らない。",
        description: "10,000Paの驚異的な吸引力。四隅まで届くサイドブラシ。そして60℃の温水でモップを洗う知性。S8 MaxV Ultraは、ロボット掃除機に求められる全ての理想を現実にしました。"
    },

    specs: {
        suction: "10,000Pa (業界最高峰)",
        navigation: "PreciSense LiDAR + AIカメラ",
        mopping: "VibraRise 3.0 (毎分4000回振動 + リフトアップ)",
        baseStation: "8in1 全自動ドック (温水洗浄・乾燥)",
        battery: "180分",
        aiSense: "Reactive AI 2.0 (障害物73種認識)",
        petFriendly: "ペット見守り・通話機能搭載",
        height: "103mm",
        voice: "Hello Rocky (独自音声アシスタント) / Siri",
        warranty: "2年間長期保証"
    },

    story: [
        {
            title: "隅々まで届く、FlexiArm技術。",
            content: "ロボット掃除機の弱点だった「部屋の隅」。S8 MaxVは壁際を検知すると、サイドブラシが自動で外側に伸長。100%のカバー率を目指した、妥協のない設計です。"
        },
        {
            title: "60℃温水洗浄がもたらす、真の清潔。",
            content: "油汚れや皮脂汚れは、水だけでは落ちません。ドック内で生成される60℃の温水がモップを徹底洗浄。除菌率は99.9%に達し、床は常に素足で歩きたくなる心地よさへ。"
        },
        {
            title: "家を離れていても、ペットのそばに。",
            content: "内蔵カメラを通じて、外出先からペットの様子を確認。ビデオ通話も可能です。掃除機は今や、あなたの家の「移動する守護神」になります。"
        }
    ]
},

/**
 * --- MODEL [rqr]: Roborock Q Revo --- 
 * 性能とコストの黄金比。最も「賢い」選択肢。
 */
{
    id: "rqr",
    name: "Roborock Q Revo",
    subName: "回転モップが、床の質感を一変させる。",
    category: "cleaning",
    brand: "Roborock",
    price: 99000,
    featured: false,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "スマートな選択が、上質な時間を生む。",
        description: "上位モデル譲りのナビゲーション能力に、加圧式回転モップを搭載。効率的で無駄のない動きが、驚くほど短時間で床をピカピカに磨き上げます。"
    },

    specs: {
        suction: "5,500Pa",
        navigation: "LiDAR Navigation",
        mopping: "デュアル回転モップ (200回転/分)",
        baseStation: "4in1 ドック (自動ゴミ収集・洗浄・乾燥)",
        battery: "150分",
        aiSense: "障害物回避センサー",
        petFriendly: "対応",
        height: "96mm",
        voice: "Alexa / Google Assistant / Siri",
        warranty: "1年間保証"
    },

    story: [
        {
            title: "回転が、汚れを「剥がす」。",
            content: "2つのモップが高速回転しながら床に圧力をかけることで、ベタつき汚れを効果的に除去。カーペットを検知するとモップを自動で持ち上げ、濡らしません。"
        }
    ]
}
/**
 * --- MODEL [ex1]: Eufy X10 Pro Omni --- 
 * 全自動の利便性を、より身近に。
 */
{
    id: "ex1",
    name: "Eufy X10 Pro Omni",
    subName: "妥協なき全自動を、すべての人へ。",
    category: "cleaning",
    brand: "Anker Eufy",
    price: 99990,
    featured: false,
    colors: ["#2c2c2e"],
    
    heroCopy: {
        headline: "コストパフォーマンスの概念を、破壊する。",
        description: "上位機種に匹敵する8,000Paの吸引力と、加圧式デュアル回転モップ。さらに全自動クリーニングステーションまで。Eufyが提案するのは、賢い投資による究極の効率化です。"
    },

    specs: {
        suction: "8,000Pa",
        navigation: "iPath LiDAR ナビゲーション",
        mopping: "MopMaster 2.0 (加圧式回転モップ)",
        baseStation: "全自動ステーション (ゴミ収集・洗浄・温風乾燥)",
        battery: "120分",
        aiSense: "AI.See (100種以上の障害物回避)",
        petFriendly: "対応",
        height: "114mm",
        voice: "Alexa / Google Assistant",
        warranty: "最大24ヶ月保証"
    },

    story: [
        {
            title: "見落としのない、AIの眼。",
            content: "AI.Seeシステムは、暗闇でも障害物を正確に識別。散らかった子供部屋やペットのいるリビングでも、立ち往生することなくスムーズに清掃を完了させます。"
        }
    ]
},

/**
 * --- MODEL [es1]: Eufy S1 Pro --- 
 * 「常にきれいな水で拭く」という、全く新しい解答。
 */
{
    id: "es1",
    name: "Eufy S1 Pro",
    subName: "床の「洗車」を、ロボットが。まさに、異次元の清浄。",
    category: "cleaning",
    brand: "Anker Eufy",
    price: 199900,
    featured: true,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "汚れた水で、拭き広げない。",
        description: "これまでの水拭きロボットの常識を覆す「Always-Clean Mop」技術。本体内で水を浄化しながら拭き掃除を行うため、床には常にフレッシュな水だけが届けられます。"
    },

    specs: {
        suction: "8,000Pa",
        navigation: "3D Matrix Eye (LiDAR + 3D ToF)",
        mopping: "Always-Clean ロールモップ (水洗浄サイクル搭載)",
        baseStation: "UniClean ステーション (オゾン除菌・自動給排水対応)",
        battery: "170分",
        aiSense: "リアルタイム水質検知",
        petFriendly: "対応",
        height: "96mm",
        voice: "Alexa / Google Assistant",
        warranty: "24ヶ月保証"
    },

    story: [
        {
            title: "オゾン水による、究極の除菌。",
            content: "ステーション内で生成されるオゾン水が、モップとタンクを常に除菌。細菌の繁殖を防ぎ、嫌な臭いの発生を根源から断ちます。小さなお子様がいるご家庭にも最適です。"
        }
    ]
},

/**
 * --- MODEL [dvs]: Dyson 360 Vis Nav --- 
 * 吸引力のダイソンが放つ、ロボット掃除機の完成形。
 */
{
    id: "dvs",
    name: "Dyson 360 Vis Nav",
    subName: "ダイソンの吸引力。そのすべてを、自律走行へ。",
    category: "cleaning",
    brand: "Dyson",
    price: 189200,
    featured: true,
    colors: ["#5333ed"],
    
    heroCopy: {
        headline: "他のどのロボットよりも、吸い取る。",
        description: "毎分110,000回転するHyperdymiumモーターを搭載。壁際のゴミを逃さないD形フォルムと、360°ビジョンシステムが、あなたの家を文字通り「完璧」に掃除します。"
    },

    specs: {
        suction: "Hyperdymiumモーター搭載 (最強クラス)",
        navigation: "360°ビジョンシステム (SLAM)",
        mopping: "非搭載 (吸引特化型)",
        baseStation: "充電ドック (HEPAフィルター付)",
        battery: "65分 (静音モード)",
        aiSense: "ピエゾセンサー (ゴミの量を検知)",
        petFriendly: "HEPAフィルターによる空気清浄効果",
        height: "97mm",
        voice: "MyDyson App 連携",
        warranty: "2年間メーカー保証"
    },

    story: [
        {
            title: "壁際、1ミリの妥協も許さない。",
            content: "独自のサイドダクトが、壁際を検知すると自動で作動。ブラシが届きにくい隅のゴミまで、ダイソン自慢の圧倒的風量で吸い込みます。"
        }
    ]
},

/**
 * --- MODEL [prs]: Panasonic RULO RSF1000 --- 
 * 三角形が、日本の部屋を救う。
 */
{
    id: "prs",
    name: "RULO RSF1000",
    subName: "隅を極めた、日本生まれの知性。",
    category: "cleaning",
    brand: "Panasonic",
    price: 148500,
    featured: false,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "その「隅」にこそ、RULOの居場所がある。",
        description: "日本特有の狭い角や家具の隙間。三角形の「ルーローフォルム」は、円形ロボットが諦めていた場所へ難なく入り込み、隅のゴミを確実にかき出します。"
    },

    specs: {
        suction: "高効率ブラシレスモーター",
        navigation: "レーザーSLAM + 赤外線 + 超音波",
        mopping: "非搭載",
        baseStation: "クリーン設定対応ドック",
        battery: "100分",
        aiSense: "音を抑える「音ひかえめモード」",
        petFriendly: "段差乗り越え 2.5cm",
        height: "92mm",
        voice: "Google Assistant",
        warranty: "1年間保証"
    }
},

/**
 * --- MODEL [sk1]: SwitchBot K10+ --- 
 * 最小こそ、最強の解答。
 */
{
    id: "sk1",
    name: "SwitchBot K10+",
    subName: "世界最小級。なのに、驚くほどパワフル。",
    category: "cleaning",
    brand: "SwitchBot",
    price: 59800,
    featured: false,
    colors: ["#ffffff"],
    
    heroCopy: {
        headline: "日本の家には、このサイズが必要だった。",
        description: "直径わずか24.8cm。椅子の脚の間も、ソファの下も。これまでのロボットが通れなかった「あと数センチ」の隙間を、K10+は軽やかに走り抜けます。"
    },

    specs: {
        suction: "2,500Pa",
        navigation: "LDSレーザーナビゲーション",
        mopping: "市販のお掃除シート対応 (使い捨て)",
        baseStation: "自動ゴミ収集ドック (4リットル大容量)",
        battery: "120分",
        aiSense: "夜間静音設計",
        petFriendly: "狭所入り込み回避",
        height: "92mm",
        voice: "Siri / Alexa / Google Assistant / IFTTT",
        warranty: "1年間保証"
    }
}
];

// Part 2 以降で ri5, rs8, rqr などのデータを続けます。
