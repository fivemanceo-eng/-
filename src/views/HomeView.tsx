import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Compass, Heart, Award, Calendar, Tag, BookOpen } from 'lucide-react';
import { Product, PageId, NewsArticle } from '../types';
import { PRODUCTS, TEA_STORIES, TESTIMONIALS, BREWING_TIPS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onFilterCategory?: (cat: string) => void;
  news?: NewsArticle[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onAddToCart,
  onViewDetails,
  news = [],
}) => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const latestNews = news.filter((n) => n.isPublished).slice(0, 3);

  return (
    <div id="home-view" className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section id="hero-section" className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-[#E5DFD5]">
        {/* Background Image with Dark & Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/og-image.jpg"
            alt="棲雲茶事 茶席意境"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1920&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C201D]/90 via-[#1C201D]/75 to-[#1C201D]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#FAF8F5] space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/15 backdrop-blur-md border border-[#FAF8F5]/25 text-xs text-[#EAE4DC] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B6D]"></span>
            <span>2026 台灣頭採高山冬春茶・限量窯燒上架</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="font-serif-tc text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider leading-[1.25] text-balance">
              以時間萃取茶席之美，<br className="hidden sm:inline" />
              器物與茶葉的靜心對話。
            </h1>
            <p className="text-sm sm:text-base text-[#DCD4C7] max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              棲雲茶事嚴選台灣單一產區高山純種茶葉，搭配手拉胚柴燒與宋代汝窯茶器具。在每一次注水、持杯與回甘之間，為您找回心靈澄明的片刻寧靜。
            </p>
          </div>

          {/* Action Buttons (CTAs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-cta-explore-tea"
              onClick={() => onNavigate('products')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#8C5B3E] hover:bg-[#A26A42] text-white text-sm font-medium rounded-sm tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 group cursor-pointer"
            >
              <span>鑑賞茶葉與茶具</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-cta-book-session"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF8F5] text-sm font-medium rounded-sm tracking-wider flex items-center justify-center gap-2 transition-all border border-[#FAF8F5]/30 backdrop-blur-xs cursor-pointer"
            >
              <span>預約青田街私人品茗</span>
              <Compass className="w-4 h-4 text-[#C59B6D]" />
            </button>
          </div>

          {/* Micro badges below hero */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 max-w-xl mx-auto gap-4 text-center text-xs text-[#C5BDB0]">
            <div>
              <div className="font-serif-tc text-lg font-bold text-[#FAF8F5]">2,200m</div>
              <div className="text-[11px] text-[#A69E90]">極致高山冷礦氣候</div>
            </div>
            <div>
              <div className="font-serif-tc text-lg font-bold text-[#FAF8F5]">1,280°C</div>
              <div className="text-[11px] text-[#A69E90]">古法松木柴燒成器</div>
            </div>
            <div>
              <div className="font-serif-tc text-lg font-bold text-[#FAF8F5]">0 檢出</div>
              <div className="text-[11px] text-[#A69E90]">SGS 481項農藥把關</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Philosophy & Craft Pillars (品牌精神與選茶執著) */}
      <section id="philosophy-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
            Craftsmanship & Philosophy
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
            為什麼愛茶之人，皆留心於棲雲
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6356] leading-relaxed">
            我們只做兩件事：尋訪最純淨的台灣山林單品茶，以及打造能讓茶葉盡情舒展的陶作器具。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEA_STORIES.map((story) => (
            <div
              key={story.id}
              id={`philosophy-card-${story.id}`}
              className="bg-white p-8 rounded-lg border border-[#E5E0D6] shadow-2xs flex flex-col justify-between hover:border-[#8C5B3E]/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-sm bg-[#F4EFEB] text-[#8C5B3E] flex items-center justify-center border border-[#E5DFD5] group-hover:bg-[#8C5B3E] group-hover:text-white transition-colors">
                  {story.id === 'philosophy' ? (
                    <Leaf className="w-6 h-6" />
                  ) : story.id === 'craft' ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <ShieldCheck className="w-6 h-6" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-tc text-xl font-bold text-[#1F2421]">
                    {story.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-wider text-[#9E9688]">
                    {story.enTitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed">
                  {story.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EBE3] flex items-center justify-between">
                <span className="text-xs font-serif-tc text-[#8C5B3E] font-medium">
                  {story.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout within section */}
        <div className="mt-10 p-6 bg-[#F4EFEB] rounded-lg border border-[#E2DCCE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif-tc text-base font-bold text-[#1F2421]">
              想親手感受泥料厚薄與茶香層次？
            </h4>
            <p className="text-xs text-[#6B6356]">
              青田街實體茶舍每週開放限量預約，茶藝師一對一引導開泡與挑器。
            </p>
          </div>
          <button
            id="philosophy-cta-reserve-btn"
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs font-medium rounded transition-colors whitespace-nowrap"
          >
            填表預約品茗席位
          </button>
        </div>
      </section>

      {/* 3. Featured Products Collection (當季精選 ｜ 時令茶席) */}
      <section id="featured-collection-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5DFD5]">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
              Seasonal Highlights
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
              當季嚴選 ｜ 茶葉與器皿精選
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6356]">
              由茶務總監盲測評比，唯有風味澄澈無雜、器皿持握有度者方得入席。
            </p>
          </div>

          <button
            id="featured-view-all-btn"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C5B3E] hover:text-[#1F2421] transition-colors self-start sm:self-auto group"
          >
            <span>瀏覽全部商品型錄</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* Clear Action Callout */}
        <div className="mt-12 text-center">
          <button
            id="featured-browse-catalog-cta"
            onClick={() => onNavigate('products')}
            className="px-8 py-3 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs sm:text-sm font-medium rounded transition-colors shadow-xs"
          >
            查看更多單品高山茶、柴燒陶壺與茶盤配件
          </button>
        </div>
      </section>

      {/* 4. Brewing Wisdom (品茗指引 ｜ 沖泡四法) */}
      <section id="brewing-guide-section" className="bg-[#F2EDE5] border-y border-[#E2DCCE] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
              The Art of Brewing
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
              四時泡茶之道 ｜ 溫、器、量、時
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6356] leading-relaxed">
              好茶葉若是沖泡失準，未免辜負了山林造化。掌握基礎四法，初學者也能在家隨手沏出茶人級溫潤滋味。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BREWING_TIPS.map((tip, index) => (
              <div
                key={index}
                id={`brewing-step-${index + 1}`}
                className="bg-[#FAF8F5] p-6 rounded-lg border border-[#DDD5C7] space-y-3 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-tc text-2xl font-bold text-[#8C5B3E]/60">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] bg-[#EFE9E0] text-[#635A4D] px-2 py-0.5 rounded font-medium">
                      {tip.tempAdvice}
                    </span>
                  </div>
                  <h3 className="font-serif-tc text-base font-bold text-[#1F2421]">
                    {tip.step}
                  </h3>
                  <p className="text-xs text-[#5C5549] leading-relaxed">
                    {tip.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              id="brewing-guide-cta-btn"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs font-medium rounded transition-colors"
            >
              <span>選配合適泡茶器具（陶壺、蓋碗、茶盤）</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4.5 Latest News & Seasonal Bulletin (時令茶訊與最新消息) */}
      {latestNews.length > 0 && (
        <section id="latest-news-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E2D9] gap-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
                Seasonal Journal & Bulletin
              </span>
              <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
                最新時令茶事與門市公告
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6356]">
                夥伴隨時為您帶回高山茶園採收、柴窯陶器出窯與台北青田茶舍席次資訊。
              </p>
            </div>

            <button
              id="view-all-news-home-btn"
              onClick={() => onNavigate('news')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8C5B3E] hover:text-[#73482E] transition-colors self-start sm:self-auto"
            >
              <span>閱讀所有專文公告</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestNews.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate('news')}
                className="bg-white rounded-xl border border-[#E5E0D6] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {article.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F2EDE5]">
                      <img
                        src={article.image}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2.5 right-2.5 bg-[#1F2421]/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
                        {article.categoryLabel}
                      </span>
                    </div>
                  )}

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-[#8C8477]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {article.publishedAt}
                      </span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>

                    <h3 className="font-serif-tc text-base font-bold text-[#1F2421] group-hover:text-[#8C5B3E] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#6B6356] leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#F5F2EC] mt-2 flex items-center justify-between text-xs text-[#8C5B3E] font-medium">
                  <span>閱讀內文與預購詳情</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Authentic Tea Enthusiasts Testimonials (茶友迴響) */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
            Authentic Experiences
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1F2421]">
            愛茶之人的真實品鑑心得
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6356]">
            從晨間的第一杯烏龍，到席間的手作陶器。感謝每位與棲雲相遇的茶友。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="bg-white p-7 rounded-lg border border-[#E5E0D6] shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* 5 stars */}
                <div className="flex gap-1 text-[#8C5B3E]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#474136] leading-relaxed italic">
                  「{t.content}」
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#F0EBE3] flex items-center justify-between">
                <div>
                  <div className="font-serif-tc text-sm font-bold text-[#1F2421]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#8C8477]">{t.role}</div>
                </div>
                <div className="text-[11px] text-[#8C5B3E] font-medium text-right">
                  品鑑品項：<br />
                  <span className="text-[#3A352C] font-serif-tc">{t.purchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Big Final Call to Action Banner (線上選購與私人茶席) */}
      <section id="final-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2A312B] text-[#FAF8F5] rounded-xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl border border-[#3E4740]">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-[#D8CFBF]">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
              <span>全館單筆滿 NT$ 1,500 即享黑貓/超取免運優惠</span>
            </div>

            <h2 className="font-serif-tc text-2xl sm:text-4xl font-bold tracking-wider leading-snug">
              為日常留白，<br />
              沏一壺屬於您的靜心茶席。
            </h2>

            <p className="text-xs sm:text-sm text-[#C5BDB0] leading-relaxed">
              無論是送給重視品味的長輩夥伴，或是在工作之餘撫慰身心。棲雲備妥高山原葉、職人柴燒陶壺與原木禮盒，全心為您包裝寄送。
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="banner-cta-checkout-order"
                onClick={() => onNavigate('products')}
                className="px-8 py-3.5 bg-[#8C5B3E] hover:bg-[#A26A42] text-white text-xs sm:text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>立即挑選茶品與茶具</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="banner-cta-contact"
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF8F5] text-xs sm:text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors border border-white/20"
              >
                <span>洽詢企業客製禮盒</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
