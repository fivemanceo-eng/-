/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Product, CartItem, NewsArticle, BannerNotice, InquiryMessage, StaffMember, AuditLog } from './types';
import { updateDocumentMeta } from './utils/meta';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SocialShareModal } from './components/SocialShareModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { NewsView } from './views/NewsView';
import { CheckoutView } from './views/CheckoutView';
import { ContactView } from './views/ContactView';
import { AdminPortal } from './views/admin/AdminPortal';
import { DEFAULT_NEWS_ARTICLES } from './data/news';
import { PRODUCTS } from './data/products';
import { DEFAULT_STAFF_MEMBERS, DEFAULT_AUDIT_LOGS } from './data/staffAndLogs';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';

const INITIAL_BANNER: BannerNotice = {
  text: '全館訂單滿 NT$ 1,500 即享黑貓宅急便 / 超商免運優惠',
  enabled: true,
};

const INITIAL_INQUIRIES: InquiryMessage[] = [
  {
    id: 'inq-1',
    createdAt: '2026-03-08 14:30',
    name: '林詠晴',
    phone: '0912-345-678',
    email: 'charlotte.lin@example.com',
    category: 'tea_ceremony',
    date: '2026-03-20',
    guestsCount: '4',
    message: '希望能預約週五下午的私人青田茶舍席次，想品嚐梨山頭採烏龍與柴燒陶壺。',
    status: 'pending',
  },
  {
    id: 'inq-2',
    createdAt: '2026-03-07 10:15',
    name: '張總特助 王小姐',
    phone: '0933-888-999',
    email: 'corp@taiwan-tech.com.tw',
    category: 'corporate_gift',
    date: '2026-04-01',
    guestsCount: '1',
    message: '預計為公司貴賓採購 60 組端午典藏原木茶席禮盒，需要客製雷射雕刻與專人報價。',
    status: 'contacted',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Shopping Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('qiyun_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // News articles state (Front-end news + Admin can publish & edit)
  const [newsList, setNewsList] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('qiyun_news');
      return saved ? JSON.parse(saved) : DEFAULT_NEWS_ARTICLES;
    } catch {
      return DEFAULT_NEWS_ARTICLES;
    }
  });

  // Top banner notice state (Front-end announcement + Admin can change)
  const [bannerNotice, setBannerNotice] = useState<BannerNotice>(() => {
    try {
      const saved = localStorage.getItem('qiyun_banner');
      return saved ? JSON.parse(saved) : INITIAL_BANNER;
    } catch {
      return INITIAL_BANNER;
    }
  });

  // Products state (Front-end store + Admin can edit stock/price)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('qiyun_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Customer inquiries & tea ceremony reservations
  const [inquiries, setInquiries] = useState<InquiryMessage[]>(() => {
    try {
      const saved = localStorage.getItem('qiyun_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  // Staff members state (Team management)
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem('qiyun_staff');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasYawen = parsed.some((s: StaffMember) => s.name.includes('郭雅雯'));
        const hasYihsiu = parsed.some((s: StaffMember) => s.name.includes('林怡秀'));
        if (hasYawen && hasYihsiu) {
          return parsed;
        }
      }
      return DEFAULT_STAFF_MEMBERS;
    } catch {
      return DEFAULT_STAFF_MEMBERS;
    }
  });

  // Audit operation logs state (Activity tracking)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('qiyun_audit_logs');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasYawenLog = parsed.some((l: AuditLog) => l.actorName.includes('郭雅雯'));
        if (hasYawenLog) {
          return parsed;
        }
      }
      return DEFAULT_AUDIT_LOGS;
    } catch {
      return DEFAULT_AUDIT_LOGS;
    }
  });

  // Partner authentication state
  const [partnerName, setPartnerName] = useState<string>(() => {
    const saved = localStorage.getItem('qiyun_partner_name');
    if (saved && (saved.includes('郭雅雯') || saved.includes('林怡秀'))) {
      return saved;
    }
    return '郭雅雯（茶務總監）';
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // UI Modals
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qiyun_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('qiyun_news', JSON.stringify(newsList));
    } catch (e) {
      console.error('Failed to save news', e);
    }
  }, [newsList]);

  useEffect(() => {
    try {
      localStorage.setItem('qiyun_banner', JSON.stringify(bannerNotice));
    } catch (e) {
      console.error('Failed to save banner', e);
    }
  }, [bannerNotice]);

  useEffect(() => {
    try {
      localStorage.setItem('qiyun_products', JSON.stringify(productsList));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [productsList]);

  useEffect(() => {
    try {
      localStorage.setItem('qiyun_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('qiyun_staff', JSON.stringify(staffMembers));
    } catch (e) {
      console.error('Failed to save staff members', e);
    }
  }, [staffMembers]);

  useEffect(() => {
    try {
      localStorage.setItem('qiyun_audit_logs', JSON.stringify(auditLogs));
    } catch (e) {
      console.error('Failed to save audit logs', e);
    }
  }, [auditLogs]);

  // Update Page Title and Meta description & Open Graph whenever page changes
  useEffect(() => {
    updateDocumentMeta(currentPage);
  }, [currentPage]);

  // Toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Record audit operation log
  const handleAddAuditLog = (newLogData: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...newLogData,
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleString('zh-TW', { hour12: false }).replace(/\//g, '-'),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Partner Login & Admin access
  const handleOpenAdmin = () => {
    if (partnerName) {
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLoginModalOpen(true);
    }
  };

  const handlePartnerLoginSuccess = (name: string) => {
    setPartnerName(name);
    try {
      localStorage.setItem('qiyun_partner_name', name);
    } catch (e) {
      console.error(e);
    }
    const cleanName = name.split('（')[0] || name;
    const cleanRole = name.includes('（') ? name.split('（')[1].replace('）', '') : '工作夥伴';
    handleAddAuditLog({
      actorName: cleanName,
      actorRoleTitle: cleanRole,
      category: 'auth',
      categoryLabel: '身分驗證',
      action: '夥伴登入工作台',
      details: `${cleanName}（${cleanRole}）通過專屬認證進入管理後台。`,
    });
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`歡迎回來，${name}！已進入棲雲夥伴管理工作台`);
  };

  const handleSwitchPartner = (newPartner: string) => {
    setPartnerName(newPartner);
    try {
      localStorage.setItem('qiyun_partner_name', newPartner);
    } catch (e) {
      console.error(e);
    }
    const cleanName = newPartner.split('（')[0] || newPartner;
    const cleanRole = newPartner.includes('（') ? newPartner.split('（')[1].replace('）', '') : '工作夥伴';
    handleAddAuditLog({
      actorName: cleanName,
      actorRoleTitle: cleanRole,
      category: 'staff',
      categoryLabel: '人員管理',
      action: '切換操作身分',
      details: `工作台當前操作身分已切換為【${cleanName}（${cleanRole}）】`,
    });
    showToast(`已切換操作身分為：${newPartner}`);
  };

  const handlePartnerLogout = () => {
    const cleanName = partnerName.split('（')[0] || partnerName || '夥伴';
    const cleanRole = partnerName.includes('（') ? partnerName.split('（')[1].replace('）', '') : '工作夥伴';
    handleAddAuditLog({
      actorName: cleanName,
      actorRoleTitle: cleanRole,
      category: 'auth',
      categoryLabel: '身分驗證',
      action: '夥伴安全登出',
      details: `${cleanName}（${cleanRole}）安全登出管理後台工作台。`,
    });
    setPartnerName('');
    try {
      localStorage.removeItem('qiyun_partner_name');
    } catch (e) {
      console.error(e);
    }
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('已安全登出夥伴管理後台');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    showToast(`已將「${product.name}」加入品茗茶席清單`);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setDetailProduct(null);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Inquiries added from front-end contact view
  const handleAddInquiry = (newInquiry: InquiryMessage) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast('預約與諮詢訊息已成功送達茶舍後台，夥伴將儘速回覆！');
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F2421] font-sans selection:bg-[#EAE0D3] selection:text-[#1F2421]">
      {/* Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartTotalCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenShareModal={() => setShareModalOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        bannerNotice={bannerNotice}
        isLoggedInPartner={!!partnerName}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setDetailProduct(prod)}
            news={newsList}
          />
        )}

        {currentPage === 'products' && (
          <ProductsView
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onViewDetails={(prod) => setDetailProduct(prod)}
            products={productsList}
          />
        )}

        {currentPage === 'news' && (
          <NewsView
            news={newsList}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdmin={handleOpenAdmin}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickAdd={handleAddToCart}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddInquiry={handleAddInquiry}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPortal
            newsList={newsList}
            onUpdateNewsList={(updated) => {
              setNewsList(updated);
              showToast('專欄文章列表已更新並即時同步至前台！');
            }}
            bannerNotice={bannerNotice}
            onUpdateBannerNotice={(updated) => {
              setBannerNotice(updated);
              showToast('頂部橫幅跑馬燈公告已更新！');
            }}
            products={productsList}
            onUpdateProducts={(updated) => {
              setProductsList(updated);
              showToast('商品庫存與資料已更新！');
            }}
            inquiries={inquiries}
            onUpdateInquiries={(updated) => {
              setInquiries(updated);
              showToast('諮詢留言狀態已更新！');
            }}
            staffMembers={staffMembers}
            onUpdateStaffMembers={(updated) => {
              setStaffMembers(updated);
              showToast('團隊夥伴資料已更新！');
            }}
            auditLogs={auditLogs}
            onAddAuditLog={handleAddAuditLog}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentPartner={partnerName || '郭雅雯（茶務總監）'}
            onSwitchPartner={handleSwitchPartner}
            onLogout={handlePartnerLogout}
          />
        )}
      </main>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenShareModal={() => setShareModalOpen(true)}
          onOpenAdmin={handleOpenAdmin}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartDrawerOpen(false);
          setCurrentPage('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Social Share Preview Modal (Threads / Facebook / LINE) */}
      <SocialShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        currentPage={currentPage}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Partner Admin Login Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handlePartnerLoginSuccess}
        staffMembers={staffMembers}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#1F2421] text-white px-4 py-3 rounded-lg shadow-xl border border-[#3E4740] flex items-center gap-3 text-xs animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-[#8C5B3E] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
          {currentPage !== 'admin' && (
            <button
              onClick={() => {
                setToastMessage(null);
                setCartDrawerOpen(true);
              }}
              className="ml-2 underline text-[#C59B6D] hover:text-white font-medium shrink-0"
            >
              檢視清單
            </button>
          )}
        </div>
      )}
    </div>
  );
}
