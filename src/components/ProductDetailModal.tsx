import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Thermometer, Clock, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="product-detail-card"
        className="bg-[#FAF8F5] w-full max-w-3xl rounded-xl shadow-2xl border border-[#D9D0C3] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-3.5 border-b border-[#E5DFD5] bg-[#F2EDE5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#2A312B] text-white px-2 py-0.5 rounded-xs font-medium">
              {product.categoryLabel}
            </span>
            <span className="text-xs text-[#736B5E]">{product.spec}</span>
          </div>
          <button
            id="close-product-detail-btn"
            onClick={onClose}
            className="p-1.5 text-[#6F675A] hover:text-[#1F2421] hover:bg-[#E2DDD5] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Column */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E2DDD5] bg-[#F0EAE1] relative shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#2A312B]/90 text-white text-xs px-2.5 py-1 rounded-xs tracking-wider">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Assurance Badges */}
              <div className="bg-[#F4EFEB] p-3 rounded-lg border border-[#E5E0D6] space-y-1.5 text-xs text-[#595247]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C5B3E] shrink-0" />
                  <span>SGS 481 項農藥殘留檢驗「零檢出」保證</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C5B3E] shrink-0" />
                  <span>100% 台灣在地原葉產地直送，絕無混充</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-4">
              <div>
                <h2 className="font-serif-tc text-2xl font-bold text-[#1F2421] leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs uppercase tracking-widest text-[#8A8173] mt-0.5 font-light">
                  {product.enName}
                </p>
                <p className="text-sm text-[#8C5B3E] font-serif-tc mt-2 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Pricing */}
              <div className="p-3 bg-[#F2EDE5] rounded-lg border border-[#E0D7CC] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#736A5D] mr-1">品味鑑賞價</span>
                  <span className="text-xs text-[#736A5D]">NT$ </span>
                  <span className="font-serif-tc text-2xl font-bold text-[#1F2421]">
                    {product.price.toLocaleString()}
                  </span>
                </div>
                {product.originalPrice && (
                  <span className="text-xs text-[#9E9587] line-through">
                    市價 NT$ {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Origin & Elevation */}
              {(product.origin || product.elevation) && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.origin && (
                    <div className="bg-white p-2.5 rounded border border-[#E5DFD5]">
                      <span className="text-[#877E71] block text-[10px]">產區來源</span>
                      <span className="font-medium text-[#292D2A]">{product.origin}</span>
                    </div>
                  )}
                  {product.elevation && (
                    <div className="bg-white p-2.5 rounded border border-[#E5DFD5]">
                      <span className="text-[#877E71] block text-[10px]">種植海拔</span>
                      <span className="font-medium text-[#292D2A]">{product.elevation}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Fermentation & Roasting Scale */}
              {product.fermentation !== undefined && product.roasting !== undefined && (
                <div className="space-y-2 p-3 bg-white rounded-lg border border-[#E5DFD5] text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#786F62]">發酵度</span>
                      <span className="font-semibold text-[#292D2A]">{product.fermentation}%</span>
                    </div>
                    <div className="w-full bg-[#EAE4DC] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#5C6E5A] h-full rounded-full"
                        style={{ width: `${product.fermentation}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#786F62]">焙火度</span>
                      <span className="font-semibold text-[#292D2A]">{product.roasting}%</span>
                    </div>
                    <div className="w-full bg-[#EAE4DC] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8C5B3E] h-full rounded-full"
                        style={{ width: `${product.roasting}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flavor notes */}
              {product.flavorNotes && (
                <div>
                  <span className="text-xs text-[#786F62] block mb-1.5 font-medium">茶香與風味記號：</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#EFEAE2] text-[#423C32] px-2.5 py-1 rounded-sm border border-[#DDD5C8]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description Text */}
          <div className="space-y-2 border-t border-[#E5DFD5] pt-4">
            <h4 className="font-serif-tc text-base font-bold text-[#1F2421]">品評簡述</h4>
            <p className="text-sm text-[#4A443A] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Brewing Guide */}
          {product.brewingGuide && (
            <div className="border-t border-[#E5DFD5] pt-4 space-y-3">
              <h4 className="font-serif-tc text-base font-bold text-[#1F2421] flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#8C5B3E]" /> 棲雲侍茶指南（沖泡心法）
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#F5F1EB] p-3 rounded border border-[#E2DCCE]">
                  <span className="text-[10px] text-[#786F62] block">適泡水溫</span>
                  <span className="text-xs font-semibold text-[#1F2421] mt-0.5 block">
                    {product.brewingGuide.waterTemp}
                  </span>
                </div>
                <div className="bg-[#F5F1EB] p-3 rounded border border-[#E2DCCE]">
                  <span className="text-[10px] text-[#786F62] block">建議茶水比</span>
                  <span className="text-xs font-semibold text-[#1F2421] mt-0.5 block">
                    {product.brewingGuide.teaRatio}
                  </span>
                </div>
                <div className="bg-[#F5F1EB] p-3 rounded border border-[#E2DCCE]">
                  <span className="text-[10px] text-[#786F62] block">浸泡時間</span>
                  <span className="text-xs font-semibold text-[#1F2421] mt-0.5 block">
                    {product.brewingGuide.steepTime}
                  </span>
                </div>
                <div className="bg-[#F5F1EB] p-3 rounded border border-[#E2DCCE]">
                  <span className="text-[10px] text-[#786F62] block">推薦茶器</span>
                  <span className="text-xs font-semibold text-[#1F2421] mt-0.5 block truncate" title={product.brewingGuide.recommendedVessel}>
                    {product.brewingGuide.recommendedVessel}
                  </span>
                </div>
              </div>
              <div className="text-xs text-[#6F675B] bg-[#EFE9E0] p-2.5 rounded">
                <span className="font-semibold text-[#8C5B3E]">風味焦點：</span> {product.brewingGuide.flavorHighlight}
              </div>
            </div>
          )}

          {/* Craft Story */}
          {product.craftStory && (
            <div className="border-t border-[#E5DFD5] pt-4 space-y-1.5">
              <h4 className="font-serif-tc text-base font-bold text-[#1F2421]">職人手作工藝</h4>
              <p className="text-xs text-[#575045] leading-relaxed">
                {product.craftStory}
              </p>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E5DFD5] bg-[#F2EDE5] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs text-[#635B4E] font-medium">訂購數量：</span>
            <div className="flex items-center border border-[#D1C8B9] rounded bg-white overflow-hidden">
              <button
                id="decrease-qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm text-[#4A443A] hover:bg-[#F2EDE5] transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-sm font-bold text-[#1F2421] min-w-8 text-center">
                {quantity}
              </span>
              <button
                id="increase-qty-btn"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-sm text-[#4A443A] hover:bg-[#F2EDE5] transition-colors"
              >
                +
              </button>
            </div>
            <div className="text-xs text-[#8A8173] sm:ml-2">
              小計 NT$ {(product.price * quantity).toLocaleString()}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className={`flex-1 sm:flex-initial px-4 py-2.5 text-xs sm:text-sm font-medium rounded flex items-center justify-center gap-1.5 border border-[#2A312B] transition-all ${
                justAdded
                  ? 'bg-[#3D5A45] text-white border-[#3D5A45]'
                  : 'bg-white text-[#2A312B] hover:bg-[#FAF8F5]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" /> 已加入購物車
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> 加入購物車
                </>
              )}
            </button>
            <button
              id="modal-buy-now-btn"
              onClick={handleBuy}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-xs sm:text-sm font-medium rounded flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>立即結帳購買</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
