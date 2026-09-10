import { PageId, PageMetaInfo } from '../types';

export const PAGE_META: Record<PageId, PageMetaInfo> = {
  home: {
    title: '棲雲茶事 Qi Yun Tea ｜ 嚴選台灣單品高山茶與職人手作茶具',
    description: '專為愛茶人打造的質感茶葉與職人茶具線上品牌官網。嚴選台灣高山單品茶與柴燒汝窯器皿，提供從品味到生活的靜心體驗。',
    ogTitle: '棲雲茶事 Qi Yun Tea ｜ 嚴選台灣單品高山茶與職人手作茶具',
    ogDescription: '以時間萃取茶席之美，器物與茶葉的靜心對話。探索台灣高山單品茶、手作柴燒壺與天青汝窯杯。',
    ogImage: '/og-image.jpg'
  },
  products: {
    title: '茶品與器皿鑑賞 ｜ 棲雲茶事 Qi Yun Tea',
    description: '細品梨山冷冽清霜、木柵炭焙沉香與日月潭紅玉；選配苗栗柴燒西施陶壺與宋代天青汝窯對杯，感受茶葉與器皿的絕妙共鳴。',
    ogTitle: '茶品與器皿鑑賞 ｜ 嚴選台灣高山烏龍與職人手作茶具',
    ogDescription: '全批次 SGS 481項農藥零檢出茶葉，搭配台灣陶藝師手工柴燒陶壺。立即線上鑑賞與選購。',
    ogImage: '/og-image.jpg'
  },
  checkout: {
    title: '購物結帳與訂單填寫 ｜ 棲雲茶事 Qi Yun Tea',
    description: '安全的線上訂購與茶席宅配服務。滿 NT$1,500 即享全台免運，支援信用卡、LINE Pay、超商取貨付款與公司統編發票。',
    ogTitle: '線上訂購單 ｜ 棲雲茶事 Qi Yun Tea',
    ogDescription: '完成您的茶葉與職人器皿訂購。享精緻茶席保護包裝與代寫祝福卡片服務。',
    ogImage: '/og-image.jpg'
  },
  contact: {
    title: '預約品茗與茶務諮詢 ｜ 棲雲茶事 Qi Yun Tea',
    description: '歡迎預約台北青田街私人品茗空間，亦提供企業年節禮盒訂製、茶道茶席活動策劃與一對一茶具選配諮詢。',
    ogTitle: '預約品茗與聯絡我們 ｜ 棲雲茶事 Qi Yun Tea',
    ogDescription: '親臨台北青田街茶舍體驗一對一侍茶，或聯絡我們為您訂製專屬茶葉與企業客製禮盒。',
    ogImage: '/og-image.jpg'
  },
  news: {
    title: '最新消息與時令茶訊 ｜ 棲雲茶事 Qi Yun Tea',
    description: '掌握台灣高山茶採收動態、青田茶舍品茗席次開放與手作柴燒陶器出窯公告。',
    ogTitle: '最新消息與茶事專欄 ｜ 棲雲茶事 Qi Yun Tea',
    ogDescription: '掌握第一手採茶季早鳥預購、茶道講座與限量職人陶壺抵店資訊。',
    ogImage: '/og-image.jpg'
  },
  admin: {
    title: '夥伴後台管理系統 ｜ 棲雲茶事 Qi Yun Tea',
    description: '棲雲茶事內部夥伴後台，提供公告消息發布、商品庫存維護、頂部跑馬燈設定與預約留言管理。',
    ogTitle: '夥伴後台管理系統 ｜ 棲雲茶事 Qi Yun Tea',
    ogDescription: '棲雲茶事內部夥伴管理系統。',
    ogImage: '/og-image.jpg'
  }
};

export function updateDocumentMeta(pageId: PageId, customTitle?: string, customDesc?: string, customImage?: string) {
  const meta = PAGE_META[pageId];
  if (!meta) return;

  const finalTitle = customTitle || meta.title;
  const finalDesc = customDesc || meta.description;
  const finalOgTitle = customTitle || meta.ogTitle;
  const finalOgDesc = customDesc || meta.ogDescription;
  const finalImage = customImage || meta.ogImage;

  // Title
  document.title = finalTitle;

  // Helper for meta tags
  const setMetaContent = (selector: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const [attr, val] = selector.replace('meta[', '').replace(']', '').split('=');
      const cleanAttr = attr.trim();
      const cleanVal = val.replace(/["']/g, '').trim();
      el.setAttribute(cleanAttr, cleanVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Description
  setMetaContent('meta[name="description"]', finalDesc);

  // Open Graph
  setMetaContent('meta[property="og:title"]', finalOgTitle);
  setMetaContent('meta[property="og:description"]', finalOgDesc);
  setMetaContent('meta[property="og:image"]', finalImage);

  // Twitter / Threads
  setMetaContent('meta[name="twitter:title"]', finalOgTitle);
  setMetaContent('meta[name="twitter:description"]', finalOgDesc);
  setMetaContent('meta[name="twitter:image"]', finalImage);
}
