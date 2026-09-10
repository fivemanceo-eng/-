import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1500;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#E2DDD5] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5DFD5] bg-[#F4EFEB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C5B3E]" />
            <h2 className="font-serif-tc text-lg font-bold text-[#1F2421]">
              您的品茗茶席清單
            </h2>
            <span className="text-xs bg-[#EAE3D9] text-[#595144] px-2 py-0.5 rounded-full font-medium">
              {items.reduce((sum, item) => sum + item.quantity, 0)} 件
            </span>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 text-[#6B6356] hover:text-[#1F2421] hover:bg-[#E5DFD5] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#EFE9E0] px-5 py-3 border-b border-[#E0D7CB]">
          <div className="flex items-center justify-between text-xs text-[#524B40] mb-1.5 font-medium">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#8C5B3E]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#385E3E] font-bold">恭喜！已達成「全館免運」優惠門檻</span>
              ) : (
                <span>
                  再選購 <strong className="text-[#8C5B3E]">NT$ {remainingForFreeShipping.toLocaleString()}</strong> 即享免運
                </span>
              )}
            </div>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#DCD4C7] h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeShipping === 0 ? 'bg-[#385E3E]' : 'bg-[#8C5B3E]'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE9E0] flex items-center justify-center text-[#8C5B3E]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <h3 className="font-serif-tc text-lg font-semibold text-[#1F2421]">
                  購物清單目前尚無品項
                </h3>
                <p className="text-xs text-[#7A7264] mt-1">
                  探索產地手採高山茶與職人柴燒茶器，為生活添一席寧靜。
                </p>
              </div>
              <button
                id="cart-empty-browse-btn"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white text-xs font-medium rounded transition-colors"
              >
                前往選購茶品與器皿
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                id={`cart-item-${item.product.id}`}
                className="flex gap-3 bg-white p-3 rounded-lg border border-[#E5E0D6] shadow-2xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded bg-[#F0EAE1] overflow-hidden shrink-0 border border-[#E8E2D9]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-tc text-sm font-bold text-[#1F2421] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        id={`remove-cart-item-${item.product.id}`}
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#968E80] hover:text-[#B91C1C] transition-colors p-1"
                        title="移除商品"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#8C8375] mt-0.5">
                      {item.product.spec}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F5F2ED]">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#D9D0C3] rounded bg-[#FAF8F5]">
                      <button
                        id={`cart-decrease-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#5E574B] hover:bg-[#EAE4DC]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#1F2421]">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-increase-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#5E574B] hover:bg-[#EAE4DC]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-serif-tc font-bold text-[#1F2421]">
                        NT$ {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E5DFD5] bg-[#F4EFEB] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C5549]">
              <div className="flex justify-between">
                <span>商品合計</span>
                <span className="font-medium text-[#1F2421]">NT$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>預估運費</span>
                <span>
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#385E3E] font-medium">免運費</span>
                  ) : (
                    '滿 NT$ 1,500 即享免運'
                  )}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DFD8CC] flex items-baseline justify-between">
              <span className="font-serif-tc font-bold text-sm text-[#1F2421]">應付總額</span>
              <span className="font-serif-tc text-xl font-bold text-[#8C5B3E]">
                NT$ {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <button
                id="cart-proceed-checkout-btn"
                onClick={onCheckout}
                className="w-full py-3 bg-[#8C5B3E] hover:bg-[#73482E] text-white text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>填寫購物訂單與結帳</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="cart-continue-shopping-btn"
                onClick={onClose}
                className="w-full py-2 text-xs text-[#6F675A] hover:text-[#1F2421] text-center"
              >
                繼續挑選其他茶品
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
