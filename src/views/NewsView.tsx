import React, { useState, useMemo } from 'react';
import { Calendar, Tag, ArrowRight, Sparkles, Pin, User, X, BookOpen, Share2, Search, Clock, Eye, Check } from 'lucide-react';
import { NewsArticle, PageId } from '../types';

interface NewsViewProps {
  news: NewsArticle[];
  onNavigate: (page: PageId) => void;
  onOpenAdmin: () => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ news, onNavigate, onOpenAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: '全部文章' },
    { id: 'tea_harvest', label: '時令茶訊' },
    { id: 'brewing_guide', label: '泡茶指南' },
    { id: 'teaware_craft', label: '茶具工藝' },
    { id: 'event', label: '茶席活動' },
    { id: 'knowledge', label: '習茶知味' },
  ];

  const publishedNews = useMemo(() => news.filter((item) => item.isPublished), [news]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    publishedNews.forEach((item) => {
      item.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [publishedNews]);

  const filteredNews = useMemo(() => {
    return publishedNews.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedTag !== 'all' && (!item.tags || !item.tags.includes(selectedTag))) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSummary = item.summary.toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        const matchAuthor = item.author.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!matchTitle && !matchSummary && !matchContent && !matchAuthor && !matchTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [publishedNews, selectedCategory, selectedTag, searchQuery]);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div id="blog-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
          Qi Yun Journal & Tea Culture
        </span>
        <h1 className="font-serif-tc text-3xl sm:text-4xl font-bold text-[#1F2421]">
          茶道專欄 ｜ 棲雲茶誌
        </h1>
        <p className="text-xs sm:text-sm text-[#61584C] leading-relaxed">
          記錄台灣高山春冬採茶動態、手拉胚柴燒陶器出窯、台北青田街私人茶席與茶道生活生活美學。
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E2DDD5] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2A312B] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5C5549] hover:bg-[#EAE4DC] hover:text-[#1F2421] border border-[#E5DFD5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Admin shortcut */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#938B7E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋專文標題、作者或風味..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9E978B] hover:text-[#1F2421]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              onClick={onOpenAdmin}
              className="text-xs text-[#8C5B3E] hover:underline flex items-center gap-1 font-medium bg-[#FAF8F5] hover:bg-[#F2EDE5] px-3 py-1.5 rounded border border-[#D9D0C3] shrink-0 cursor-pointer"
              title="前往夥伴管理後台新增或編輯文章"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">後台發布文章</span>
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#F0EBE3] text-xs text-[#7A7365] overflow-x-auto pb-1">
            <span className="shrink-0 font-medium text-[#4A4237] flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#8C5B3E]" /> 熱門標籤：
            </span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-0.5 rounded text-[11px] transition-colors shrink-0 ${
                selectedTag === 'all'
                  ? 'bg-[#8C5B3E] text-white font-medium'
                  : 'bg-[#F4EFEB] hover:bg-[#EAE4DC] text-[#635A4C]'
              }`}
            >
              全部
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? 'all' : tag)}
                className={`px-2.5 py-0.5 rounded text-[11px] transition-colors shrink-0 ${
                  selectedTag === tag
                    ? 'bg-[#8C5B3E] text-white font-medium'
                    : 'bg-[#F4EFEB] hover:bg-[#EAE4DC] text-[#635A4C]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      {filteredNews.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[#E5E0D6] text-center space-y-3">
          <BookOpen className="w-10 h-10 text-[#8C5B3E] mx-auto opacity-70" />
          <p className="font-serif-tc text-base text-[#1F2421]">目前尚無符合篩選條件的茶事文章</p>
          <p className="text-xs text-[#7A7264]">您可以嘗試更換關鍵字或點擊「全部文章」，夥伴亦可隨時於後台發布新專題。</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#2A312B] text-white text-xs rounded hover:bg-[#8C5B3E] transition-colors inline-block mt-2"
          >
            重設篩選條件
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-xl border border-[#E5E0D6] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Cover Image */}
                {article.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EDE5]">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.isPinned && (
                      <span className="absolute top-3 left-3 bg-[#8C5B3E] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow flex items-center gap-1">
                        <Pin className="w-3 h-3" /> 置頂專題
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-[#1F2421]/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded">
                      {article.categoryLabel}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#8C8477]">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {article.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {article.author} {article.authorRole ? `(${article.authorRole})` : ''}
                      </span>
                    </div>

                    {article.readTime && (
                      <span className="flex items-center gap-1 text-[#8C5B3E]">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif-tc text-lg font-bold text-[#1F2421] group-hover:text-[#8C5B3E] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-xs text-[#6B6356] leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-[#FAF8F5] text-[#82786A] px-2 py-0.5 rounded border border-[#E8E2D9]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#F5F2EC] flex items-center justify-between mt-2">
                <span className="text-xs font-semibold text-[#8C5B3E] group-hover:text-[#73482E] inline-flex items-center gap-1.5 transition-colors">
                  <span>閱讀專文詳情</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>

                {article.viewsCount && (
                  <span className="text-[11px] text-[#A89F91] flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {article.viewsCount} 次品讀
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto border border-[#D9D0C3] shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F2EDE5] text-[#736B5E] hover:text-[#1F2421] transition-colors cursor-pointer"
              title="關閉"
            >
              <X className="w-5 h-5" />
            </button>

            {activeArticle.image && (
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-[#F2EDE5]">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8C8477]">
                <span className="bg-[#FAF8F5] text-[#8C5B3E] font-semibold px-2 py-0.5 rounded border border-[#E5E0D6]">
                  {activeArticle.categoryLabel}
                </span>
                <span>{activeArticle.publishedAt}</span>
                <span>•</span>
                <span>專欄作者：{activeArticle.author} {activeArticle.authorRole ? `（${activeArticle.authorRole}）` : ''}</span>
                {activeArticle.readTime && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8C5B3E]" /> {activeArticle.readTime}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421] leading-snug">
                {activeArticle.title}
              </h2>

              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeArticle.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#FAF8F5] text-[#8C5B3E] px-2 py-0.5 rounded border border-[#E5DFD5]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-sm text-xs sm:text-sm text-[#474034] leading-relaxed whitespace-pre-line border-t border-[#EFEBE4] pt-4">
              {activeArticle.content}
            </div>

            {/* Author Footer Card */}
            <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#E8E2D9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2A312B] text-white flex items-center justify-center font-serif-tc font-bold">
                  {activeArticle.author.slice(0, 1)}
                </div>
                <div>
                  <div className="font-serif-tc font-bold text-[#1F2421]">{activeArticle.author}</div>
                  <div className="text-[11px] text-[#7A7365]">{activeArticle.authorRole || '棲雲茶事夥伴'}</div>
                </div>
              </div>

              <button
                onClick={handleShareClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F2EDE5] text-[#474034] rounded border border-[#D9D0C3] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">已複製連結</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#8C5B3E]" />
                    <span>複製文章連結</span>
                  </>
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#EFEBE4] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('products');
                  }}
                  className="px-4 py-2 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                >
                  探索相關茶品與器皿
                </button>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('contact');
                  }}
                  className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#EFE9E0] text-[#332E27] text-xs font-medium rounded border border-[#D9D0C3] transition-colors cursor-pointer"
                >
                  預約青田茶舍席次
                </button>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-[#736B5E] hover:text-[#1F2421] cursor-pointer"
              >
                返回文章列表
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
