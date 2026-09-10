import { NewsArticle } from '../types';

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-2026-spring-harvest',
    title: '2026 梨山春茶頭採開山公告 ｜ 預購早鳥名額正式開放',
    category: 'tea_harvest',
    categoryLabel: '時令茶訊',
    publishedAt: '2026-09-08',
    isPinned: true,
    isPublished: true,
    author: '郭雅雯',
    authorRole: '茶務總監',
    tags: ['梨山高冷茶', '頭採春茶', '早鳥預購', '單一茶園'],
    readTime: '4 分鐘閱讀',
    viewsCount: 1420,
    summary: '今年梨山翠峰茶區冬雨豐沛，低溫累積充足，嫩芽厚實富膠質。預計九月中旬完成首批採摘與炭焙烘乾，現已開放線上早鳥預訂。',
    content: `致各位喜愛棲雲的茶友：

歷經一整季冷冽山嵐的涵養，南投梨山翠峰海拔 2,200 公尺處的茶園，在迎來晨曦初露的時刻，茶芽已悄然長至肥嫩的一心二葉。

今年由於高海拔山區日夜溫差高達 15°C，茶菁葉肉厚實且果膠質極為豐富。我們恪遵古法於清晨露水收斂後全手工採摘，並於當日送入製茶廠進行長達 18 小時的低溫慢速萎凋。

【2026 春茶特色】
1. 茶湯色澤如青黃玉石般清澈，透著山巔特有的純淨光澤。
2. 注入沸水瞬間，冷礦冷冽之氣撲鼻，隨之轉化為幽雅持久的幽蘭花芬芳。
3. 茶湯入口滑潤富膠質，喉韻回甘綿長達數十分鐘。

首批「梨山高冷烏龍・凝霜」預計於本月中旬限量烘焙完成。目前線上官網與青田街茶舍同步開放早鳥預訂，預訂即贈手作桐木茶則乙支。`,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    relatedProductId: 'prod-tea-1',
  },
  {
    id: 'news-qingtian-tasting-session',
    title: '台北青田街茶舍「秋水微瀾」雙人茶席預約開放',
    category: 'event',
    categoryLabel: '茶席活動',
    publishedAt: '2026-09-05',
    isPinned: true,
    isPublished: true,
    author: '林怡秀',
    authorRole: '茶席策展人',
    tags: ['青田茶舍', '雙人茶席', '私人預約', '茶席美學'],
    readTime: '3 分鐘閱讀',
    viewsCount: 980,
    summary: '邀請您在午後步入老樹掩映的青田茶舍，由資深茶藝師一對一侍茶，品鑑三款珍稀台灣高山單品茶與精緻和菓子。',
    content: `隱身於台北市大安區青田街日式老樹綠蔭之中，棲雲品茗體驗空間即日起推出全新一季「秋水微瀾」雙人深度茶席。

【茶席體驗內容】
1. 開席迎賓茶：冷萃文山包種「青嵐」，洗滌初到都市的煩悶浮躁。
2. 主泡品鑑：以苗栗柴燒手拉胚陶壺沖泡 梨山高冷烏龍「凝霜」。
3. 重焙暖韻：古法八炭焙 木柵正欉鐵觀音「沉香」，感受熟果與弱果酸回韻。
4. 茶點佐配：當日現做手工紅豆葛切與山藥和菓子。

每場席次為 90 分鐘，採全預約制，每場僅接待一組貴賓（1-4人），確保寧靜私密的品飲氛圍。歡迎至網站「品茗預約」專區填寫時段。`,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'news-brewing-water-temp',
    title: '習茶知味：掌握沖泡水溫與注水水流，引出高山烏龍的冷礦山頭氣',
    category: 'brewing_guide',
    categoryLabel: '泡茶指南',
    publishedAt: '2026-09-03',
    isPinned: false,
    isPublished: true,
    author: '郭雅雯',
    authorRole: '茶務總監',
    tags: ['泡茶技法', '注水速度', '水溫控制', '烏龍茶泡法'],
    readTime: '5 分鐘閱讀',
    viewsCount: 1650,
    summary: '好茶需要懂得它的脾氣。解析滾水降溫秒數、沿壺壁旋轉注水對茶葉受熱與香氣釋放的關鍵影響。',
    content: `許多茶友常問：「同樣買了頂級的梨山烏龍，為何在家中沖泡總覺得缺少茶舍裡的清亮與香甜？」

關鍵在於三件事：水質、水溫、與落水姿態。

【第一要訣：沸水微歇，95°C 喚醒高冷香】
高山球形烏龍茶葉緊結，若水溫過低（如低於 90°C），葉片難以舒展，香氣被悶於壺內；若直接以 100°C 劇烈沸騰大滾水直沖中心，又容易燙傷細嫩葉表，釋出微苦澀味。最佳方式是將煮滾之水離火靜置 20 秒，降至 95°C 左右。

【第二要訣：低斟細流，沿壁緩注入】
注水時切莫從壺心猛烈直灌。持水壺壺嘴貼近壺口，沿著陶壺邊緣細膩旋轉注水，使水流溫和環繞茶球，讓茶葉均勻溫潤吸水舒展，茶湯清亮透徹。

【第三要訣：分秒講究，首泡 50 秒】
第一泡浸泡 50 秒，出湯務必乾淨俐落（瀝盡壺底每一滴茶湯）。第二泡縮短至 40 秒，第三泡起每泡順延 15 秒，可連續享受 6-8 泡層次豐富的冷香變化。`,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    relatedProductId: 'prod-tea-1',
  },
  {
    id: 'news-woodfire-restock',
    title: '工藝尋器：苗栗柴窯西施陶壺「孤舟」出窯筆記',
    category: 'teaware_craft',
    categoryLabel: '茶具工藝',
    publishedAt: '2026-09-01',
    isPinned: false,
    isPublished: true,
    author: '李茂盛 師傅',
    authorRole: '陶藝主理人',
    tags: ['柴燒手拉胚', '苗栗柴窯', '西施壺', '茶具保養'],
    readTime: '4 分鐘閱讀',
    viewsCount: 890,
    summary: '歷經四天三夜松木高溫柴燒，落灰自然流釉結晶，出水如柱斷水俐落，每把色澤紋理皆為世間唯一孤品。',
    content: `各位壺友期待已久的苗栗柴燒西施陶壺「孤舟」全新一窯已完成出窯整理。

本次窯燒使用台灣在地相思木與老松木混合投柴，最高溫突破 1,280°C。在窯中迎風面呈現厚重金屬光澤落灰結晶，背風面則燒出溫潤如蜜糖般的焦糖紅褐色。

每一把陶壺皆經過 24 小時無鉛無毒沸水測試，出水順暢如水柱，斷水乾淨俐落不流涎。柴燒陶土中的多孔隙天然礦物質，更能在注水沖泡時柔化水質，讓焙火烏龍與老鐵觀音展現更圓融深厚之風味。

本次僅有四把通過評選上架，歡迎至線上型錄或青田門市親手持握試水。`,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    relatedProductId: 'prod-ware-1',
  },
  {
    id: 'news-brewing-tips-celadon',
    title: '茶席美學：宋代汝窯天青品茗杯的開片與養杯之道',
    category: 'knowledge',
    categoryLabel: '習茶知味',
    publishedAt: '2026-08-25',
    isPinned: false,
    isPublished: true,
    author: '林怡秀',
    authorRole: '茶道專欄主編',
    tags: ['天青汝窯', '養杯心得', '金絲鐵線', '器皿賞析'],
    readTime: '3 分鐘閱讀',
    viewsCount: 1120,
    summary: '汝窯之美，在於歲月。了解如何透過日常單一茶湯的撫育，讓蟬翼細紋逐漸養出如山水畫卷般的金絲鐵線。',
    content: `汝窯開片，是釉與胎體膨脹係數不同所產生的自然物理奇蹟。宋人視之為「缺憾之美」，而茶人更將其視為與器物日夕相伴的情感紀錄。

【養杯要訣】
1. 一杯一茶：初期建議專注品飲單一茶種（如紅玉紅茶或重焙鐵觀音），使開片微細紋理吸收均勻雅致的茶色。
2. 溫潤擦拭：每次品茗後，以溫水沖淨，再用純棉養壺布輕柔擦拭釉面，置於通風處自然陰乾。
3. 忌沾油脂：切勿將茶具置於油膩處或使用強效洗劑清洗，以免阻礙氣孔呼吸。

隨時光流轉，杯底釉面將浮現錯落有致的琥珀色冰裂紋，這正是器物因您的滋養而獲得的第二次生命。`,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80',
    relatedProductId: 'prod-ware-2',
  },
];

export const DEFAULT_NEWS_ARTICLES = INITIAL_NEWS;
