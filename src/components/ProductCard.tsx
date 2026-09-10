import React from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  justAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  justAdded = false,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-lg border border-[#E5E0D6] overflow-hidden flex flex-col hover:border-[#8C5B3E]/50 hover:shadow-lg transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-[#F4EFEB] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#2A312B]/90 backdrop-blur-xs text-[#EFEBE4] text-[11px] font-medium tracking-wider px-2.5 py-1 rounded-xs">
            {product.badge}
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#5C564B] text-[11px] px-2 py-0.5 rounded-xs border border-[#E0D8CB]">
          {product.categoryLabel}
        </div>

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="px-3.5 py-2 bg-white text-[#1F2421] text-xs font-medium rounded shadow-md hover:bg-[#FAF8F5] flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-[#8C5B3E]" /> 鑑賞詳情
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Spec & Origin */}
          <div className="text-[11px] text-[#857C6E] flex items-center justify-between gap-2 mb-1.5">
            <span>{product.spec}</span>
            {product.origin && (
              <span className="truncate max-w-[120px]">{product.origin}</span>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-serif-tc text-base sm:text-lg font-bold text-[#1F2421] group-hover:text-[#8C5B3E] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-[11px] tracking-wide text-[#948B7D] uppercase font-light mt-0.5 mb-2 line-clamp-1">
            {product.enName}
          </p>

          {/* Subtitle description */}
          <p className="text-xs text-[#5C564B] line-clamp-2 leading-relaxed mb-3">
            {product.subtitle}
          </p>

          {/* Flavor tags */}
          {product.flavorNotes && product.flavorNotes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.flavorNotes.slice(0, 3).map((note, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-[#F7F4EE] text-[#544E44] px-2 py-0.5 rounded border border-[#E8E2D8]"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA Actions */}
        <div className="pt-3 border-t border-[#F0EBE3] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-[#7A7264]">NT$</span>
              <span className="font-serif-tc text-lg sm:text-xl font-bold text-[#1F2421]">
                {product.price.toLocaleString()}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-[11px] text-[#A69E91] line-through">
                NT$ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`px-3.5 py-2 text-xs font-medium rounded flex items-center gap-1.5 transition-all active:scale-95 ${
              justAdded
                ? 'bg-[#3D5A45] text-white'
                : product.inStock
                ? 'bg-[#2A312B] text-white hover:bg-[#8C5B3E]'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> 已加入
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> 加入購物車
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
