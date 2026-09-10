import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Share2, Globe, MessageSquare, Info } from 'lucide-react';
import { PageId } from '../types';
import { PAGE_META } from '../utils/meta';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  currentPage,
}) => {
  const [activeTab, setActiveTab] = useState<'threads' | 'facebook' | 'line' | 'metaTags'>('threads');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentMeta = PAGE_META[currentPage] || PAGE_META.home;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://qiyun-tea.tw';
  const siteDomain = 'qiyun-tea.tw';
  const ogImageUrl = currentMeta.ogImage || '/og-image.jpg';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500');
  };

  const handleShareThreads = () => {
    const text = `${currentMeta.title}\n${currentMeta.description}\n${currentUrl}`;
    const threadsUrl = `https://threads.net/intent/post?text=${encodeURIComponent(text)}`;
    window.open(threadsUrl, '_blank', 'width=600,height=600');
  };

  return (
    <div
      id="social-share-preview-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] w-full max-w-2xl rounded-lg shadow-2xl border border-[#D9D0C3] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2DDD5] bg-[#F2EDE5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#8C5B3E] text-white rounded-md">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-tc text-lg font-bold text-[#1F2421]">
                社群分享預覽設定（Open Graph & Cards）
              </h3>
              <p className="text-xs text-[#6F675A]">
                已設定符合 Facebook、Threads、LINE、X 的標準 OG 標籤
              </p>
            </div>
          </div>
          <button
            id="close-share-modal-btn"
            onClick={onClose}
            className="p-1.5 text-[#6F675A] hover:text-[#1F2421] hover:bg-[#E5DED4] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E2DDD5] bg-[#F7F4EE] px-6 pt-3 gap-2 overflow-x-auto">
          <button
            id="tab-threads-preview"
            onClick={() => setActiveTab('threads')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'threads'
                ? 'border-[#1F2421] text-[#1F2421] font-semibold'
                : 'border-transparent text-[#756E61] hover:text-[#1F2421]'
            }`}
          >
            <span>Threads 預覽卡片</span>
          </button>
          <button
            id="tab-facebook-preview"
            onClick={() => setActiveTab('facebook')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'facebook'
                ? 'border-[#1F2421] text-[#1F2421] font-semibold'
                : 'border-transparent text-[#756E61] hover:text-[#1F2421]'
            }`}
          >
            <span>Facebook 貼文卡片</span>
          </button>
          <button
            id="tab-line-preview"
            onClick={() => setActiveTab('line')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'line'
                ? 'border-[#1F2421] text-[#1F2421] font-semibold'
                : 'border-transparent text-[#756E61] hover:text-[#1F2421]'
            }`}
          >
            <span>LINE / 通訊軟體氣泡</span>
          </button>
          <button
            id="tab-meta-inspect"
            onClick={() => setActiveTab('metaTags')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'metaTags'
                ? 'border-[#8C5B3E] text-[#8C5B3E] font-semibold'
                : 'border-transparent text-[#756E61] hover:text-[#1F2421]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>檢查 HTML Meta 原文</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Threads Preview Card */}
          {activeTab === 'threads' && (
            <div className="space-y-4">
              <div className="text-xs text-[#6F675A] flex items-center justify-between">
                <span>模擬在 Threads 發文或貼上連結時的卡片呈現：</span>
                <span className="text-[11px] bg-[#EFE9E0] px-2 py-0.5 rounded text-[#574F44]">Threads 演算即時讀取 OG Tag</span>
              </div>

              {/* Threads Mock Post */}
              <div className="bg-white border border-[#E0D7CB] rounded-xl p-4 shadow-xs space-y-3 font-sans">
                {/* Threads User Header */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2A312B] text-white flex items-center justify-center text-xs font-serif-tc font-bold">
                    雲
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">qiyun_tea</div>
                    <div className="text-[11px] text-neutral-500">台灣嚴選單品茶・職人柴燒茶器</div>
                  </div>
                </div>

                <div className="text-xs text-neutral-800 leading-relaxed">
                  在快節奏的生活中，為自己泡一杯能安頓身心的好茶。歡迎細細品味產地冷霧與手作陶器的指溫。
                </div>

                {/* Threads Embedded Link Card */}
                <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer">
                  <div className="aspect-video w-full bg-[#EAE4DC] relative overflow-hidden">
                    <img
                      src={ogImageUrl}
                      alt={currentMeta.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback image if relative path is being loaded in dev
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-500 mb-0.5 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {siteDomain}
                    </div>
                    <div className="font-semibold text-xs text-neutral-900 line-clamp-1 font-serif-tc">
                      {currentMeta.title}
                    </div>
                    <div className="text-[11px] text-neutral-600 line-clamp-2 mt-1 leading-normal">
                      {currentMeta.description}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  id="threads-share-now-btn"
                  onClick={handleShareThreads}
                  className="px-4 py-2 bg-[#1F2421] hover:bg-black text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> 前往 Threads 分享此頁
                </button>
              </div>
            </div>
          )}

          {/* Facebook Preview Card */}
          {activeTab === 'facebook' && (
            <div className="space-y-4">
              <div className="text-xs text-[#6F675A] flex items-center justify-between">
                <span>模擬在 Facebook 貼文分享時抓取的動態大圖卡片：</span>
                <span className="text-[11px] bg-[#EFE9E0] px-2 py-0.5 rounded text-[#574F44]">1200 × 630px 滿版高清適配</span>
              </div>

              {/* Facebook Mock Post */}
              <div className="bg-white border border-[#E0D7CB] rounded-lg shadow-xs overflow-hidden font-sans">
                <div className="p-3.5 flex items-center gap-2.5 border-b border-neutral-100">
                  <div className="w-9 h-9 rounded-full bg-[#8C5B3E] text-white flex items-center justify-center font-serif-tc font-bold text-sm">
                    棲
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">棲雲茶事 Qi Yun Tea</div>
                    <div className="text-[10px] text-neutral-500">剛剛 ‧ 公開 🌐</div>
                  </div>
                </div>

                <div className="px-3.5 py-2 text-xs text-neutral-800">
                  以時間萃取茶席之美，器物與茶葉的靜心對話。
                </div>

                {/* FB Link Card */}
                <div className="border-t border-[#E8E2D9] bg-[#F5F2EB]">
                  <div className="aspect-video w-full bg-[#EAE4DC] overflow-hidden">
                    <img
                      src={ogImageUrl}
                      alt={currentMeta.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                  <div className="p-3 border-t border-[#E8E2D9]">
                    <div className="text-[10px] uppercase text-neutral-500 font-medium">
                      {siteDomain}
                    </div>
                    <div className="font-bold text-xs text-neutral-900 mt-0.5 line-clamp-1 font-serif-tc">
                      {currentMeta.title}
                    </div>
                    <div className="text-[11px] text-neutral-600 line-clamp-2 mt-0.5">
                      {currentMeta.description}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  id="fb-share-now-btn"
                  onClick={handleShareFacebook}
                  className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> 立即透過 Facebook 分享
                </button>
              </div>
            </div>
          )}

          {/* LINE Preview Card */}
          {activeTab === 'line' && (
            <div className="space-y-4">
              <div className="text-xs text-[#6F675A]">
                模擬在 LINE 聊天室傳送網址時展開的卡片訊息：
              </div>

              <div className="bg-[#849EB2] p-4 rounded-xl flex justify-center">
                <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={ogImageUrl}
                      alt={currentMeta.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="font-bold text-xs text-neutral-900 font-serif-tc line-clamp-2">
                      {currentMeta.title}
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-2">
                      {currentMeta.description}
                    </div>
                    <div className="text-[10px] text-neutral-400 pt-1">
                      {siteDomain}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HTML Meta Inspector */}
          {activeTab === 'metaTags' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="text-xs text-[#6F675A] font-sans">
                目前本頁次動態生效的 HTML 標籤規格：
              </div>
              <div className="bg-[#1F2421] text-[#E0E7E1] p-4 rounded-md overflow-x-auto space-y-1 text-[11px]">
                <div>&lt;title&gt;{currentMeta.title}&lt;/title&gt;</div>
                <div>&lt;meta name="description" content="{currentMeta.description}" /&gt;</div>
                <div className="text-[#87D068]">&lt;!-- Open Graph (Facebook / Threads / LINE) --&gt;</div>
                <div>&lt;meta property="og:site_name" content="棲雲茶事 Qi Yun Tea" /&gt;</div>
                <div>&lt;meta property="og:title" content="{currentMeta.ogTitle}" /&gt;</div>
                <div>&lt;meta property="og:description" content="{currentMeta.ogDescription}" /&gt;</div>
                <div>&lt;meta property="og:image" content="{currentMeta.ogImage}" /&gt;</div>
                <div>&lt;meta property="og:type" content="website" /&gt;</div>
                <div>&lt;meta property="og:locale" content="zh_TW" /&gt;</div>
                <div className="text-[#87D068]">&lt;!-- Twitter / X Card --&gt;</div>
                <div>&lt;meta name="twitter:card" content="summary_large_image" /&gt;</div>
                <div>&lt;meta name="twitter:title" content="{currentMeta.title}" /&gt;</div>
                <div>&lt;meta name="twitter:description" content="{currentMeta.description}" /&gt;</div>
                <div>&lt;meta name="twitter:image" content="{currentMeta.ogImage}" /&gt;</div>
              </div>
            </div>
          )}

          {/* Quick Copy Link Row */}
          <div className="p-3 bg-[#F2EDE5] rounded-md border border-[#DFD6C8] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#524B40] truncate max-w-md w-full">
              <span className="font-semibold">當前分享連結：</span>
              <span className="font-mono ml-1 text-[#786F62]">{currentUrl}</span>
            </div>
            <button
              id="copy-share-url-btn"
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-4 py-1.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs font-medium rounded flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> 已複製連結
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> 複製網址
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E2DDD5] bg-[#F7F4EE] flex items-center justify-between">
          <span className="text-[11px] text-[#7A7365]">
            分享至社群平台時，演算法機器人將自動抓取上述標題、描述與大圖。
          </span>
          <button
            id="close-share-footer-btn"
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-[#4D463C] bg-white border border-[#D9D0C3] hover:bg-[#F2EDE5] rounded font-medium"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
