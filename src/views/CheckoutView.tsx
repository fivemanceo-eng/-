import React, { useState } from 'react';
import { 
  ShoppingBag, Truck, CreditCard, ShieldCheck, ArrowRight, CheckCircle2, 
  Trash2, Plus, Minus, FileText, Gift, Sparkles, AlertCircle, Printer
} from 'lucide-react';
import { CartItem, PageId, ShippingMethod, PaymentMethod, InvoiceType, OrderFormData, CompletedOrder } from '../types';
import { PRODUCTS } from '../data/products';

interface CheckoutViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageId) => void;
  onQuickAdd: (product: any) => void;
}

const FREE_SHIPPING_THRESHOLD = 1500;

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onQuickAdd,
}) => {
  // Form State
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    shippingMethod: 'home',
    shippingAddress: '',
    convenienceStoreName: '',
    paymentMethod: 'credit',
    invoiceType: 'cloud',
    carrierCode: '',
    taxIdNumber: '',
    companyTitle: '',
    giftWrapping: false,
    giftCardMessage: '',
    orderNotes: '',
  });

  // Promo Code State
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Errors & Completed Order State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Shipping calculation
  let shippingFee = 0;
  if (formData.shippingMethod === 'studio') {
    shippingFee = 0;
  } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    shippingFee = 0;
  } else {
    shippingFee = formData.shippingMethod === 'home' ? 100 : 65;
  }

  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  // Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'TEALOVER') {
      const disc = Math.round(subtotal * 0.1);
      setCouponDiscount(disc);
      setCouponMessage({ type: 'success', text: `已套用愛茶人優惠碼，現折 NT$ ${disc}` });
    } else if (code === 'QY100') {
      setCouponDiscount(100);
      setCouponMessage({ type: 'success', text: '已套用首購優惠碼，現折 NT$ 100' });
    } else {
      setCouponDiscount(0);
      setCouponMessage({ type: 'error', text: '無效或已過期的優惠代碼，請嘗試輸入 TEALOVER' });
    }
  };

  // Form Field Updates
  const updateField = (field: keyof OrderFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errs.customerName = '請填寫訂購人真實姓名';
    }
    if (!formData.customerPhone.trim() || !/^[0-9\-+]{8,15}$/.test(formData.customerPhone.trim())) {
      errs.customerPhone = '請填寫正確的手機聯絡電話';
    }
    if (!formData.customerEmail.trim() || !formData.customerEmail.includes('@')) {
      errs.customerEmail = '請填寫正確的電子信箱以接收訂單確認通知';
    }

    if (formData.shippingMethod === 'home' && !formData.shippingAddress.trim()) {
      errs.shippingAddress = '請填寫黑貓宅配收件地址（含縣市與路段）';
    }
    if (formData.shippingMethod === 'convenience' && !formData.convenienceStoreName?.trim()) {
      errs.convenienceStoreName = '請填寫超商門市名稱或店號（例如：7-11 青田門市）';
    }

    if (formData.invoiceType === 'carrier' && !formData.carrierCode?.trim()) {
      errs.carrierCode = '請填寫手機共通載具條碼（如 /AB12345）';
    }
    if (formData.invoiceType === 'taxId') {
      if (!formData.taxIdNumber?.trim() || !/^\d{8}$/.test(formData.taxIdNumber.trim())) {
        errs.taxIdNumber = '請填寫正確的 8 碼公司統一編號';
      }
      if (!formData.companyTitle?.trim()) {
        errs.companyTitle = '請填寫公司抬頭名稱';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Order
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const orderNumber = `QY-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      const order: CompletedOrder = {
        orderNumber,
        createdAt: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }),
        items: [...cart],
        formData: { ...formData },
        subtotal,
        shippingFee,
        discount: couponDiscount,
        total: finalTotal,
      };
      setCompletedOrder(order);
      onClearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  // Render: Order Confirmation Screen
  if (completedOrder) {
    return (
      <div id="order-completed-view" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="bg-white rounded-xl border border-[#D9D0C3] p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-[#3E5C43] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-[#8C5B3E] font-semibold tracking-widest uppercase">
              Order Confirmed
            </span>
            <h1 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
              感謝您的品味訂購，茶席準備中
            </h1>
            <p className="text-xs sm:text-sm text-[#665F53] max-w-lg mx-auto leading-relaxed">
              我們已收到您的訂購表單，茶務專員將在 24 小時內細心為您揀選包裝，並將出貨動態發送至您的信箱。
            </p>
          </div>

          {/* Order Snapshot Box */}
          <div className="bg-[#FAF8F5] p-5 rounded-lg border border-[#E5E0D6] text-left space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between border-b border-[#E8E2D9] pb-3 gap-2">
              <div>
                <span className="text-[#857D71]">訂單編號：</span>
                <span className="font-mono font-bold text-[#1F2421] ml-1">{completedOrder.orderNumber}</span>
              </div>
              <div>
                <span className="text-[#857D71]">成立時間：</span>
                <span className="font-medium text-[#1F2421] ml-1">{completedOrder.createdAt}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[#857D71] block">收件姓名：</span>
                <span className="font-medium text-[#1F2421]">{completedOrder.formData.customerName} ({completedOrder.formData.customerPhone})</span>
              </div>
              <div>
                <span className="text-[#857D71] block">寄送方式：</span>
                <span className="font-medium text-[#1F2421]">
                  {completedOrder.formData.shippingMethod === 'home'
                    ? `黑貓常溫宅配 - ${completedOrder.formData.shippingAddress}`
                    : completedOrder.formData.shippingMethod === 'convenience'
                    ? `超商取貨 - ${completedOrder.formData.convenienceStoreName}`
                    : '台北青田茶舍門市自取（台北市大安區青田街12巷8號）'}
                </span>
              </div>
              <div>
                <span className="text-[#857D71] block">付款方式：</span>
                <span className="font-medium text-[#1F2421]">
                  {completedOrder.formData.paymentMethod === 'credit'
                    ? '信用卡線上付款（已完成授權）'
                    : completedOrder.formData.paymentMethod === 'linepay'
                    ? 'LINE Pay 行動支付'
                    : completedOrder.formData.paymentMethod === 'atm'
                    ? 'ATM 虛擬帳號轉帳（玉山銀行 808 帳號後五碼：88219）'
                    : '貨到付款'}
                </span>
              </div>
              <div>
                <span className="text-[#857D71] block">訂單實付總額：</span>
                <span className="font-serif-tc text-base font-bold text-[#8C5B3E]">
                  NT$ {completedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Gift wrap notice */}
            {completedOrder.formData.giftWrapping && (
              <div className="bg-[#F2EDE5] p-2.5 rounded border border-[#DFD6C8] text-[11px] text-[#5A5245] flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#8C5B3E]" />
                <span>已為您安排茶席禮盒精裝提袋與代寫賀卡服務。</span>
              </div>
            )}
          </div>

          {/* Item details */}
          <div className="text-left space-y-2">
            <h3 className="font-serif-tc text-sm font-bold text-[#1F2421]">訂購商品品項</h3>
            <div className="divide-y divide-[#EFEBE4] border border-[#E5E0D6] rounded-lg overflow-hidden bg-[#FAF8F5]">
              {completedOrder.items.map((it) => (
                <div key={it.product.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover border border-[#E0D8CB]"
                    />
                    <div>
                      <div className="font-serif-tc font-bold text-[#1F2421]">{it.product.name}</div>
                      <div className="text-[11px] text-[#8C8477]">{it.product.spec} × {it.quantity}</div>
                    </div>
                  </div>
                  <div className="font-serif-tc font-bold text-[#1F2421]">
                    NT$ {(it.product.price * it.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E8E2D9]">
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs font-medium rounded transition-colors"
            >
              返回官網首頁
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#F2EDE5] hover:bg-[#E5DED4] text-[#423C32] text-xs font-medium rounded border border-[#D9D0C3] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> 列印訂單明細
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="w-full sm:w-auto px-6 py-2.5 text-[#8C5B3E] hover:underline text-xs font-medium"
            >
              繼續品選其他茶品
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render: Empty Cart State
  if (cart.length === 0) {
    return (
      <div id="empty-checkout-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
        <div className="w-20 h-20 bg-[#F2EDE5] text-[#8C5B3E] rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
            您的購物車目前是空的
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6659] max-w-md mx-auto leading-relaxed">
            您尚未挑選任何茶品或器具。探索我們嚴選的台灣單品高山茶與柴燒西施壺，為您的生活帶來溫潤茶香。
          </p>
        </div>

        <button
          id="empty-cart-browse-btn"
          onClick={() => onNavigate('products')}
          className="px-8 py-3.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs sm:text-sm font-medium rounded transition-colors shadow-xs"
        >
          探索嚴選茶品與茶具介紹
        </button>

        {/* Suggested popular products */}
        <div className="pt-10 border-t border-[#E5E0D6] space-y-6 text-left">
          <h2 className="font-serif-tc text-lg font-bold text-[#1F2421] text-center">
            愛茶人熱門推薦品項
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-lg border border-[#E5E0D6] flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded bg-[#F4EFEB] overflow-hidden mb-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif-tc text-sm font-bold text-[#1F2421]">{p.name}</h3>
                  <p className="text-[11px] text-[#8C8477] mt-0.5">{p.spec}</p>
                </div>
                <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between mt-3">
                  <span className="font-serif-tc font-bold text-xs text-[#1F2421]">NT$ {p.price.toLocaleString()}</span>
                  <button
                    onClick={() => onQuickAdd(p)}
                    className="px-3 py-1.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs font-medium rounded flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> 加購
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render: Active Checkout Form
  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Title & Breadcrumb */}
      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
          Order & Checkout Form
        </span>
        <h1 className="font-serif-tc text-3xl font-bold text-[#1F2421]">
          線上購物結帳表單
        </h1>
        <p className="text-xs sm:text-sm text-[#665F52]">
          請填寫收件資訊與選擇付款配送方式。全館單筆滿 NT$ 1,500 即享黑貓宅急便 / 超商免運優惠。
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: The Interactive Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: 訂購人與收件資訊 */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EFEBE4] pb-3">
              <div className="w-6 h-6 rounded-full bg-[#2A312B] text-white text-xs flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="font-serif-tc text-base font-bold text-[#1F2421]">
                訂購人與收件資訊
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#474034] font-medium mb-1">
                    收件人真實姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-name-input"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => updateField('customerName', e.target.value)}
                    placeholder="例如：林書懷"
                    className={`w-full p-2.5 bg-[#FAF8F5] border rounded text-xs focus:outline-none focus:border-[#8C5B3E] ${
                      errors.customerName ? 'border-red-500' : 'border-[#D9D0C3]'
                    }`}
                  />
                  {errors.customerName && (
                    <span className="text-red-600 text-[11px] mt-1 block">{errors.customerName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-[#474034] font-medium mb-1">
                    行動電話（超商取貨或宅配聯絡） <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => updateField('customerPhone', e.target.value)}
                    placeholder="例如：0912-345-678"
                    className={`w-full p-2.5 bg-[#FAF8F5] border rounded text-xs focus:outline-none focus:border-[#8C5B3E] ${
                      errors.customerPhone ? 'border-red-500' : 'border-[#D9D0C3]'
                    }`}
                  />
                  {errors.customerPhone && (
                    <span className="text-red-600 text-[11px] mt-1 block">{errors.customerPhone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">
                  電子信箱 Email（接收訂單確認信與物流追蹤碼） <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-email-input"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => updateField('customerEmail', e.target.value)}
                  placeholder="例如：tea.lover@example.com"
                  className={`w-full p-2.5 bg-[#FAF8F5] border rounded text-xs focus:outline-none focus:border-[#8C5B3E] ${
                    errors.customerEmail ? 'border-red-500' : 'border-[#D9D0C3]'
                  }`}
                />
                {errors.customerEmail && (
                  <span className="text-red-600 text-[11px] mt-1 block">{errors.customerEmail}</span>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: 配送方式 */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EFEBE4] pb-3">
              <div className="w-6 h-6 rounded-full bg-[#2A312B] text-white text-xs flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="font-serif-tc text-base font-bold text-[#1F2421]">
                配送方式選擇
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              {/* Option: Home Delivery */}
              <label
                className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                  formData.shippingMethod === 'home'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={formData.shippingMethod === 'home'}
                    onChange={() => updateField('shippingMethod', 'home')}
                    className="mt-1 text-[#8C5B3E] focus:ring-[#8C5B3E]"
                  />
                  <div>
                    <div className="font-bold text-[#1F2421]">黑貓宅急便（常溫防撞配送）</div>
                    <div className="text-[#70685C] text-[11px] mt-0.5">
                      出貨後約 1-2 工作天送達，專屬氣泡防撞包材保障陶器安全。
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-[#8C5B3E]">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? '免運費' : 'NT$ 100'}
                </div>
              </label>

              {formData.shippingMethod === 'home' && (
                <div className="pl-7 space-y-1">
                  <label className="block text-[#474034] font-medium">
                    收件詳細地址 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="shipping-address-input"
                    type="text"
                    value={formData.shippingAddress}
                    onChange={(e) => updateField('shippingAddress', e.target.value)}
                    placeholder="請輸入縣市、區鄉鎮、街道門牌及樓層（例：台北市大安區青田街12巷8號）"
                    className={`w-full p-2.5 bg-[#FAF8F5] border rounded text-xs focus:outline-none focus:border-[#8C5B3E] ${
                      errors.shippingAddress ? 'border-red-500' : 'border-[#D9D0C3]'
                    }`}
                  />
                  {errors.shippingAddress && (
                    <span className="text-red-600 text-[11px] block">{errors.shippingAddress}</span>
                  )}
                </div>
              )}

              {/* Option: Convenience Store */}
              <label
                className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                  formData.shippingMethod === 'convenience'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={formData.shippingMethod === 'convenience'}
                    onChange={() => updateField('shippingMethod', 'convenience')}
                    className="mt-1 text-[#8C5B3E] focus:ring-[#8C5B3E]"
                  />
                  <div>
                    <div className="font-bold text-[#1F2421]">7-ELEVEN / 全家 超商純取貨</div>
                    <div className="text-[#70685C] text-[11px] mt-0.5">
                      出貨後約 2-3 天抵達門市，簡訊通知攜帶身分證件取件。
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-[#8C5B3E]">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? '免運費' : 'NT$ 65'}
                </div>
              </label>

              {formData.shippingMethod === 'convenience' && (
                <div className="pl-7 space-y-1">
                  <label className="block text-[#474034] font-medium">
                    取件超商門市名稱或店號 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="convenience-store-input"
                    type="text"
                    value={formData.convenienceStoreName || ''}
                    onChange={(e) => updateField('convenienceStoreName', e.target.value)}
                    placeholder="例如：7-11 敦南門市 或 全家 瑞安店（附店號更佳）"
                    className={`w-full p-2.5 bg-[#FAF8F5] border rounded text-xs focus:outline-none focus:border-[#8C5B3E] ${
                      errors.convenienceStoreName ? 'border-red-500' : 'border-[#D9D0C3]'
                    }`}
                  />
                  {errors.convenienceStoreName && (
                    <span className="text-red-600 text-[11px] block">{errors.convenienceStoreName}</span>
                  )}
                </div>
              )}

              {/* Option: Studio Pickup */}
              <label
                className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                  formData.shippingMethod === 'studio'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={formData.shippingMethod === 'studio'}
                    onChange={() => updateField('shippingMethod', 'studio')}
                    className="mt-1 text-[#8C5B3E] focus:ring-[#8C5B3E]"
                  />
                  <div>
                    <div className="font-bold text-[#1F2421]">台北青田茶舍門市自取</div>
                    <div className="text-[#70685C] text-[11px] mt-0.5">
                      台北市大安區青田街 12 巷 8 號（週二至週日 11:00-19:00），現場奉茶驗杯。
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-[#385E3E]">免費自取</div>
              </label>
            </div>
          </div>

          {/* Step 3: 付款方式 */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EFEBE4] pb-3">
              <div className="w-6 h-6 rounded-full bg-[#2A312B] text-white text-xs flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="font-serif-tc text-base font-bold text-[#1F2421]">
                付款方式選擇
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 ${
                  formData.paymentMethod === 'credit'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={() => updateField('paymentMethod', 'credit')}
                  className="text-[#8C5B3E] focus:ring-[#8C5B3E]"
                />
                <div>
                  <div className="font-bold text-[#1F2421]">信用卡線上刷卡</div>
                  <div className="text-[11px] text-[#736B5E]">支援 VISA, Master, JCB, 銀聯</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 ${
                  formData.paymentMethod === 'linepay'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'linepay'}
                  onChange={() => updateField('paymentMethod', 'linepay')}
                  className="text-[#8C5B3E] focus:ring-[#8C5B3E]"
                />
                <div>
                  <div className="font-bold text-[#1F2421]">LINE Pay 行動支付</div>
                  <div className="text-[11px] text-[#736B5E]">跳轉 LINE Pay 掃碼或 App 結帳</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 ${
                  formData.paymentMethod === 'atm'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'atm'}
                  onChange={() => updateField('paymentMethod', 'atm')}
                  className="text-[#8C5B3E] focus:ring-[#8C5B3E]"
                />
                <div>
                  <div className="font-bold text-[#1F2421]">ATM 虛擬帳號轉帳</div>
                  <div className="text-[11px] text-[#736B5E]">各家銀行網路銀行或實體 ATM</div>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#8C5B3E] bg-[#F9F6F0]'
                    : 'border-[#E0D8CB] hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => updateField('paymentMethod', 'cod')}
                  className="text-[#8C5B3E] focus:ring-[#8C5B3E]"
                />
                <div>
                  <div className="font-bold text-[#1F2421]">貨到付款（黑貓司機代收）</div>
                  <div className="text-[11px] text-[#736B5E]">收件時以現金支付</div>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: 發票與貼心客製禮盒服務 */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EFEBE4] pb-3">
              <div className="w-6 h-6 rounded-full bg-[#2A312B] text-white text-xs flex items-center justify-center font-bold">
                4
              </div>
              <h2 className="font-serif-tc text-base font-bold text-[#1F2421]">
                發票開立與茶席禮品客製
              </h2>
            </div>

            {/* Invoice Options */}
            <div className="space-y-3 text-xs">
              <label className="block text-[#474034] font-medium">電子發票類型：</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 p-2.5 rounded border border-[#E0D8CB] cursor-pointer">
                  <input
                    type="radio"
                    name="invoiceType"
                    checked={formData.invoiceType === 'cloud'}
                    onChange={() => updateField('invoiceType', 'cloud')}
                    className="text-[#8C5B3E]"
                  />
                  <span>個人雲端發票（自動兌獎）</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded border border-[#E0D8CB] cursor-pointer">
                  <input
                    type="radio"
                    name="invoiceType"
                    checked={formData.invoiceType === 'carrier'}
                    onChange={() => updateField('invoiceType', 'carrier')}
                    className="text-[#8C5B3E]"
                  />
                  <span>手機共通載具條碼</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded border border-[#E0D8CB] cursor-pointer">
                  <input
                    type="radio"
                    name="invoiceType"
                    checked={formData.invoiceType === 'taxId'}
                    onChange={() => updateField('invoiceType', 'taxId')}
                    className="text-[#8C5B3E]"
                  />
                  <span>公司三聯式統一編號</span>
                </label>
              </div>

              {formData.invoiceType === 'carrier' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={formData.carrierCode || ''}
                    onChange={(e) => updateField('carrierCode', e.target.value)}
                    placeholder="請輸入手機載具條碼（例如：/AB12345）"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs"
                  />
                  {errors.carrierCode && (
                    <span className="text-red-600 text-[11px] mt-1 block">{errors.carrierCode}</span>
                  )}
                </div>
              )}

              {formData.invoiceType === 'taxId' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <input
                      type="text"
                      value={formData.taxIdNumber || ''}
                      onChange={(e) => updateField('taxIdNumber', e.target.value)}
                      placeholder="公司統一編號（8碼）"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs"
                    />
                    {errors.taxIdNumber && (
                      <span className="text-red-600 text-[11px] mt-1 block">{errors.taxIdNumber}</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.companyTitle || ''}
                      onChange={(e) => updateField('companyTitle', e.target.value)}
                      placeholder="公司抬頭名稱"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs"
                    />
                    {errors.companyTitle && (
                      <span className="text-red-600 text-[11px] mt-1 block">{errors.companyTitle}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Gift Wrapping & Notes */}
            <div className="pt-4 border-t border-[#EFEBE4] space-y-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.giftWrapping}
                  onChange={(e) => updateField('giftWrapping', e.target.checked)}
                  className="rounded text-[#8C5B3E] focus:ring-[#8C5B3E]"
                />
                <span className="font-medium text-[#1F2421]">
                  免費索取精裝茶席提袋與代寫賀卡服務（贈禮專用）
                </span>
              </label>

              {formData.giftWrapping && (
                <div className="pl-6 space-y-1">
                  <label className="block text-[#696154] text-[11px]">代寫卡片文字內容（限 60 字）：</label>
                  <textarea
                    rows={2}
                    value={formData.giftCardMessage || ''}
                    onChange={(e) => updateField('giftCardMessage', e.target.value)}
                    placeholder="請輸入希望我們代筆書寫的祝賀文字..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs"
                  />
                </div>
              )}

              <div>
                <label className="block text-[#474034] font-medium mb-1">訂單其他備註需求：</label>
                <input
                  type="text"
                  value={formData.orderNotes || ''}
                  onChange={(e) => updateField('orderNotes', e.target.value)}
                  placeholder="例如：請盡量於週末配送、包裹請放管理室等..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Order Items Summary & Payment Calculation */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFEBE4] pb-3">
              <h2 className="font-serif-tc text-base font-bold text-[#1F2421]">
                訂購商品清單（{cart.reduce((s, i) => s + i.quantity, 0)} 件）
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="text-xs text-[#8C5B3E] hover:underline"
              >
                + 加選其他商品
              </button>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#ECE6DC]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded object-cover border border-[#DFD8CC] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif-tc font-bold text-[#1F2421] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#A39B8E] hover:text-red-600 p-0.5"
                          title="刪除商品"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#8C8476]">{item.product.spec}</div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      {/* Qty button */}
                      <div className="flex items-center border border-[#D9D0C3] rounded bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-1.5 py-0.5 text-xs text-[#5C5549] hover:bg-[#F2EDE5]"
                        >
                          -
                        </button>
                        <span className="px-2 text-[11px] font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-xs text-[#5C5549] hover:bg-[#F2EDE5]"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-serif-tc font-bold text-xs text-[#1F2421]">
                        NT$ {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-3 border-t border-[#EFEBE4] space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="輸入優惠代碼（如 TEALOVER）"
                  className="flex-1 p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3.5 py-2 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs font-medium rounded transition-colors"
                >
                  套用
                </button>
              </div>
              {couponMessage && (
                <div
                  className={`text-[11px] p-2 rounded ${
                    couponMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {couponMessage.text}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-[#EFEBE4] space-y-2 text-xs text-[#5C5548]">
              <div className="flex justify-between">
                <span>商品小計</span>
                <span className="font-medium text-[#1F2421]">NT$ {subtotal.toLocaleString()}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>優惠折扣</span>
                  <span>- NT$ {couponDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>預估運費</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#385E3E] font-medium">免運費</span>
                  ) : (
                    `NT$ ${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#DFD7CB] flex items-baseline justify-between">
                <span className="font-serif-tc text-sm font-bold text-[#1F2421]">應付總金額</span>
                <span className="font-serif-tc text-2xl font-bold text-[#8C5B3E]">
                  NT$ {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit CTA Button */}
            <div className="pt-2">
              <button
                id="submit-order-checkout-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-sm font-medium rounded flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:bg-neutral-400"
              >
                {isSubmitting ? (
                  <span>正在建立訂單並處理結帳...</span>
                ) : (
                  <>
                    <span>確認送出訂單並結帳（NT$ {finalTotal.toLocaleString()}）</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-3 border-t border-[#EFEBE4] space-y-1.5 text-[11px] text-[#7A7365]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C5B3E]" />
                <span>SSL 256-bit 加密安全結帳</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8C5B3E]" />
                <span>茶葉與陶器專業防震包裝，損壞全額補發</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
