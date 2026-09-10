export type ProductCategory = 'all' | 'tea' | 'teaware' | 'gift';

export interface BrewingGuide {
  waterTemp: string;      // 水溫 e.g. 95°C - 100°C
  teaRatio: string;       // 茶水比 e.g. 1:20 (5g 茶葉 : 100ml 水)
  steepTime: string;      // 浸泡時間 e.g. 第一泡 50s，次泡續加 15s
  recommendedVessel: string; // 建議茶具 e.g. 朱泥壺、紫砂西施壺或白瓷蓋碗
  flavorHighlight: string;
}

export interface Product {
  id: string;
  name: string;
  enName: string;
  category: 'tea' | 'teaware' | 'gift';
  categoryLabel: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  spec: string;           // 規格 e.g. 75g / 罐裝 or 220ml
  image: string;
  badge?: string;         // '季節限定' | '手採嚴選' | '職人手作' | '熱銷推薦'
  origin?: string;        // 產地 e.g. 台灣南投梨山翠峰
  elevation?: string;     // 海拔 e.g. 2,200 公尺
  fermentation?: number;  // 發酵度 0-100%
  roasting?: number;      // 焙火度 0-100%
  flavorNotes: string[];  // 風味標籤 e.g. ['冷礦霜氣', '幽雅蘭花', '清甜果香']
  craftStory?: string;    // 職人/製作工藝細節
  brewingGuide?: BrewingGuide;
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ShippingMethod = 'home' | 'convenience' | 'studio';
export type PaymentMethod = 'credit' | 'linepay' | 'atm' | 'cod';
export type InvoiceType = 'cloud' | 'carrier' | 'taxId';

export interface OrderFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingMethod: ShippingMethod;
  shippingAddress: string;
  convenienceStoreName?: string;
  paymentMethod: PaymentMethod;
  invoiceType: InvoiceType;
  carrierCode?: string;
  taxIdNumber?: string;
  companyTitle?: string;
  giftWrapping: boolean;
  giftCardMessage?: string;
  orderNotes?: string;
}

export interface CompletedOrder {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  formData: OrderFormData;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
}

export type PageId = 'home' | 'products' | 'news' | 'checkout' | 'contact' | 'admin';

export type BlogCategory = 'announcement' | 'tea_harvest' | 'event' | 'knowledge' | 'tea_culture' | 'brewing_guide' | 'teaware_craft';

export interface NewsArticle {
  id: string;
  title: string;
  category: BlogCategory;
  categoryLabel: string;
  publishedAt: string;
  summary: string;
  content: string;
  image?: string;
  isPinned?: boolean;
  isPublished: boolean;
  author: string;
  authorRole?: string;
  tags?: string[];
  readTime?: string;
  viewsCount?: number;
  relatedProductId?: string;
}

export type BlogPost = NewsArticle;

export type StaffRole = 'admin' | 'editor' | 'store_manager';

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  roleTitle: string; // e.g., '茶務總監', '茶席策展人', '陶藝主理人', '內容小編', '門市店長'
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  lastLoginAt?: string;
  createdAt: string;
  notes?: string;
}

export type AuditLogCategory = 'blog' | 'staff' | 'products' | 'banner' | 'inquiries' | 'auth';

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId?: string;
  actorName: string;
  actorRoleTitle: string;
  category: AuditLogCategory;
  categoryLabel: string;
  action: string;
  details: string;
}

export interface InquiryMessage {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  date?: string;
  guestsCount?: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
}

export interface BannerNotice {
  text: string;
  enabled: boolean;
}

export interface PageMetaInfo {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

