import React, { useState } from 'react';
import { ShoppingBag, Share2, Menu, X, Leaf, Phone, Sparkles, Shield, Lock } from 'lucide-react';
import { PageId, BannerNotice } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenShareModal: () => void;
  onOpenAdmin: () => void;
  bannerNotice?: BannerNotice;
  isLoggedInPartner?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenShareModal,
  onOpenAdmin,
  bannerNotice = { text: '全館訂單滿 NT$ 1,500 即享黑貓宅急便 / 超商免運優惠', enabled: true },
  isLoggedInPartner = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; en: string }[] = [
    { id: 'home', label: '首頁', en: 'Home' },
    { id: 'products', label: '茶品與茶具介紹', en: 'Collection' },
    { id: 'news', label: '茶道部落格', en: 'Blog & Stories' },
    { id: 'checkout', label: '購物結帳', en: 'Order & Cart' },
    { id: 'contact', label: '品茗預約與聯絡', en: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Top Notification Announcement Bar */}
      {bannerNotice.enabled && (
        <div id="top-announcement-bar" className="bg-[#2A312B] text-[#EFEBE4] text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B37B47]"></span>
              <span className="font-medium tracking-wider">{bannerNotice.text}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[#C5BDB2]">
              <span className="flex items-center gap-1">
                <Leaf className="w-3 h-3 text-[#B37B47]" /> 100% 台灣在地原葉・SGS 零檢出
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#B37B47]" /> 私人茶席預約：02-2391-8822
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-sm bg-[#2A312B] text-[#FAF8F5] flex items-center justify-center font-serif-tc text-lg border border-[#3E4740] shadow-xs group-hover:bg-[#8C5B3E] transition-colors">
              雲
            </div>
            <div className="flex flex-col">
              <span className="font-serif-tc text-xl sm:text-2xl font-bold tracking-widest text-[#1F2421] group-hover:text-[#8C5B3E] transition-colors">
                棲雲茶事
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#787063]">
                Qi Yun Tea Atelier
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-sm transition-all rounded-sm flex flex-col items-center ${
                    isActive
                      ? 'text-[#1F2421] font-semibold bg-[#EFE9E0]'
                      : 'text-[#5C564B] hover:text-[#1F2421] hover:bg-[#F4EFEA]'
                  }`}
                >
                  <span className="tracking-wider">{item.label}</span>
                  <span className="text-[10px] tracking-widest text-[#938A7C] font-normal uppercase">{item.en}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Social Share Preview Trigger Button */}
            <button
              id="open-share-preview-btn"
              onClick={onOpenShareModal}
              title="查看社群分享預覽（Threads / FB）"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4D463C] bg-[#F2EDE5] hover:bg-[#E8E1D6] rounded border border-[#D9D0C3] transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8C5B3E]" />
              <span className="hidden lg:inline">社群預覽</span>
            </button>

            {/* Partner Admin Portal Trigger Button */}
            <button
              id="open-admin-portal-btn"
              onClick={onOpenAdmin}
              title="夥伴登入／後台管理系統"
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded border transition-all ${
                currentPage === 'admin'
                  ? 'bg-[#1F2421] text-white border-[#1F2421]'
                  : isLoggedInPartner
                  ? 'bg-[#EAE4DC] text-[#1F2421] border-[#CFC5B6] hover:bg-[#DFD8CC]'
                  : 'bg-[#FAF8F5] text-[#696152] border-[#D9D0C3] hover:bg-[#F2EDE5] hover:text-[#1F2421]'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#8C5B3E]" />
              <span className="hidden sm:inline">
                {isLoggedInPartner ? '夥伴工作台' : '夥伴後台'}
              </span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="open-cart-drawer-btn"
              onClick={onOpenCart}
              className="relative p-2.5 text-[#1F2421] hover:text-[#8C5B3E] bg-[#F4EFEB] hover:bg-[#EAE4DC] rounded-sm transition-all border border-[#E0D7CB]"
              aria-label="查看購物車"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#8C5B3E] text-white text-[11px] font-semibold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-[#1F2421] hover:bg-[#F2EDE5] rounded transition-colors"
              aria-label="開啟選單"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-[#FAF8F5] border-b border-[#E2DDD5] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <div className="py-2 border-b border-[#E8E2D9] mb-2 text-xs text-[#787063] flex items-center justify-between">
            <span>導覽切換</span>
            <span className="text-[11px] text-[#8C5B3E]">棲雲茶事</span>
          </div>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded text-base flex items-center justify-between ${
                  isActive
                    ? 'bg-[#2A312B] text-white font-medium'
                    : 'text-[#2A312B] hover:bg-[#F2EDE5]'
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-xs uppercase tracking-wider ${isActive ? 'text-[#C5BDB2]' : 'text-[#8E8679]'}`}>
                  {item.en}
                </span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-[#E8E2D9] flex flex-col gap-2">
            <button
              id="mobile-admin-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-[#1F2421] bg-[#FAF8F5] font-medium rounded border border-[#CFC5B6]"
            >
              <Lock className="w-4 h-4 text-[#8C5B3E]" /> 夥伴管理後台（發布與更新訊息）
            </button>

            <button
              id="mobile-share-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShareModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-[#4D463C] bg-[#EFE9E0] rounded border border-[#D9D0C3]"
            >
              <Share2 className="w-4 h-4 text-[#8C5B3E]" /> 查看社群分享預覽（Threads / FB）
            </button>

            <div className="text-center text-xs text-[#8A8275] pt-1">
              客服諮詢專線：02-2391-8822 ｜ 台北市大安區青田街 12 巷
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
