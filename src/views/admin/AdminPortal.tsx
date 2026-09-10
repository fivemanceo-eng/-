import React, { useState, useMemo } from 'react';
import { 
  Plus, Edit, Trash2, Pin, Eye, EyeOff, Check, X, ArrowLeft, RefreshCw, 
  Sparkles, Bell, Layers, FileText, ShoppingBag, MessageSquare, LogOut, 
  CheckCircle2, AlertCircle, Save, ExternalLink, Users, Shield, UserPlus, 
  UserCheck, UserX, Clock, Filter, Search, Tag, BookOpen, Activity, 
  History, Copy, ArrowRight, ChevronRight
} from 'lucide-react';
import { 
  NewsArticle, Product, PageId, BannerNotice, InquiryMessage, 
  StaffMember, StaffRole, AuditLog, AuditLogCategory, BlogCategory 
} from '../../types';

interface AdminPortalProps {
  newsList: NewsArticle[];
  onUpdateNewsList: (list: NewsArticle[]) => void;
  bannerNotice: BannerNotice;
  onUpdateBannerNotice: (notice: BannerNotice) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  inquiries: InquiryMessage[];
  onUpdateInquiries: (inquiries: InquiryMessage[]) => void;
  staffMembers: StaffMember[];
  onUpdateStaffMembers: (staff: StaffMember[]) => void;
  auditLogs: AuditLog[];
  onAddAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  onNavigate: (page: PageId) => void;
  currentPartner: string;
  onSwitchPartner: (partnerName: string) => void;
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  newsList,
  onUpdateNewsList,
  bannerNotice,
  onUpdateBannerNotice,
  products,
  onUpdateProducts,
  inquiries,
  onUpdateInquiries,
  staffMembers,
  onUpdateStaffMembers,
  auditLogs,
  onAddAuditLog,
  onNavigate,
  currentPartner,
  onSwitchPartner,
  onLogout,
}) => {
  // Navigation Tabs: blog, staff, logs, products, banner, inquiries
  const [activeTab, setActiveTab] = useState<'blog' | 'staff' | 'logs' | 'products' | 'banner' | 'inquiries'>('blog');

  // Partner actor display info
  const actorName = currentPartner.split('（')[0] || currentPartner || '棲雲夥伴';
  const actorRoleTitle = currentPartner.includes('（') ? currentPartner.split('（')[1].replace('）', '') : '茶務夥伴';

  // Helper to record log easily
  const recordLog = (category: AuditLogCategory, categoryLabel: string, action: string, details: string) => {
    onAddAuditLog({
      actorName,
      actorRoleTitle,
      category,
      categoryLabel,
      action,
      details,
    });
  };

  // -------------------------------------------------------------
  // 1. BLOG ARTICLE MANAGEMENT STATE
  // -------------------------------------------------------------
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');

  const presetImages = [
    { label: '高山茶園晨曦採摘', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80' },
    { label: '台北青田茶舍品茗席', url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80' },
    { label: '苗栗柴燒手拉胚陶壺', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80' },
    { label: '宋代天青汝窯品茗杯', url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80' },
    { label: '古法慢火炭焙茶葉', url: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1200&q=80' },
  ];

  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle>>({
    title: '',
    category: 'tea_harvest',
    categoryLabel: '時令茶訊',
    author: actorName,
    authorRole: actorRoleTitle,
    publishedAt: new Date().toISOString().slice(0, 10),
    summary: '',
    content: '',
    image: presetImages[0].url,
    tags: ['高山烏龍', '單品茶'],
    readTime: '4 分鐘閱讀',
    isPinned: false,
    isPublished: true,
  });
  const [tagsInput, setTagsInput] = useState('高山烏龍, 單品茶');

  const handleOpenCreateBlog = () => {
    setEditingArticle({
      id: `blog-${Date.now()}`,
      title: '',
      category: 'tea_harvest',
      categoryLabel: '時令茶訊',
      author: actorName,
      authorRole: actorRoleTitle,
      publishedAt: new Date().toISOString().slice(0, 10),
      summary: '',
      content: '',
      image: presetImages[0].url,
      tags: ['時令春茶', '冷礦香'],
      readTime: '4 分鐘閱讀',
      isPinned: false,
      isPublished: true,
    });
    setTagsInput('時令春茶, 冷礦香');
    setIsEditingBlog(true);
  };

  const handleOpenEditBlog = (article: NewsArticle) => {
    setEditingArticle({ ...article });
    setTagsInput(article.tags ? article.tags.join(', ') : '');
    setIsEditingBlog(true);
  };

  const handleSaveBlogArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle.title?.trim() || !editingArticle.content?.trim()) {
      alert('請填寫文章標題與內文');
      return;
    }

    const categoryMap: Record<string, string> = {
      tea_harvest: '時令茶訊',
      brewing_guide: '泡茶指南',
      teaware_craft: '茶具工藝',
      event: '茶席活動',
      knowledge: '習茶知味',
      announcement: '門市公告',
    };

    const parsedTags = tagsInput
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const isNew = !newsList.some((item) => item.id === editingArticle.id);

    const articleToSave: NewsArticle = {
      id: editingArticle.id || `blog-${Date.now()}`,
      title: editingArticle.title.trim(),
      category: (editingArticle.category as BlogCategory) || 'tea_harvest',
      categoryLabel: categoryMap[editingArticle.category || 'tea_harvest'] || '茶道專欄',
      publishedAt: editingArticle.publishedAt || new Date().toISOString().slice(0, 10),
      summary: editingArticle.summary?.trim() || editingArticle.content.slice(0, 120) + '...',
      content: editingArticle.content.trim(),
      image: editingArticle.image || presetImages[0].url,
      author: editingArticle.author?.trim() || actorName,
      authorRole: editingArticle.authorRole?.trim() || actorRoleTitle,
      tags: parsedTags.length > 0 ? parsedTags : ['棲雲茶事'],
      readTime: editingArticle.readTime || '4 分鐘閱讀',
      isPinned: !!editingArticle.isPinned,
      isPublished: editingArticle.isPublished ?? true,
      viewsCount: editingArticle.viewsCount || 1,
    };

    if (isNew) {
      onUpdateNewsList([articleToSave, ...newsList]);
      recordLog('blog', '部落格專欄', '發布部落格文章', `新增發布專欄文章《${articleToSave.title}》（分類：${articleToSave.categoryLabel}）`);
    } else {
      onUpdateNewsList(newsList.map((item) => (item.id === articleToSave.id ? articleToSave : item)));
      recordLog('blog', '部落格專欄', '編輯部落格文章', `更新修訂專欄文章《${articleToSave.title}》`);
    }

    setIsEditingBlog(false);
  };

  const handleDeleteBlogArticle = (id: string, title: string) => {
    if (window.confirm(`確定要刪除專文《${title}》嗎？此操作不可還原。`)) {
      onUpdateNewsList(newsList.filter((item) => item.id !== id));
      recordLog('blog', '部落格專欄', '刪除部落格文章', `從後台刪除了專欄文章《${title}》`);
    }
  };

  const handleToggleBlogPin = (article: NewsArticle) => {
    const updated = !article.isPinned;
    onUpdateNewsList(newsList.map((item) => (item.id === article.id ? { ...item, isPinned: updated } : item)));
    recordLog('blog', '部落格專欄', updated ? '設定置頂文章' : '取消置頂文章', `${updated ? '將' : '取消'}專欄文章《${article.title}》的置頂推薦`);
  };

  const handleToggleBlogPublish = (article: NewsArticle) => {
    const updated = !article.isPublished;
    onUpdateNewsList(newsList.map((item) => (item.id === article.id ? { ...item, isPublished: updated } : item)));
    recordLog('blog', '部落格專欄', updated ? '上架文章' : '下架文章', `將專欄文章《${article.title}》狀態設為【${updated ? '已發布' : '草稿下架'}】`);
  };

  const filteredBlogList = useMemo(() => {
    return newsList.filter((item) => {
      if (blogCategoryFilter !== 'all' && item.category !== blogCategoryFilter) return false;
      if (blogSearchQuery.trim()) {
        const q = blogSearchQuery.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.author.toLowerCase().includes(q);
      }
      return true;
    });
  }, [newsList, blogCategoryFilter, blogSearchQuery]);

  // -------------------------------------------------------------
  // 2. STAFF / TEAM MANAGEMENT STATE
  // -------------------------------------------------------------
  const [isEditingStaff, setIsEditingStaff] = useState(false);
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [editingStaffMember, setEditingStaffMember] = useState<Partial<StaffMember>>({
    name: '',
    role: 'editor',
    roleTitle: '',
    email: '',
    phone: '',
    status: 'active',
    notes: '',
  });

  const handleOpenAddStaff = () => {
    setEditingStaffMember({
      id: `staff-${Date.now()}`,
      name: '',
      role: 'editor',
      roleTitle: '茶道專欄編輯',
      email: '',
      phone: '',
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
      notes: '',
    });
    setIsEditingStaff(true);
  };

  const handleOpenEditStaff = (staff: StaffMember) => {
    setEditingStaffMember({ ...staff });
    setIsEditingStaff(true);
  };

  const handleSaveStaffMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaffMember.name?.trim() || !editingStaffMember.email?.trim()) {
      alert('請填寫夥伴姓名與電子郵件帳號');
      return;
    }

    const isNew = !staffMembers.some((s) => s.id === editingStaffMember.id);
    const memberToSave: StaffMember = {
      id: editingStaffMember.id || `staff-${Date.now()}`,
      name: editingStaffMember.name.trim(),
      role: (editingStaffMember.role as StaffRole) || 'editor',
      roleTitle: editingStaffMember.roleTitle?.trim() || '工作夥伴',
      email: editingStaffMember.email.trim(),
      phone: editingStaffMember.phone?.trim() || '',
      status: editingStaffMember.status || 'active',
      createdAt: editingStaffMember.createdAt || new Date().toISOString().slice(0, 10),
      notes: editingStaffMember.notes?.trim() || '',
      lastLoginAt: editingStaffMember.lastLoginAt || '尚未登入',
    };

    if (isNew) {
      onUpdateStaffMembers([...staffMembers, memberToSave]);
      recordLog('staff', '人員管理', '新增團隊夥伴', `新增工作夥伴【${memberToSave.name}】（${memberToSave.roleTitle}），權限身分：${memberToSave.role}`);
    } else {
      onUpdateStaffMembers(staffMembers.map((s) => (s.id === memberToSave.id ? memberToSave : s)));
      recordLog('staff', '人員管理', '更新人員資料', `更新夥伴【${memberToSave.name}】的職稱（${memberToSave.roleTitle}）與權限設定`);
    }

    setIsEditingStaff(false);
  };

  const handleToggleStaffStatus = (staff: StaffMember) => {
    const nextStatus = staff.status === 'active' ? 'inactive' : 'active';
    onUpdateStaffMembers(staffMembers.map((s) => (s.id === staff.id ? { ...s, status: nextStatus } : s)));
    recordLog('staff', '人員管理', nextStatus === 'active' ? '啟用帳號' : '停用帳號', `將夥伴【${staff.name}（${staff.roleTitle}）】帳號設為【${nextStatus === 'active' ? '正常啟用' : '停用'}】`);
  };

  const handleDeleteStaffMember = (staff: StaffMember) => {
    if (staff.name === actorName) {
      alert('無法刪除當前正在登入操作的使用者身分。');
      return;
    }
    if (window.confirm(`確定要移除夥伴【${staff.name}（${staff.roleTitle}）】嗎？`)) {
      onUpdateStaffMembers(staffMembers.filter((s) => s.id !== staff.id));
      recordLog('staff', '人員管理', '移除團隊夥伴', `從團隊成員名單中移除了【${staff.name}（${staff.roleTitle}）】`);
    }
  };

  const filteredStaffList = useMemo(() => {
    return staffMembers.filter((s) => {
      if (!staffSearchQuery.trim()) return true;
      const q = staffSearchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.roleTitle.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    });
  }, [staffMembers, staffSearchQuery]);

  // -------------------------------------------------------------
  // 3. AUDIT LOGS STATE
  // -------------------------------------------------------------
  const [logCategoryFilter, setLogCategoryFilter] = useState<string>('all');
  const [logActorFilter, setLogActorFilter] = useState<string>('all');
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      if (logCategoryFilter !== 'all' && log.category !== logCategoryFilter) return false;
      if (logActorFilter !== 'all' && log.actorName !== logActorFilter) return false;
      if (logSearchQuery.trim()) {
        const q = logSearchQuery.toLowerCase();
        return (
          log.action.toLowerCase().includes(q) ||
          log.details.toLowerCase().includes(q) ||
          log.actorName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [auditLogs, logCategoryFilter, logActorFilter, logSearchQuery]);

  const handleCopyLogsText = () => {
    const text = filteredAuditLogs
      .map((l) => `[${l.timestamp}] ${l.actorName} (${l.actorRoleTitle}) | [${l.categoryLabel}] ${l.action}: ${l.details}`)
      .join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  // -------------------------------------------------------------
  // 4. BANNER NOTICE STATE
  // -------------------------------------------------------------
  const [tempBannerText, setTempBannerText] = useState(bannerNotice.text);
  const [tempBannerEnabled, setTempBannerEnabled] = useState(bannerNotice.enabled);
  const [bannerSaveFeedback, setBannerSaveFeedback] = useState(false);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBannerNotice({
      text: tempBannerText.trim(),
      enabled: tempBannerEnabled,
    });
    recordLog('banner', '系統公告', '更新跑馬燈公告', `更新頂部公告文字為：「${tempBannerText.trim()}」，顯示狀態：${tempBannerEnabled ? '顯示中' : '關閉'}`);
    setBannerSaveFeedback(true);
    setTimeout(() => setBannerSaveFeedback(false), 2500);
  };

  // -------------------------------------------------------------
  // 5. PRODUCTS INVENTORY STATE
  // -------------------------------------------------------------
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editStockValue, setEditStockValue] = useState<number>(0);
  const [editPriceValue, setEditPriceValue] = useState<number>(0);

  const handleStartEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setEditStockValue(prod.stockCount);
    setEditPriceValue(prod.price);
  };

  const handleSaveProductStock = (prod: Product) => {
    const updatedProducts = products.map((p) => {
      if (p.id === prod.id) {
        return {
          ...p,
          stockCount: editStockValue,
          inStock: editStockValue > 0,
          price: editPriceValue,
        };
      }
      return p;
    });
    onUpdateProducts(updatedProducts);
    recordLog('products', '商品庫存', '調整商品庫存與價格', `將商品【${prod.name}】庫存調整為 ${editStockValue} 件（售價 NT$ ${editPriceValue}）`);
    setEditingProductId(null);
  };

  // -------------------------------------------------------------
  // 6. INQUIRIES STATE
  // -------------------------------------------------------------
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'pending' | 'contacted' | 'resolved'>('all');

  const handleUpdateInquiryStatus = (id: string, name: string, newStatus: 'pending' | 'contacted' | 'resolved') => {
    const updated = inquiries.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    onUpdateInquiries(updated);
    const statusMap = {
      pending: '待處理',
      contacted: '已電訪確認',
      resolved: '已安排席次',
    };
    recordLog('inquiries', '顧客預約', '更新預約狀態', `將訪客【${name}】的預約留言狀態標記為【${statusMap[newStatus]}】`);
  };

  return (
    <div id="admin-portal" className="min-h-screen bg-[#F7F5F0] text-[#1F2421] pb-20">
      {/* Top Admin Header Bar */}
      <header className="bg-[#2A312B] text-[#FAF8F5] border-b border-[#3D473E] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="返回官網首頁"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">返回品牌前台</span>
            </button>

            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#8C5B3E] text-white flex items-center justify-center font-serif-tc font-bold text-sm shadow-xs">
                棲
              </div>
              <div>
                <span className="font-serif-tc text-sm sm:text-base font-bold tracking-wider block leading-tight">
                  棲雲茶事 ｜ 夥伴管理後台
                </span>
                <span className="text-[10px] text-white/60">
                  工作台 v2.4 • 人員管理與操作日誌系統
                </span>
              </div>
            </div>
          </div>

          {/* Current Partner Info & Switcher */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white/80">當前操作者：</span>
              <strong className="text-white font-serif-tc">{currentPartner}</strong>
            </div>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-white/10 hover:bg-red-900/60 text-white/90 hover:text-white rounded text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>切換/登出</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#E2DDD5] pb-3">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeTab === 'blog'
                  ? 'bg-[#8C5B3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5C5549] hover:bg-[#EFE9E0] border border-[#DDD5C7]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>部落格專欄 ({newsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeTab === 'staff'
                  ? 'bg-[#8C5B3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5C5549] hover:bg-[#EFE9E0] border border-[#DDD5C7]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>人員管理 ({staffMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeTab === 'logs'
                  ? 'bg-[#8C5B3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5C5549] hover:bg-[#EFE9E0] border border-[#DDD5C7]'
              }`}
            >
              <History className="w-4 h-4" />
              <span>操作日誌 ({auditLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeTab === 'products'
                  ? 'bg-[#8C5B3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5C5549] hover:bg-[#EFE9E0] border border-[#DDD5C7]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>商品庫存 ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('banner')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeTab === 'banner'
                  ? 'bg-[#8C5B3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5C5549] hover:bg-[#EFE9E0] border border-[#DDD5C7]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>跑馬燈公告</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeTab === 'inquiries'
                  ? 'bg-[#8C5B3E] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5C5549] hover:bg-[#EFE9E0] border border-[#DDD5C7]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>預約留言 ({inquiries.filter((i) => i.status === 'pending').length} 待辦)</span>
            </button>
          </nav>

          <div className="text-xs text-[#7A7264] flex items-center gap-2">
            <span>前台預覽：</span>
            <button
              onClick={() => onNavigate('news')}
              className="text-[#8C5B3E] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              專欄頁面 <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: BLOG ARTICLE MANAGEMENT                            */}
        {/* ========================================================= */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            {/* Header / Actions Bar */}
            <div className="bg-white p-5 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-tc text-xl font-bold text-[#1F2421] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#8C5B3E]" />
                  <span>部落格與專題文章管理</span>
                </h2>
                <p className="text-xs text-[#6B6356] mt-1">
                  夥伴可發布採茶第一手動態、柴窯出窯陶壺鑑賞、泡茶水溫技法與青田茶舍活動，發布後前台即時更新。
                </p>
              </div>

              <button
                onClick={handleOpenCreateBlog}
                className="px-4 py-2.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>撰寫新部落格專文</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[#6B6356] shrink-0">分類：</span>
                <select
                  value={blogCategoryFilter}
                  onChange={(e) => setBlogCategoryFilter(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#D9D0C3] rounded px-3 py-1.5 text-xs text-[#1F2421]"
                >
                  <option value="all">全部專欄文章</option>
                  <option value="tea_harvest">時令茶訊</option>
                  <option value="brewing_guide">泡茶指南</option>
                  <option value="teaware_craft">茶具工藝</option>
                  <option value="event">茶席活動</option>
                  <option value="knowledge">習茶知味</option>
                  <option value="announcement">門市公告</option>
                </select>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-[#938B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  placeholder="搜尋文章標題、作者或內文..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>
            </div>

            {/* Articles Table / List */}
            <div className="bg-white rounded-xl border border-[#E2DDD5] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E2DDD5] text-[#5C5549] font-medium">
                    <tr>
                      <th className="py-3.5 px-4">文章專題</th>
                      <th className="py-3.5 px-3">分類標籤</th>
                      <th className="py-3.5 px-3">作者/職稱</th>
                      <th className="py-3.5 px-3">預估時長</th>
                      <th className="py-3.5 px-3">發布日期</th>
                      <th className="py-3.5 px-3">狀態</th>
                      <th className="py-3.5 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEBE4]">
                    {filteredBlogList.map((article) => (
                      <tr key={article.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex items-start gap-3">
                            {article.image && (
                              <img
                                src={article.image}
                                alt={article.title}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded object-cover shrink-0 border border-[#E5DFD5]"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-1.5">
                                {article.isPinned && (
                                  <span className="bg-[#8C5B3E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                    <Pin className="w-2.5 h-2.5" /> 置頂
                                  </span>
                                )}
                                <span className="font-serif-tc font-bold text-[#1F2421] line-clamp-1">
                                  {article.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#7A7365] line-clamp-1 mt-0.5">
                                {article.summary}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className="bg-[#FAF8F5] text-[#8C5B3E] border border-[#DDD5C7] px-2 py-0.5 rounded text-[11px]">
                            {article.categoryLabel}
                          </span>
                          {article.tags && article.tags[0] && (
                            <div className="text-[10px] text-[#8C8477] mt-1">#{article.tags[0]}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <div className="font-medium text-[#1F2421]">{article.author}</div>
                          <div className="text-[10px] text-[#8C8477]">{article.authorRole || '茶事夥伴'}</div>
                        </td>

                        <td className="py-3.5 px-3 whitespace-nowrap text-[#6B6356]">
                          {article.readTime || '3 分鐘'}
                        </td>

                        <td className="py-3.5 px-3 whitespace-nowrap text-[#6B6356]">
                          {article.publishedAt}
                        </td>

                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleBlogPublish(article)}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 cursor-pointer ${
                              article.isPublished
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {article.isPublished ? (
                              <>
                                <Eye className="w-3 h-3" /> 公開中
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" /> 草稿
                              </>
                            )}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleBlogPin(article)}
                              className={`p-1.5 rounded transition-colors cursor-pointer ${
                                article.isPinned
                                  ? 'text-[#8C5B3E] bg-[#F2EDE5]'
                                  : 'text-[#9E978B] hover:text-[#1F2421]'
                              }`}
                              title={article.isPinned ? '取消置頂' : '設為置頂'}
                            >
                              <Pin className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEditBlog(article)}
                              className="p-1.5 rounded text-[#2A312B] hover:bg-[#EFE9E0] transition-colors cursor-pointer"
                              title="編輯文章"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteBlogArticle(article.id, article.title)}
                              className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="刪除文章"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: STAFF / PARTNER TEAM MANAGEMENT                    */}
        {/* ========================================================= */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            {/* Header & Stats */}
            <div className="bg-white p-5 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-tc text-xl font-bold text-[#1F2421] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#8C5B3E]" />
                  <span>團隊人員與權限管理</span>
                </h2>
                <p className="text-xs text-[#6B6356] mt-1">
                  管理茶舍團隊夥伴名單、系統權限分工（超級管理員、內容編輯、門市店長）與帳號啟用狀態。
                </p>
              </div>

              <button
                onClick={handleOpenAddStaff}
                className="px-4 py-2.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>新增團隊夥伴</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-[#E2DDD5] shadow-2xs">
                <div className="text-[#7A7365]">團隊總成員</div>
                <div className="font-serif-tc text-2xl font-bold text-[#1F2421] mt-1">{staffMembers.length} 人</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E2DDD5] shadow-2xs">
                <div className="text-[#7A7365]">超級管理員 (Admin)</div>
                <div className="font-serif-tc text-2xl font-bold text-[#8C5B3E] mt-1">
                  {staffMembers.filter((s) => s.role === 'admin').length} 位
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E2DDD5] shadow-2xs">
                <div className="text-[#7A7365]">內容與專欄編輯</div>
                <div className="font-serif-tc text-2xl font-bold text-[#2A312B] mt-1">
                  {staffMembers.filter((s) => s.role === 'editor').length} 位
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E2DDD5] shadow-2xs">
                <div className="text-[#7A7365]">正常啟用狀態</div>
                <div className="font-serif-tc text-2xl font-bold text-emerald-700 mt-1">
                  {staffMembers.filter((s) => s.status === 'active').length} 人
                </div>
              </div>
            </div>

            {/* Staff Search */}
            <div className="bg-white p-4 rounded-xl border border-[#E2DDD5] shadow-2xs flex items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-[#938B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={staffSearchQuery}
                  onChange={(e) => setStaffSearchQuery(e.target.value)}
                  placeholder="搜尋成員姓名、職稱或帳號信箱..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div className="text-xs text-[#7A7365] hidden sm:block">
                點擊「切換身分」可立即以此成員身分測試各項發布與操作紀錄
              </div>
            </div>

            {/* Staff Members Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStaffList.map((staff) => {
                const isCurrent = actorName === staff.name;
                const roleBadgeMap = {
                  admin: { label: '超級管理員', bg: 'bg-[#8C5B3E]/15 text-[#8C5B3E] border-[#8C5B3E]/30' },
                  editor: { label: '內容編輯', bg: 'bg-[#2A312B]/10 text-[#2A312B] border-[#2A312B]/20' },
                  store_manager: { label: '門市店長', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                };
                const badge = roleBadgeMap[staff.role] || roleBadgeMap.editor;

                return (
                  <div
                    key={staff.id}
                    className={`bg-white rounded-xl border p-5 space-y-4 shadow-2xs transition-all relative ${
                      isCurrent ? 'border-[#8C5B3E] ring-2 ring-[#8C5B3E]/20' : 'border-[#E2DDD5]'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute top-3 right-3 bg-[#8C5B3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        當前登入者
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#2A312B] text-white flex items-center justify-center font-serif-tc font-bold text-base shrink-0 shadow-xs">
                        {staff.name.slice(0, 1)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif-tc text-base font-bold text-[#1F2421] truncate">
                            {staff.name}
                          </h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${badge.bg}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="text-xs text-[#8C5B3E] font-medium">{staff.roleTitle}</div>
                        <div className="text-[11px] text-[#7A7365] truncate mt-0.5">{staff.email}</div>
                      </div>
                    </div>

                    <div className="text-xs text-[#5C5549] bg-[#FAF8F5] p-3 rounded-lg border border-[#EFEBE4] space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8C8477]">聯絡電話：</span>
                        <span className="font-medium text-[#1F2421]">{staff.phone || '未提供'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8C8477]">帳號狀態：</span>
                        <span className={`font-medium ${staff.status === 'active' ? 'text-emerald-700' : 'text-red-600'}`}>
                          {staff.status === 'active' ? '● 正常啟用' : '○ 已停用'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#8C8477]">最後登入：</span>
                        <span className="text-[#7A7365]">{staff.lastLoginAt || '2026-09-09 18:00'}</span>
                      </div>
                      {staff.notes && (
                        <p className="text-[11px] text-[#6B6356] border-t border-[#EAE4DC] pt-1.5 mt-1 line-clamp-2">
                          {staff.notes}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      {!isCurrent && (
                        <button
                          onClick={() => onSwitchPartner(`${staff.name}（${staff.roleTitle}）`)}
                          className="px-2.5 py-1 text-[11px] bg-[#FAF8F5] hover:bg-[#EFE9E0] text-[#3D372E] rounded border border-[#D9D0C3] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="切換以此夥伴身分操作"
                        >
                          <ArrowRight className="w-3 h-3 text-[#8C5B3E]" />
                          <span>切換身分</span>
                        </button>
                      )}

                      <div className="flex items-center gap-1.5 ml-auto">
                        <button
                          onClick={() => handleToggleStaffStatus(staff)}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            staff.status === 'active'
                              ? 'text-emerald-700 hover:bg-emerald-50'
                              : 'text-stone-400 hover:bg-stone-100'
                          }`}
                          title={staff.status === 'active' ? '點擊停用帳號' : '點擊啟用帳號'}
                        >
                          {staff.status === 'active' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleOpenEditStaff(staff)}
                          className="p-1.5 rounded text-[#2A312B] hover:bg-[#EFE9E0] transition-colors cursor-pointer"
                          title="編輯資料"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {!isCurrent && (
                          <button
                            onClick={() => handleDeleteStaffMember(staff)}
                            className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="移除成員"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AUDIT LOGS / OPERATION HISTORY                     */}
        {/* ========================================================= */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-5 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-tc text-xl font-bold text-[#1F2421] flex items-center gap-2">
                  <History className="w-5 h-5 text-[#8C5B3E]" />
                  <span>系統操作日誌與活動歷程</span>
                </h2>
                <p className="text-xs text-[#6B6356] mt-1">
                  即時完整追蹤哪位夥伴在何時執行了什麼操作（發布專欄文章、調整商品庫存、更新公告、人員權限異動等）。
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLogsText}
                  className="px-3 py-2 bg-white hover:bg-[#FAF8F5] text-[#332E27] text-xs font-medium rounded-lg border border-[#DDD5C7] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="複製當前篩選之日誌紀錄文字"
                >
                  {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#8C5B3E]" />}
                  <span>{copyFeedback ? '已複製到剪貼簿' : '複製日誌文字'}</span>
                </button>
              </div>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#6B6356]">類別：</span>
                  <select
                    value={logCategoryFilter}
                    onChange={(e) => setLogCategoryFilter(e.target.value)}
                    className="bg-[#FAF8F5] border border-[#D9D0C3] rounded px-2.5 py-1.5 text-xs text-[#1F2421]"
                  >
                    <option value="all">全部操作類別</option>
                    <option value="blog">📝 部落格專欄</option>
                    <option value="staff">👥 人員管理</option>
                    <option value="products">📦 商品庫存</option>
                    <option value="banner">📢 系統公告</option>
                    <option value="inquiries">💬 顧客預約</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[#6B6356]">操作夥伴：</span>
                  <select
                    value={logActorFilter}
                    onChange={(e) => setLogActorFilter(e.target.value)}
                    className="bg-[#FAF8F5] border border-[#D9D0C3] rounded px-2.5 py-1.5 text-xs text-[#1F2421]"
                  >
                    <option value="all">全體夥伴</option>
                    {staffMembers.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}（{s.roleTitle}）
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-[#938B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                  placeholder="搜尋日誌動態、夥伴姓名或細節..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>
            </div>

            {/* Timeline List */}
            <div className="bg-white rounded-xl border border-[#E2DDD5] shadow-2xs divide-y divide-[#EFEBE4]">
              {filteredAuditLogs.length === 0 ? (
                <div className="p-12 text-center text-xs text-[#7A7264] space-y-2">
                  <Activity className="w-8 h-8 text-[#8C5B3E] mx-auto opacity-60" />
                  <p className="font-serif-tc text-sm text-[#1F2421]">查無符合條件的操作日誌</p>
                  <p>您可調整搜尋關鍵字或重設類別篩選。</p>
                </div>
              ) : (
                filteredAuditLogs.map((log) => {
                  const categoryBadgeColor: Record<string, { bg: string; text: string; border: string }> = {
                    blog: { bg: 'bg-[#8C5B3E]/10', text: 'text-[#8C5B3E]', border: 'border-[#8C5B3E]/20' },
                    staff: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
                    products: { bg: 'bg-[#2A312B]/10', text: 'text-[#2A312B]', border: 'border-[#2A312B]/20' },
                    banner: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
                    inquiries: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
                    auth: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
                  };
                  const color = categoryBadgeColor[log.category] || categoryBadgeColor.blog;

                  return (
                    <div key={log.id} className="p-4 sm:p-5 hover:bg-[#FAF8F5] transition-colors flex items-start gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#2A312B] text-white flex items-center justify-center font-serif-tc font-bold text-sm shrink-0 mt-0.5">
                        {log.actorName.slice(0, 1)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif-tc font-bold text-[#1F2421] text-xs sm:text-sm">
                            {log.actorName}
                          </span>
                          <span className="text-[11px] text-[#7A7365] bg-[#FAF8F5] border border-[#E5DFD5] px-1.5 py-0.5 rounded">
                            {log.actorRoleTitle}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${color.bg} ${color.text} ${color.border}`}>
                            {log.categoryLabel}
                          </span>
                          <span className="text-[11px] font-semibold text-[#1F2421]">
                            {log.action}
                          </span>
                        </div>

                        <p className="text-xs text-[#524B3F] leading-relaxed break-words">
                          {log.details}
                        </p>

                        <div className="flex items-center gap-2 text-[11px] text-[#938B7E] pt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{log.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PRODUCTS INVENTORY & PRICING                       */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-tc text-xl font-bold text-[#1F2421] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#8C5B3E]" />
                  <span>商品庫存與價格管理</span>
                </h2>
                <p className="text-xs text-[#6B6356] mt-1">
                  實時維護高山茶葉與職人柴燒茶具庫存。當庫存為 0 時前台會自動顯示「已售罄」。
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#938B7E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder="搜尋茶品或器皿名稱..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2DDD5] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E2DDD5] text-[#5C5549] font-medium">
                    <tr>
                      <th className="py-3.5 px-4">商品名與規格</th>
                      <th className="py-3.5 px-3">分類</th>
                      <th className="py-3.5 px-3">售價 (NT$)</th>
                      <th className="py-3.5 px-3">現貨庫存</th>
                      <th className="py-3.5 px-3">狀態</th>
                      <th className="py-3.5 px-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEBE4]">
                    {products
                      .filter((p) => !productSearchQuery || p.name.includes(productSearchQuery))
                      .map((prod) => {
                        const isEditingThis = editingProductId === prod.id;

                        return (
                          <tr key={prod.id} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 rounded object-cover border border-[#E2DDD5]"
                                />
                                <div>
                                  <div className="font-serif-tc font-bold text-[#1F2421]">{prod.name}</div>
                                  <div className="text-[11px] text-[#7A7365]">{prod.subtitle} • {prod.capacity}</div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="text-[#8C5B3E] bg-[#FAF8F5] border border-[#DDD5C7] px-2 py-0.5 rounded text-[11px]">
                                {prod.category === 'tea' ? '單品茶葉' : prod.category === 'teaware' ? '手作茶具' : '典藏禮盒'}
                              </span>
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              {isEditingThis ? (
                                <input
                                  type="number"
                                  value={editPriceValue}
                                  onChange={(e) => setEditPriceValue(Number(e.target.value))}
                                  className="w-20 px-2 py-1 bg-[#FAF8F5] border border-[#8C5B3E] rounded text-xs"
                                />
                              ) : (
                                <span className="font-medium text-[#1F2421]">NT$ {prod.price.toLocaleString()}</span>
                              )}
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              {isEditingThis ? (
                                <input
                                  type="number"
                                  value={editStockValue}
                                  onChange={(e) => setEditStockValue(Number(e.target.value))}
                                  className="w-20 px-2 py-1 bg-[#FAF8F5] border border-[#8C5B3E] rounded text-xs"
                                />
                              ) : (
                                <span className={`font-bold ${prod.stockCount > 0 ? 'text-[#1F2421]' : 'text-red-600'}`}>
                                  {prod.stockCount} 件
                                </span>
                              )}
                            </td>

                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                                prod.inStock && prod.stockCount > 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {prod.inStock && prod.stockCount > 0 ? '供貨充沛' : '已售罄'}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              {isEditingThis ? (
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleSaveProductStock(prod)}
                                    className="px-2.5 py-1 bg-[#8C5B3E] text-white rounded text-xs hover:bg-[#73482E] flex items-center gap-1 cursor-pointer"
                                  >
                                    <Check className="w-3 h-3" /> 儲存
                                  </button>
                                  <button
                                    onClick={() => setEditingProductId(null)}
                                    className="px-2 py-1 bg-[#EAE4DC] text-[#4A4338] rounded text-xs hover:bg-[#DDD5C7] cursor-pointer"
                                  >
                                    取消
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleStartEditProduct(prod)}
                                  className="px-2.5 py-1 text-xs bg-[#FAF8F5] hover:bg-[#EFE9E0] text-[#3D372E] rounded border border-[#D9D0C3] flex items-center gap-1 ml-auto cursor-pointer"
                                >
                                  <Edit className="w-3 h-3" /> 快速調整
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: BANNER NOTICE                                      */}
        {/* ========================================================= */}
        {activeTab === 'banner' && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-[#E2DDD5] shadow-2xs space-y-6">
            <div>
              <h2 className="font-serif-tc text-xl font-bold text-[#1F2421] flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#8C5B3E]" />
                <span>全站頂部跑馬燈公告設定</span>
              </h2>
              <p className="text-xs text-[#6B6356] mt-1">
                顯示在官方網站最頂部的宣傳跑馬燈文字，適合公布採茶季免運、出窯活動或假期休館。
              </p>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-[#474034] block">跑馬燈公告內容：</label>
                <input
                  type="text"
                  value={tempBannerText}
                  onChange={(e) => setTempBannerText(e.target.value)}
                  placeholder="例如：全館訂單滿 NT$ 1,500 即享黑貓宅急便 / 超商免運優惠"
                  className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded border border-[#EFEBE4]">
                <input
                  type="checkbox"
                  id="banner-toggle"
                  checked={tempBannerEnabled}
                  onChange={(e) => setTempBannerEnabled(e.target.checked)}
                  className="rounded text-[#8C5B3E] focus:ring-[#8C5B3E] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="banner-toggle" className="text-xs text-[#1F2421] font-medium cursor-pointer">
                  在前台頂部公開顯示此跑馬燈橫幅
                </label>
              </div>

              {bannerSaveFeedback && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>公告內容已成功更新並記錄於操作日誌！</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>儲存並同步至前台</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: INQUIRIES & BOOKING MESSAGES                       */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-[#E2DDD5] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-tc text-xl font-bold text-[#1F2421] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#8C5B3E]" />
                  <span>顧客預約與茶務諮詢收件匣</span>
                </h2>
                <p className="text-xs text-[#6B6356] mt-1">
                  訪客在「品茗預約與聯絡」填寫的需求會即時同步至此處，供夥伴聯繫確認。
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#6B6356]">狀態篩選：</span>
                <select
                  value={inquiryFilter}
                  onChange={(e) => setInquiryFilter(e.target.value as any)}
                  className="bg-[#FAF8F5] border border-[#D9D0C3] rounded px-3 py-1.5 text-xs text-[#1F2421]"
                >
                  <option value="all">全部留言 ({inquiries.length})</option>
                  <option value="pending">待處理</option>
                  <option value="contacted">已電訪確認</option>
                  <option value="resolved">已安排席次</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries
                .filter((item) => inquiryFilter === 'all' || item.status === inquiryFilter)
                .map((inq) => (
                  <div key={inq.id} className="bg-white p-5 rounded-xl border border-[#E2DDD5] shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif-tc font-bold text-sm text-[#1F2421]">{inq.name}</span>
                          <span className="text-[11px] bg-[#FAF8F5] text-[#8C5B3E] border border-[#DDD5C7] px-2 py-0.5 rounded">
                            {inq.category === 'tasting_session' ? '青田茶席預約' : inq.category === 'corporate_gift' ? '企業禮盒洽詢' : '茶具客製'}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8C8477] mt-0.5">{inq.createdAt}</div>
                      </div>

                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateInquiryStatus(inq.id, inq.name, e.target.value as any)}
                        className={`text-xs px-2.5 py-1 rounded font-medium border ${
                          inq.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : inq.status === 'contacted'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="pending">⏳ 待聯繫</option>
                        <option value="contacted">📞 已電訪確認</option>
                        <option value="resolved">✓ 已安排席次</option>
                      </select>
                    </div>

                    <div className="text-xs text-[#524B3F] bg-[#FAF8F5] p-3 rounded-lg border border-[#EFEBE4] space-y-1">
                      <div>電話：<strong className="text-[#1F2421]">{inq.phone}</strong> ｜ 信箱：{inq.email}</div>
                      {inq.date && <div>預約日期：{inq.date} • {inq.guestsCount || '1'} 位貴賓</div>}
                      <p className="text-xs text-[#332E27] whitespace-pre-line border-t border-[#EAE4DC] pt-1.5 mt-1">
                        {inq.message}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: CREATE / EDIT BLOG ARTICLE                         */}
      {/* ========================================================= */}
      {isEditingBlog && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsEditingBlog(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-5 relative max-h-[90vh] overflow-y-auto border border-[#D9D0C3] shadow-2xl animate-in zoom-in-95 duration-200 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditingBlog(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F2EDE5] text-[#736B5E] hover:text-[#1F2421] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif-tc text-2xl font-bold text-[#1F2421]">
                {editingArticle.id?.startsWith('blog-') ? '撰寫新部落格專題' : '編輯部落格專欄文章'}
              </h3>
              <p className="text-[#6B6356]">
                發布高山茶事日誌、泡茶技術常識或門市茶席公告，即時記錄於操作日誌並更新前台。
              </p>
            </div>

            <form onSubmit={handleSaveBlogArticle} className="space-y-4">
              <div>
                <label className="block text-[#474034] font-medium mb-1">文章專題標題 *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="例如：2026 梨山春茶頭採開山公告 ｜ 預購早鳥名額正式開放"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#474034] font-medium mb-1">文章專題分類</label>
                  <select
                    value={editingArticle.category || 'tea_harvest'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  >
                    <option value="tea_harvest">時令茶訊</option>
                    <option value="brewing_guide">泡茶指南</option>
                    <option value="teaware_craft">茶具工藝</option>
                    <option value="event">茶席活動</option>
                    <option value="knowledge">習茶知味</option>
                    <option value="announcement">門市公告</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#474034] font-medium mb-1">發布作者</label>
                  <input
                    type="text"
                    value={editingArticle.author || actorName}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  />
                </div>

                <div>
                  <label className="block text-[#474034] font-medium mb-1">預估閱讀時長</label>
                  <input
                    type="text"
                    value={editingArticle.readTime || '4 分鐘閱讀'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    placeholder="例如：4 分鐘閱讀"
                    className="w-full p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">主題標籤（以逗號分隔）</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="例如：梨山高冷茶, 早鳥預購, 柴燒手拉胚"
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              {/* Cover Image Preset */}
              <div className="space-y-2">
                <label className="block text-[#474034] font-medium">封面圖片選擇或輸入網址</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {presetImages.map((img, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setEditingArticle({ ...editingArticle, image: img.url })}
                      className={`relative aspect-video rounded overflow-hidden border-2 transition-all cursor-pointer ${
                        editingArticle.image === img.url ? 'border-[#8C5B3E] ring-2 ring-[#8C5B3E]/30' : 'border-[#E2DDD5]'
                      }`}
                    >
                      <img src={img.url} alt={img.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] text-center py-0.5 truncate px-1">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editingArticle.image || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                  placeholder="或直接貼上 Unsplash 等自訂圖片 URL..."
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">文章前導簡述 (Summary)</label>
                <textarea
                  rows={2}
                  value={editingArticle.summary || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, summary: e.target.value })}
                  placeholder="在文章列表卡片中呈現之 2~3 句優雅摘錄..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">專文詳細內文 (Content) *</label>
                <textarea
                  rows={8}
                  required
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="撰寫完整的茶席紀事、品鑑風味描述或工藝背景（支援分段排版與標題）..."
                  className="w-full p-3 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs font-sans focus:outline-none focus:border-[#8C5B3E] leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 p-3 bg-[#FAF8F5] rounded border border-[#EFEBE4]">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1F2421]">
                  <input
                    type="checkbox"
                    checked={editingArticle.isPinned ?? false}
                    onChange={(e) => setEditingArticle({ ...editingArticle, isPinned: e.target.checked })}
                    className="w-4 h-4 text-[#8C5B3E] rounded cursor-pointer"
                  />
                  <span>設為首頁與專欄頂部置頂文章</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1F2421]">
                  <input
                    type="checkbox"
                    checked={editingArticle.isPublished ?? true}
                    onChange={(e) => setEditingArticle({ ...editingArticle, isPublished: e.target.checked })}
                    className="w-4 h-4 text-[#8C5B3E] rounded cursor-pointer"
                  />
                  <span>立即公開發布（取消勾選則為草稿）</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingBlog(false)}
                  className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#EFE9E0] text-[#4A4338] rounded border border-[#D9D0C3] transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8C5B3E] hover:bg-[#73482E] text-white font-medium rounded transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>儲存文章並同步更新</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT STAFF MEMBER                            */}
      {/* ========================================================= */}
      {isEditingStaff && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsEditingStaff(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 sm:p-7 space-y-5 relative border border-[#D9D0C3] shadow-2xl animate-in zoom-in-95 duration-200 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditingStaff(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F2EDE5] text-[#736B5E] hover:text-[#1F2421] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif-tc text-2xl font-bold text-[#1F2421] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8C5B3E]" />
                <span>{editingStaffMember.id?.startsWith('staff-') ? '新增團隊夥伴' : '編輯夥伴資料'}</span>
              </h3>
              <p className="text-[#6B6356] mt-0.5">
                設定夥伴姓名、專屬職稱、系統身分權限與聯絡資訊。
              </p>
            </div>

            <form onSubmit={handleSaveStaffMember} className="space-y-3.5">
              <div>
                <label className="block text-[#474034] font-medium mb-1">夥伴姓名 *</label>
                <input
                  type="text"
                  required
                  value={editingStaffMember.name || ''}
                  onChange={(e) => setEditingStaffMember({ ...editingStaffMember, name: e.target.value })}
                  placeholder="例如：郭雅雯、林怡秀"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#474034] font-medium mb-1">專業職稱 *</label>
                  <input
                    type="text"
                    required
                    value={editingStaffMember.roleTitle || ''}
                    onChange={(e) => setEditingStaffMember({ ...editingStaffMember, roleTitle: e.target.value })}
                    placeholder="例如：茶務總監、陶藝主理人"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  />
                </div>

                <div>
                  <label className="block text-[#474034] font-medium mb-1">系統身分角色</label>
                  <select
                    value={editingStaffMember.role || 'editor'}
                    onChange={(e) => setEditingStaffMember({ ...editingStaffMember, role: e.target.value as any })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                  >
                    <option value="admin">超級管理員 (Admin)</option>
                    <option value="editor">內容與專欄編輯 (Editor)</option>
                    <option value="store_manager">門市店長 (Manager)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">電子信箱 / 登入帳號 *</label>
                <input
                  type="email"
                  required
                  value={editingStaffMember.email || ''}
                  onChange={(e) => setEditingStaffMember({ ...editingStaffMember, email: e.target.value })}
                  placeholder="例如：partner@qiyun-tea.tw"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">聯絡手機</label>
                <input
                  type="text"
                  value={editingStaffMember.phone || ''}
                  onChange={(e) => setEditingStaffMember({ ...editingStaffMember, phone: e.target.value })}
                  placeholder="例如：0912-345-678"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div>
                <label className="block text-[#474034] font-medium mb-1">職責說明與備註</label>
                <textarea
                  rows={2}
                  value={editingStaffMember.notes || ''}
                  onChange={(e) => setEditingStaffMember({ ...editingStaffMember, notes: e.target.value })}
                  placeholder="例如：負責青田茶舍現場預約接待與採購事宜..."
                  className="w-full p-2 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-[#FAF8F5] rounded border border-[#EFEBE4]">
                <input
                  type="checkbox"
                  id="staff-status-toggle"
                  checked={editingStaffMember.status === 'active'}
                  onChange={(e) =>
                    setEditingStaffMember({
                      ...editingStaffMember,
                      status: e.target.checked ? 'active' : 'inactive',
                    })
                  }
                  className="w-4 h-4 text-[#8C5B3E] rounded cursor-pointer"
                />
                <label htmlFor="staff-status-toggle" className="text-xs text-[#1F2421] font-medium cursor-pointer">
                  啟用帳號登入與後台操作權限
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingStaff(false)}
                  className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#EFE9E0] text-[#4A4338] rounded border border-[#D9D0C3] cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8C5B3E] hover:bg-[#73482E] text-white font-medium rounded cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>儲存夥伴資料</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
