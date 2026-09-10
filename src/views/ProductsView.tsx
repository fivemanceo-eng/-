import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, Sparkles, Check, RefreshCw } from 'lucide-react';
import { Product, PageId } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ProductsViewProps {
  onNavigate: (page: PageId) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  initialCategory?: string;
  products?: Product[];
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onNavigate,
  onAddToCart,
  onViewDetails,
  initialCategory = 'all',
  products,
}) => {
  const allProducts = products && products.length > 0 ? products : PRODUCTS;
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  const categories = [
    { id: 'all', label: '全部商品', count: allProducts.length },
    { id: 'tea', label: '嚴選單品茶', count: allProducts.filter((p) => p.category === 'tea').length },
    { id: 'teaware', label: '職人手作茶具', count: allProducts.filter((p) => p.category === 'teaware').length },
    { id: 'gift', label: '典藏茶席禮盒', count: allProducts.filter((p) => p.category === 'gift').length },
  ];

  const popularTags = ['高山冷礦氣', '幽雅蘭花', '龍眼木炭香', '天然肉桂', '柴窯手拉坯', '宋代汝窯開片'];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag !== 'all' && !item.flavorNotes.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchNotes = item.flavorNotes.some((n) => n.toLowerCase().includes(query));
        const matchOrigin = item.origin ? item.origin.toLowerCase().includes(query) : false;
        if (!matchName && !matchDesc && !matchNotes && !matchOrigin) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // Default recommended
    });
  }, [allProducts, selectedCategory, selectedTag, searchQuery, sortBy]);

  return (
    <div id="products-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-[#8C5B3E] uppercase block">
          Tea & Teaware Catalog
        </span>
        <h1 className="font-serif-tc text-3xl sm:text-4xl font-bold text-[#1F2421] leading-tight">
          茶品與器皿型錄鑑賞
        </h1>
        <p className="text-xs sm:text-sm text-[#61584C] leading-relaxed">
          以產地直訪嚴選台灣高山單品原葉，搭配在地陶藝與金工職人親手鍛造之器。
          每一件茶品均通過 SGS 481 項無農藥殘留檢驗，讓每一次沖泡皆安心醇美。
        </p>
      </div>

      {/* Category Tabs & Filter Toolbar */}
      <div className="space-y-4 bg-white p-4 sm:p-6 rounded-xl border border-[#E5E0D6] shadow-2xs">
        {/* Main Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EFEBE4] pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-btn-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedTag('all');
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#2A312B] text-white shadow-xs'
                  : 'bg-[#F5F2EC] text-[#5C5549] hover:bg-[#EAE4DC] hover:text-[#1F2421]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-[#3E4740] text-[#EFEBE4]' : 'bg-[#E5DFD5] text-[#736B5E]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search, Tag filter, and Sort Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-1">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C8477] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="product-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋茶品名稱、產地、風味（如：蘭花香、梨山、柴燒）..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded text-xs text-[#1F2421] placeholder-[#9E9688] focus:outline-none focus:border-[#8C5B3E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9E9688] hover:text-[#1F2421]"
              >
                清除
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-[#635B4E]">
            <span className="shrink-0 font-medium">排序方式：</span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F5] border border-[#DDD5C7] rounded px-3 py-1.5 text-xs text-[#1F2421] focus:outline-none focus:border-[#8C5B3E]"
            >
              <option value="recommended">店長品鑑推薦</option>
              <option value="price-asc">價格：由低至高</option>
              <option value="price-desc">價格：由高至低</option>
            </select>
          </div>
        </div>

        {/* Popular Flavor Tag Quick Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-[#786F62] flex items-center gap-1 font-medium">
            <Filter className="w-3 h-3 text-[#8C5B3E]" /> 風味與工藝標記：
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              selectedTag === 'all'
                ? 'bg-[#8C5B3E] text-white'
                : 'bg-[#F2EDE5] text-[#5E5648] hover:bg-[#E8E2D7]'
            }`}
          >
            全部標記
          </button>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? 'all' : tag)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                selectedTag === tag
                  ? 'bg-[#8C5B3E] text-white'
                  : 'bg-[#F2EDE5] text-[#5E5648] hover:bg-[#E8E2D7]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filters */}
      <div className="flex items-center justify-between text-xs text-[#6E6659]">
        <div>
          共鑑賞到 <strong className="text-[#1F2421] font-serif-tc text-sm">{filteredProducts.length}</strong> 件當季茶品與器皿
        </div>
        {(searchQuery || selectedTag !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="flex items-center gap-1 text-[#8C5B3E] hover:underline"
          >
            <RefreshCw className="w-3 h-3" /> 重置所有篩選條件
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[#E5E0D6] text-center space-y-4">
          <p className="font-serif-tc text-lg text-[#1F2421]">
            查無符合條件的茶品或茶具
          </p>
          <p className="text-xs text-[#7A7264]">
            建議調整關鍵字或嘗試清除篩選條件，細細瀏覽棲雲的四季典藏。
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs rounded transition-colors"
          >
            返回全部商品
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

      {/* Tea Knowledge & Craft Highlight Box */}
      <div className="bg-[#F2EDE5] rounded-xl p-8 border border-[#E0D7CC] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#8C5B3E] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> 棲雲選品原則
          </div>
          <h3 className="font-serif-tc text-2xl font-bold text-[#1F2421]">
            堅持產地單一茶菁，<br />不混充、不施香精。
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed">
            我們親自走訪台灣各大著名產茶山頭：梨山、阿里山、木柵、日月潭與坪林。
            堅持與尊重土地的茶農合作，從採茶天候、發酵控制到古法炭焙皆嚴格記錄。
            茶具部分則由台灣在地陶藝師手作，兼具機能美感與持握溫度。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#DDD5C7] space-y-4">
          <h4 className="font-serif-tc text-base font-bold text-[#1F2421]">
            選購茶品遇到疑問？需要專屬建議？
          </h4>
          <p className="text-xs text-[#6B6356] leading-relaxed">
            無論是初次習茶想找入門蓋碗，或是尋覓適合長輩送禮的陳年炭焙鐵觀音，我們都非常樂意為您提供客製化推薦。
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              id="catalog-consult-contact-btn"
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs font-medium rounded transition-colors"
            >
              線上洽詢茶務專員
            </button>
            <button
              id="catalog-goto-checkout-btn"
              onClick={() => onNavigate('checkout')}
              className="px-5 py-2.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs font-medium rounded transition-colors flex items-center gap-1.5"
            >
              <span>查看購物車並結帳</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
