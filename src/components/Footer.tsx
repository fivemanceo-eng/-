import React from 'react';
import { PageId } from '../types';
import { Leaf, ShieldCheck, Truck, Sparkles, Share2, MapPin, Clock, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenShareModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenShareModal, onOpenAdmin }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="site-footer" className="bg-[#1C201D] text-[#ECE7DF] border-t border-[#333A35] pt-16 pb-12">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#2C332E]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#2B332D] text-[#C59B6D] rounded-xs border border-[#3E4740] shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-tc text-sm font-bold text-[#F4EFEB]">100% 台灣在地原產</h4>
              <p className="text-xs text-[#9B958A] mt-1 leading-relaxed">單一產區無混充茶，溯源透明安心。</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#2B332D] text-[#C59B6D] rounded-xs border border-[#3E4740] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-tc text-sm font-bold text-[#F4EFEB]">SGS 481項零檢出</h4>
              <p className="text-xs text-[#9B958A] mt-1 leading-relaxed">每季嚴格檢驗農藥殘留，純淨甘美。</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#2B332D] text-[#C59B6D] rounded-xs border border-[#3E4740] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-tc text-sm font-bold text-[#F4EFEB]">職人柴燒手作茶器</h4>
              <p className="text-xs text-[#9B958A] mt-1 leading-relaxed">天然落灰成釉孤品，軟化水質養味。</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-[#2B332D] text-[#C59B6D] rounded-xs border border-[#3E4740] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif-tc text-sm font-bold text-[#F4EFEB]">滿 NT$ 1,500 免運</h4>
              <p className="text-xs text-[#9B958A] mt-1 leading-relaxed">防撞茶席包裝，黑貓宅急便或超取。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#8C5B3E] text-white flex items-center justify-center font-serif-tc text-lg font-bold">
                雲
              </div>
              <div>
                <span className="font-serif-tc text-xl font-bold tracking-widest text-[#FAF8F5]">
                  棲雲茶事
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9E978C]">
                  Qi Yun Tea Atelier
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A8A194] leading-relaxed max-w-sm">
              棲雲茶事立於茶席之境，探索山林冷霧與陶師指溫。為愛茶人尋覓純淨純種的台灣茶葉與質樸茶器具，願每一次注水與持杯，皆是安頓身心的片刻清歡。
            </p>
            <div className="pt-2">
              <button
                id="footer-open-share-btn"
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#FAF8F5] bg-[#2A312B] hover:bg-[#8C5B3E] rounded border border-[#424C44] transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C59B6D]" />
                <span>社群分享預覽（Threads ｜ Facebook ｜ LINE）</span>
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h5 className="font-serif-tc text-sm font-bold text-[#F4EFEB] tracking-wider">
              官網選單
            </h5>
            <ul className="space-y-2 text-xs text-[#A8A194]">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  首頁 ｜ 品牌理念與茶席導覽
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-products"
                  onClick={() => handleNav('products')}
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  茶品與器皿 ｜ 線上型錄鑑賞
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-news"
                  onClick={() => handleNav('news')}
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  茶道專欄 ｜ 部落格文章與茶事
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-checkout"
                  onClick={() => handleNav('checkout')}
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  購物表單 ｜ 填單結帳與明細
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  聯絡我們 ｜ 青田茶舍預約品茗
                </button>
              </li>
              <li className="pt-1">
                <button
                  id="footer-nav-admin"
                  onClick={onOpenAdmin}
                  className="text-[#C59B6D] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>夥伴管理後台（更新訊息）</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="font-serif-tc text-sm font-bold text-[#F4EFEB] tracking-wider">
              實體茶舍品茗空間
            </h5>
            <ul className="space-y-2 text-xs text-[#A8A194]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B6D] shrink-0 mt-0.5" />
                <span>台北市大安區青田街 12 巷 8 號 1 樓</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C59B6D] shrink-0 mt-0.5" />
                <span>週二至週日 11:00 - 19:00（週一休席）</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B6D] shrink-0 mt-0.5" />
                <span>02-2391-8822</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C59B6D] shrink-0 mt-0.5" />
                <span>service@qiyun-tea.tw</span>
              </li>
            </ul>
          </div>

          {/* Social Channels & LINE */}
          <div className="space-y-3">
            <h5 className="font-serif-tc text-sm font-bold text-[#F4EFEB] tracking-wider">
              茶人社群與服務
            </h5>
            <p className="text-xs text-[#A8A194] leading-relaxed">
              加入官方 LINE 獲取當季第一手頭採春冬茶上市通知與品茗茶席席次預約。
            </p>
            <div className="pt-1">
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3.5 py-1.5 bg-[#06C755] text-white text-xs font-semibold rounded hover:bg-[#05B34C] transition-colors"
              >
                加入 LINE 官方帳號（@qiyuntea）
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#A8A194]">
              <span className="text-[#C59B6D]">Threads：@qiyun_tea</span>
              <span>•</span>
              <span className="text-[#C59B6D]">FB：棲雲茶事</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2A312B] text-center text-xs text-[#7A7365] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2026 棲雲茶事 Qi Yun Tea Atelier. All Rights Reserved. 繁體中文 台灣總部
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hover:text-[#FAF8F5] cursor-pointer" onClick={() => handleNav('contact')}>常溫宅配條款</span>
          <span>•</span>
          <span className="hover:text-[#FAF8F5] cursor-pointer" onClick={() => handleNav('contact')}>隱私權與七天鑑賞須知</span>
          <span>•</span>
          <span className="hover:text-[#FAF8F5] cursor-pointer" onClick={() => handleNav('contact')}>食品業者登錄字號 A-123456789-00000-1</span>
        </div>
      </div>
    </footer>
  );
};
