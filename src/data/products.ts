import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'tea-lishan-oolong',
    name: '梨山高冷烏龍茶「凝霜」',
    enName: 'Lishan High-Mountain Oolong "Frost Whispers"',
    category: 'tea',
    categoryLabel: '嚴選單品茶',
    subtitle: '海拔2,200公尺冰冽雲霧，清芬幽長如蘭',
    description: '採自台灣梨山翠峰高海拔茶區，長年籠罩於冷霧之中，日夜溫差顯著。茶菁肉厚富膠質，經輕發酵與慢火輕揉，茶湯呈清透蜜金。入口先是冷礦冷磺微韻，隨後綻放典雅高山蘭花香與高山水蜜桃甜韻，三泡後喉韻回甘不絕。',
    price: 1380,
    originalPrice: 1580,
    spec: '75g / 雙層真空鋁箔茶罐裝',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    badge: '季末嚴選',
    origin: '台灣南投 梨山翠峰產區',
    elevation: '2,200 - 2,400 公尺',
    fermentation: 18,
    roasting: 10,
    flavorNotes: ['幽雅蘭花', '高山冷礦氣', '清甜白桃', '持久回甘'],
    craftStory: '由具備三十年經驗之茶務總監郭雅雯親自監製，清晨露水收斂後手工採摘一心二葉，歷經十二道低溫萎凋與慢火定香工序。',
    brewingGuide: {
      waterTemp: '92°C - 96°C',
      teaRatio: '1:20 (約 5g 茶葉搭配 100ml 水)',
      steepTime: '第一泡 50 秒，二泡 45 秒，三泡起每回遞增 15 秒，可耐泡 6-8 回',
      recommendedVessel: '薄胎白瓷蓋碗或高密度朱泥壺',
      flavorHighlight: '首泡聞香杯凝香如幽蘭，三泡水路柔順生津'
    },
    inStock: true,
    stockCount: 18,
  },
  {
    id: 'tea-tieguanyin-charcoal',
    name: '木柵正欉鐵觀音「沉香」',
    enName: 'Muzha Traditional Tieguanyin "Agarwood"',
    category: 'tea',
    categoryLabel: '嚴選單品茶',
    subtitle: '古法龍眼炭焙八番，醇厚微酸弱果香',
    description: '恪遵台北木柵百年古法製程，選用純種正欉紅心歪尾桃茶樹品種。以龍眼木炭緩火慢焙，八起八落，耗時超過六十小時。茶湯呈現深沉琥珀紅寶石光澤，帶有獨特「觀音韻」——焙火熟果香氣伴隨天然微果酸，滋味醇厚圓潤，暖胃生津。',
    price: 1180,
    spec: '100g / 純棉古紙包裝木盒裝',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80',
    badge: '鎮店之寶',
    origin: '台灣台北 木柵指南山區',
    elevation: '350 - 450 公尺',
    fermentation: 45,
    roasting: 75,
    flavorNotes: ['龍眼木炭香', '熟成烏梅果酸', '炒栗子甜香', '沉穩觀音韻'],
    craftStory: '木柵傳承四代炭焙師傅親自顧爐，以龍眼炭之文火細烘慢養，茶葉緊結呈蜻蜓頭、青蛙腿之古雅形態。',
    brewingGuide: {
      waterTemp: '98°C - 100°C 沸水',
      teaRatio: '1:18 (約 7g 茶葉搭配 120ml 水)',
      steepTime: '第一泡 40 秒，後續每泡增加 10 秒，耐泡可達 8 泡以上',
      recommendedVessel: '宜興紫砂壺、老朱泥壺或柴燒厚陶壺',
      flavorHighlight: '沸水高沖激發炭香，入口微澀後轉強烈生津甘露'
    },
    inStock: true,
    stockCount: 14,
  },
  {
    id: 'tea-sun-moon-lake-ruby',
    name: '日月潭特級紅玉「紅韻18號」',
    enName: 'Sun Moon Lake Ruby Black Tea No. 18',
    category: 'tea',
    categoryLabel: '嚴選單品茶',
    subtitle: '台灣野生山茶育種，天然肉桂與清涼薄荷甜韻',
    description: '茶業改良場歷經半世紀育種，以台灣原生野生山茶與緬甸大葉種配種而成。日月潭得天獨厚的盆地微型氣候與濕潤雨霧，孕育出晶瑩剔透的朱紅茶湯。入口即感受天然細緻的肉桂清香，尾韻泛起一抹獨有的薄荷清涼感，完全不苦澀。',
    price: 980,
    originalPrice: 1100,
    spec: '50g / 日本和紙手工罐裝',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    badge: '國際金獎',
    origin: '台灣南投 日月潭魚池鄉',
    elevation: '700 - 850 公尺',
    fermentation: 95,
    roasting: 15,
    flavorNotes: ['天然肉桂', '薄荷清涼感', '焦糖甜香', '紅櫻桃果韻'],
    craftStory: '全手工採摘嫩芽，經揉撚、全發酵與低溫長時乾燥，保留天然芳香精油成分。',
    brewingGuide: {
      waterTemp: '85°C - 90°C (不宜過燙，以防破壞高雅香氣)',
      teaRatio: '1:30 (約 4g 茶葉搭配 120ml 水)',
      steepTime: '第一泡 40 秒即可出湯，色澤深紅明澈',
      recommendedVessel: '透光白瓷壺或耐熱高硼矽玻璃杯',
      flavorHighlight: '放涼後更顯甜潤，亦非常適合冷萃（常溫浸泡後冷藏 8 小時）'
    },
    inStock: true,
    stockCount: 22,
  },
  {
    id: 'tea-alishan-jinxuan',
    name: '阿里山石棹手採金萱「晨霧」',
    enName: 'Alishan Shizhao Jinxuan "Morning Dew"',
    category: 'tea',
    categoryLabel: '嚴選單品茶',
    subtitle: '天然奶香與梔子花淡雅芬芳，滑潤細膩',
    description: '來自嘉義阿里山石棹茶區，晨昏經常雲遮霧罩。茶湯淡金黃澄澈，入口帶有純天然且不造作的溫潤奶香，以及清新綻放的白色梔子花香氣。口感綿密滑順，無任何添加人工香精，純淨體現台灣特有品種的天然本質。',
    price: 880,
    spec: '100g / 經典真空密封包裝',
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=900&q=80',
    origin: '台灣嘉義 阿里山石棹產區',
    elevation: '1,400 - 1,600 公尺',
    fermentation: 20,
    roasting: 15,
    flavorNotes: ['天然絲滑奶香', '梔子白花', '甜蔗糖香', '清潤生津'],
    craftStory: '自然農法友善耕作，以手工輕採二葉一心，低溫輕發酵，保有最高程度的茶多酚與甘甜胺基酸。',
    brewingGuide: {
      waterTemp: '90°C - 92°C',
      teaRatio: '1:20 (約 5g 茶葉搭配 100ml 水)',
      steepTime: '一泡 50 秒，二泡 45 秒，每泡增加 15 秒',
      recommendedVessel: '白瓷蓋碗或青瓷壺',
      flavorHighlight: '茶杯底留香濃郁，熱飲冷飲皆能感受絲滑乳香'
    },
    inStock: true,
    stockCount: 25,
  },
  {
    id: 'teaware-woodfire-teapot',
    name: '柴燒側把西施陶壺「孤舟」',
    enName: 'Wood-fired Ceramic Teapot "Solitary Boat"',
    category: 'teaware',
    categoryLabel: '職人手作茶具',
    subtitle: '落灰流釉千度成器，自然天成獨一無二',
    description: '由台灣苗栗青年陶藝師以古法柴窯歷時四天三夜燒製。松木與相思木燃燒後的天然木灰飄落於坯體之上，在高達 1280°C 高溫下熔化成自然釉面。出水順暢如柱，斷水俐落。柴燒富含遠紅外線與微量礦物質，能軟化水質、聚攏茶香。',
    price: 3680,
    originalPrice: 4200,
    spec: '容量約 210ml ｜ 重量約 185g ｜ 單件孤品',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    badge: '職人手作孤品',
    origin: '台灣苗栗 柴窯手拉坯',
    flavorNotes: ['天然木灰結晶', '雙氣孔軟化水質', '人體工學側把', '斷水利落'],
    craftStory: '每一把皆由陶藝師親手拉坯成型，歷經窯內火舌流竄與落灰交融，每件作品色澤與紋理皆為世間獨一無二。',
    brewingGuide: {
      waterTemp: '適用於全溫度水質',
      teaRatio: '建議投茶量 6g - 8g',
      steepTime: '適用於烏龍茶、鐵觀音、普洱等重底韻茶品',
      recommendedVessel: '搭配同系列柴燒茶海與品茗杯',
      flavorHighlight: '陶土具備良好透氣性，長期使用越能養出溫潤玉澤包漿'
    },
    inStock: true,
    stockCount: 4,
  },
  {
    id: 'teaware-ru-kiln-cups',
    name: '汝窯天青開片品茗杯組（雙入）',
    enName: 'Ru Kiln Sky-Cyan Teacup Set (Pair)',
    category: 'teaware',
    categoryLabel: '職人手作茶具',
    subtitle: '雨過天青雲破處，細密蟬翼開片紋',
    description: '復刻宋代五大名窯之首「汝窯」經典。釉色若隱若現，如雨過天青般溫潤如玉。杯壁厚薄適中，持握溫雅不燙手。隨日常茶湯浸潤撫育，釉面細微蟬翼紋路將逐漸形成優美的金絲鐵線，記錄屬於茶主人的歲月印記。',
    price: 1480,
    spec: '口徑 6.5cm ｜ 高 4.5cm ｜ 容量 65ml（雙入附木盒）',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80',
    badge: '雅致對杯',
    origin: '台灣鶯歌 陶藝工作室',
    flavorNotes: ['宋代天青釉', '蟬翼金絲開片', '溫潤胎質', '茶席提色'],
    craftStory: '高溫素燒後施純礦物汝釉，經還原焰燒結。開片聲如清脆風鈴，養杯後紋理如山水畫卷。',
    brewingGuide: {
      waterTemp: '適用各種茶湯溫度',
      teaRatio: '單杯品飲容量 50-60ml 最為怡人',
      steepTime: '建議以單一茶類長期浸潤養杯',
      recommendedVessel: '搭配白瓷蓋碗或紫砂壺皆宜',
      flavorHighlight: '白底映襯茶湯金黃或朱紅，視覺與味覺雙重享受'
    },
    inStock: true,
    stockCount: 12,
  },
  {
    id: 'teaware-slate-tray',
    name: '烏金石硯式乾泡茶盤「靜水」',
    enName: 'Black Gold Stone Dry-Brewing Tea Tray "Still Water"',
    category: 'teaware',
    categoryLabel: '職人手作茶具',
    subtitle: '整石水磨雕鑿，極簡懸浮隱密導水',
    description: '選用質地堅硬、密度極高之天然烏金石，經數道手工水磨打磨拋光而成。表面觸感如絲絨般柔潤，具備不吸茶味、耐刮抗茶垢之特性。微坡度暗槽導流設計，茶水自然匯聚不積水，呈現靜水流深的茶席禪意。',
    price: 2880,
    originalPrice: 3200,
    spec: '長 38cm × 寬 20cm × 高 2.5cm ｜ 重量約 3.2kg',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80',
    origin: '原石開採手工水磨',
    flavorNotes: ['天然烏金原石', '防滑耐熱抗污', '隱藏式微導水', '茶席重心'],
    craftStory: '保留天然石材沉穩肌理，四邊圓弧微收，底部設有靜音耐磨矽膠避震腳墊，穩若磐石。',
    inStock: true,
    stockCount: 6,
  },
  {
    id: 'teaware-copper-accessories',
    name: '手打錘目紋純銅茶則茶撥組',
    enName: 'Hand-Hammered Pure Copper Tea Scoop & Needle Set',
    category: 'teaware',
    categoryLabel: '職人手作茶具',
    subtitle: '千錘百鍊的職人指溫，持之有度，取茶如禮',
    description: '選用高純度紫銅板，由金工職人一錘一錘手工敲打出細密自然的波光錘目紋。銅器隨時間使用將氧化產生迷人的古雅包漿色澤。茶則弧度貼合茶罐，茶撥利於撥茶入壺，為席間增添沉穩的金石之美。',
    price: 980,
    spec: '茶則長 16cm ｜ 茶撥長 17cm ｜ 附天然棉麻收納束口袋',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
    origin: '台灣在地金工工作室',
    flavorNotes: ['手打鍛造錘紋', '純銅自然包漿', '無化學塗層', '持握手感沉著'],
    craftStory: '不經化學電鍍，保留純銅原始金屬質感，隨主人日常撫摸與茶湯蒸汽潤澤，展現時間淬鍊的古樸美感。',
    inStock: true,
    stockCount: 16,
  },
  {
    id: 'gift-qiyun-master-set',
    name: '棲雲雙品經典茶席木盒禮盒',
    enName: 'Qi Yun Signature Dual-Tea & Teacup Wooden Gift Set',
    category: 'gift',
    categoryLabel: '典藏茶席禮盒',
    subtitle: '梨山高冷烏龍 + 汝窯天青對杯 + 原木榫接燙金木盒',
    description: '集結棲雲茶事兩大人氣經典：梨山高冷烏龍茶「凝霜」75g 一罐，搭配手工打造的汝窯天青品茗杯雙入。外盒採用天然松木卡榫工藝製作，綴以燙霧金封箋與手寫書法賀卡，為尊貴長輩、商務夥伴或知心茶友的最佳品味贈禮。',
    price: 2980,
    originalPrice: 3480,
    spec: '高山茶 75g + 汝窯杯 2 入 + 手作松木精裝盒 + 原生麻繩包裝',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    badge: '節慶人氣首選',
    origin: '台灣精選茶產區 & 鶯歌窯藝',
    flavorNotes: ['高山蘭花蜜香', '宋代汝窯開片', '天然原木質感', '附客製化代寫卡片'],
    craftStory: '每一盒皆隨附茶品產銷履歷溯源證書與沖泡指導摺頁，傳遞最誠摯敬重的茶席禮節。',
    inStock: true,
    stockCount: 10,
  }
];

export const TEA_STORIES = [
  {
    id: 'philosophy',
    title: '以時間萃取茶席之美',
    enTitle: 'The Art of Patience & Presence',
    description: '一片茶葉從高山晨霧、手工採摘、日曬萎凋到千度烘焙，歷經時光的凝鍊。我們相信，泡茶不僅是一杯茶湯，而是一場讓心靈安頓的日常儀式。',
    highlight: '源自台灣純淨山林的自然能量'
  },
  {
    id: 'craft',
    title: '器物與茶葉的對話',
    enTitle: 'Harmony of Vessel and Leaf',
    description: '好茶需配好器。陶壺的厚薄、蓋碗的敞口、泥料的氣孔，皆會改變茶香的聚散與水質的軟潤。我們探訪各地陶藝與金工職人，嚴選能善待每一片茶葉的茶器具。',
    highlight: '溫度、器皿與茶水的精妙契合'
  },
  {
    id: 'purity',
    title: '全批次 SGS 檢驗零農藥殘留',
    enTitle: 'Commitment to Purity',
    description: '棲雲所有茶品皆堅持單一產區無混茶，每季茶菁採收後均送交 SGS 進行 481 項農藥殘留檢驗，唯有全數「零檢出」才得以上架，讓您與家人安心品飲。',
    highlight: '安心純淨，品得自然原味'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: '林先生',
    role: '建築設計師 ｜ 習茶七年',
    content: '收到梨山凝霜烏龍時，包裝的質感就讓人驚艷。熱水一沖，整個茶室都是冷杉與蘭花香，回甘極為清潤。木盒包裝更看得出品牌的用心。',
    purchased: '梨山高冷烏龍茶「凝霜」',
    rating: 5,
  },
  {
    id: 't2',
    name: '陳小姐',
    role: '陶藝愛好者 ｜ 台北',
    content: '柴燒側把西施壺的手感極佳，出水像一道水柱般俐落不垂流！用它來泡木柵鐵觀音，茶湯特別甘甜軟順，已經成為我每天書桌前最期待的時刻。',
    purchased: '柴燒側把西施陶壺「孤舟」',
    rating: 5,
  },
  {
    id: 't3',
    name: '張總經理',
    role: '科技業主管',
    content: '端午與中秋都向棲雲訂購了雙品茶席木盒作為貴賓贈禮，收到禮物的客戶都讚賞這份禮物有文化深度又有質感，客服代寫卡片的字跡更是用心。',
    purchased: '棲雲雙品經典茶席木盒禮盒',
    rating: 5,
  }
];

export const BREWING_TIPS = [
  {
    step: '一、擇器與溫壺',
    detail: '泡茶前先以滾水燙熱茶壺與茶杯，喚醒器皿毛細孔，維持泡茶時的穩定溫度。',
    tempAdvice: '壺溫適中'
  },
  {
    step: '二、投茶知量',
    detail: '緊結球形烏龍茶鋪滿壺底約 1/4 至 1/5 即可；條索狀包種或紅茶約佔壺身 1/3。',
    tempAdvice: '約 5g - 7g'
  },
  {
    step: '三、知水溫火候',
    detail: '高山烏龍與鐵觀音適合 95°C-100°C 沸水激發高香；細緻紅玉或綠茶建議降溫至 85°C-90°C。',
    tempAdvice: '控溫得宜'
  },
  {
    step: '四、靜心出湯',
    detail: '第一泡約 40-50 秒出淨，茶湯入公道杯均勻濃淡，持杯聞香，細品三段層次。',
    tempAdvice: '分秒有韻'
  }
];

export const FAQS = [
  {
    q: '茶葉收到後應該如何保存，能放多久？',
    a: '未開封前請置於陰涼乾燥處，避免陽光直射與異味雜處（如冰箱強烈食物味）。台灣高山烏龍茶與金萱若拆封，建議在 3 個月內飲用完畢以享最佳香氣；木柵鐵觀音具備慢火炭焙特性，長期密封存放甚至會隨歲月轉化為陳年老茶。'
  },
  {
    q: '柴燒壺與一般紫砂壺有什麼不同？如何開壺與保養？',
    a: '柴燒壺是由陶土直接在高溫柴窯中與天然木灰熔融反應，表面無人工化學釉藥，具備獨特的遠紅外線與雙氣孔透氣性，能使茶湯水質甘醇。初次使用只需以沸水連續沖淋浸泡三次即可開始泡茶；平時使用完以清水洗淨後自然陰乾，切勿使用洗碗精清洗。'
  },
  {
    q: '請問配送時間要多久？有免運門檻嗎？',
    a: '全館單筆訂單消費滿 NT$1,500 即享黑貓宅急便或超商取貨免運費（未達門檻黑貓運費 NT$100、超商取貨 NT$65）。我們於收到訂單後 24-48 小時內出貨，黑貓宅配出貨後約 1-2 個工作天抵達，超商取貨約 2-3 天送達指定門市。'
  },
  {
    q: '可以開立公司抬頭統編發票，或客製賀卡代寫服務嗎？',
    a: '可以！在結帳頁面的購物表單中，您可勾選「三聯式統一編號發票」並填寫統一編號與公司抬頭。若為贈禮，我們亦免費提供精緻茶席提袋與代寫賀卡服務，您只需在備註欄填寫卡片內容即可。'
  },
  {
    q: '我想預約到台北青田空間體驗茶席或親自挑選器皿，如何預約？',
    a: '我們在台北市大安區青田街設有預約部品茗空間，提供一對一侍茶與挑選器皿服務。您可透過網站的「聯絡我們」頁面填寫預約表單，或加入官方 LINE 帳號（@qiyuntea）與茶務秘書預約時段。'
  }
];
