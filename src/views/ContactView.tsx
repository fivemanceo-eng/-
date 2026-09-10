import React, { useState } from 'react';
import { 
  MapPin, Clock, Phone, Mail, MessageSquare, Send, CheckCircle2, 
  Sparkles, Calendar, ChevronDown, ChevronUp, ArrowRight 
} from 'lucide-react';
import { FAQS } from '../data/products';
import { PageId, InquiryMessage } from '../types';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
  onAddInquiry?: (inquiry: InquiryMessage) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onAddInquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'tea_ceremony', // 'tea_ceremony' | 'corporate_gift' | 'product_inquiry' | 'cooperation'
    date: '',
    guestsCount: '2',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('請填寫姓名、電話與電子郵件以便茶務秘書為您聯繫確認');
      return;
    }

    if (onAddInquiry) {
      onAddInquiry({
        id: `inq-${Date.now()}`,
        createdAt: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        category: formData.category,
        date: formData.date,
        guestsCount: formData.guestsCount,
        message: formData.message,
        status: 'pending',
      });
    }

    setSubmitted(true);
  };

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
          Contact & Visit Reservation
        </span>
        <h1 className="font-serif-tc text-3xl sm:text-4xl font-bold text-[#1F2421]">
          聯絡我們 ｜ 預約青田茶舍品茗
        </h1>
        <p className="text-xs sm:text-sm text-[#61584C] leading-relaxed">
          歡迎親臨台北市大安區青田街體驗私人一對一茶席，親自品嚐當季高山冷香，挑選柴燒陶器；
          亦提供企業團購禮盒客製、品牌茶席活動合作諮詢。
        </p>
      </div>

      {/* Main Grid: Location Info & Online Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Columns: Physical Atelier Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Atelier Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs text-[#8C5B3E] font-semibold tracking-wider uppercase">
                Qi Yun Tea Atelier Taipei
              </span>
              <h2 className="font-serif-tc text-xl font-bold text-[#1F2421]">
                棲雲品茗體驗空間 ｜ 台北青田舍
              </h2>
              <p className="text-xs text-[#6B6356] leading-relaxed">
                隱身於青田街日式老樹綠蔭之中，採預約制品茗。茶師備有當季梨山、木柵老鐵與全套手作柴燒陶器，靜候知茶人。
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#474034] pt-2 border-t border-[#EFEBE4]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8C5B3E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1F2421]">空間地址</div>
                  <div className="text-[#6B6356] mt-0.5">台北市大安區青田街 12 巷 8 號 1 樓</div>
                  <div className="text-[11px] text-[#91887A] mt-0.5">
                    （近捷運東門站 5 號出口或古亭站，步行約 8-10 分鐘）
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8C5B3E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1F2421]">品茗空間席次時段</div>
                  <div className="text-[#6B6356] mt-0.5">週二至週日 11:00 - 19:00（每席約 90 分鐘）</div>
                  <div className="text-[11px] text-[#91887A] mt-0.5">（每週一固定公休整備）</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8C5B3E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1F2421]">茶務專線</div>
                  <div className="text-[#6B6356] mt-0.5">02-2391-8822</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8C5B3E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1F2421]">電子信箱</div>
                  <div className="text-[#6B6356] mt-0.5">service@qiyun-tea.tw</div>
                </div>
              </div>
            </div>

            {/* Instant Messaging Callout */}
            <div className="p-4 bg-[#F5F1EB] rounded-lg border border-[#E0D8CB] space-y-2 text-xs">
              <div className="font-bold text-[#1F2421] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#06C755]" />
                <span>加入 LINE 官方帳號即時諮詢</span>
              </div>
              <p className="text-[11px] text-[#696153]">
                搜尋 ID：<strong className="text-[#1F2421]">@qiyuntea</strong>，茶務秘書將於營業時間即時回覆您的沖泡疑問與訂單動態。
              </p>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 px-3 py-1.5 bg-[#06C755] hover:bg-[#05B34C] text-white text-[11px] font-semibold rounded transition-colors"
              >
                前往 LINE 加好友
              </a>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Online Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E0D6] shadow-2xs space-y-6">
            <div className="border-b border-[#EFEBE4] pb-4 space-y-1">
              <h2 className="font-serif-tc text-xl font-bold text-[#1F2421]">
                線上預約與需求留言表單
              </h2>
              <p className="text-xs text-[#6B6356]">
                送出後我們將於 1 個工作天內透過電話或 Email 與您確認細節。
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#3E5C43] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-tc text-xl font-bold text-[#1F2421]">
                    預約需求已成功送出
                  </h3>
                  <p className="text-xs text-[#6B6356] max-w-md mx-auto leading-relaxed">
                    感謝您的來訊。茶務秘書將盡速檢視您的需求，並以 Email 或電話向您確認時段與細節安排。
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        category: 'tea_ceremony',
                        date: '',
                        guestsCount: '2',
                        message: '',
                      });
                    }}
                    className="px-5 py-2 bg-[#FAF8F5] hover:bg-[#EFE9E0] text-[#332E27] text-xs font-medium rounded border border-[#D9D0C3]"
                  >
                    填寫另一筆需求
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Category Selection */}
                <div>
                  <label className="block text-[#474034] font-medium mb-1.5">
                    諮詢項目類別 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'tea_ceremony', label: '預約茶舍品茗' },
                      { id: 'corporate_gift', label: '企業大宗送禮' },
                      { id: 'product_inquiry', label: '商品與沖泡諮詢' },
                      { id: 'cooperation', label: '茶道活動合作' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, category: cat.id }))}
                        className={`p-2.5 rounded border text-center transition-all ${
                          formData.category === cat.id
                            ? 'bg-[#2A312B] text-white border-[#2A312B] font-medium'
                            : 'bg-[#FAF8F5] text-[#544D42] border-[#D9D0C3] hover:bg-[#F2EDE5]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#474034] font-medium mb-1">
                      您的姓名稱謂 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="例如：陳先生 / 林小姐"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#474034] font-medium mb-1">
                      聯絡電話 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="例如：0912-345-678"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#474034] font-medium mb-1">
                    電子信箱 Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="例如：tea.contact@example.com"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  />
                </div>

                {/* If tea tasting, prompt date & guests */}
                {formData.category === 'tea_ceremony' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E5E0D6]">
                    <div>
                      <label className="block text-[#474034] font-medium mb-1">預計前來日期：</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                        className="w-full p-2 bg-white border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#474034] font-medium mb-1">出席品茗人數：</label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData((p) => ({ ...p, guestsCount: e.target.value }))}
                        className="w-full p-2 bg-white border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                      >
                        <option value="1">1 位品茗</option>
                        <option value="2">2 位同行（最推薦）</option>
                        <option value="3">3 位同行</option>
                        <option value="4">4 位同行（茶席包場）</option>
                        <option value="more">5 位以上（請於備註說明）</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-[#474034] font-medium mb-1">
                    詳細需求或想品飲的茶品項目：
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="請告訴我們您感興趣的茶葉風味、茶具款式，或企業送禮預算與數量需求..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full py-3 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs sm:text-sm font-medium rounded flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>確認送出預約諮詢單</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-[#F4EFEB] rounded-xl p-6 sm:p-10 border border-[#E2DDD5] space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
            Frequently Asked Questions
          </span>
          <h3 className="font-serif-tc text-2xl font-bold text-[#1F2421]">
            品茶人常見問題（FAQ）
          </h3>
          <p className="text-xs text-[#6B6356]">
            整理茶友最常詢問的茶葉保存、柴燒開壺及宅配配送須知。
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white rounded-lg border border-[#E0D8CB] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="font-serif-tc text-sm font-bold text-[#1F2421]">
                    Q{idx + 1}：{faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#8C5B3E] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8C5B3E] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#524B40] leading-relaxed border-t border-[#F5F2EC]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C5B3E] hover:underline"
          >
            <span>瀏覽當季茶品與職人器皿型錄</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
