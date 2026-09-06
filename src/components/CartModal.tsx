import React from 'react';
import { CraftItem, Language } from '../types';
import { speakText } from '../utils/speech';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CraftItem[];
  onRemoveItem: (id: string) => void;
  language: Language;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  language,
}) => {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const packaging = cartItems.length > 0 ? 120 : 0;
  const total = subtotal + packaging;

  const handleCheckout = () => {
    speakText(
      isHindi
        ? `धन्यवाद! रुपये ${total} का आर्डर सीधे शिल्पकार शांति देवी को भेज दिया गया है।`
        : `Thank you! Your order of rupees ${total} has been placed directly with Artisan Shanti Devi.`,
      language
    );
    alert(
      isHindi
        ? `आदेश सफलतापूर्वक पूरा हुआ! ₹${total} सीधे शिल्पकार के बैंक खाते में स्थानांतरित किए जाएंगे।`
        : `Order Placed Successfully! ₹${total} will be transferred directly to the artisan's verified bank account.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-[#dfe4df]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#dfe4df]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9f3c16] text-[24px]">shopping_bag</span>
            <h3 className="text-[18px] font-bold text-[#181d1a]">
              {isHindi ? 'आपकी शिल्प टोकरी' : 'Your Craft Cart'}
            </h3>
            <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">
              {cartItems.length} {isHindi ? 'वस्तुएं' : 'items'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f5f0] text-[#181d1a] flex items-center justify-center hover:bg-[#e5e9e4] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {cartItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[48px] text-[#8a726a] mb-2">remove_shopping_cart</span>
              <p className="text-[16px] font-bold text-[#181d1a]">
                {isHindi ? 'आपकी टोकरी खाली है' : 'Your craft cart is empty'}
              </p>
              <span className="text-[13px] text-[#57423b] mt-1">
                {isHindi ? 'शिल्पकार गिल्ड से प्रामाणिक हस्तशिल्प खोजें।' : 'Discover authentic handmade crafts directly from master artisans.'}
              </span>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#f0f5f0] border border-[#dfe4df]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover bg-white shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-[14px] font-bold text-[#181d1a] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[12px] text-[#57423b] truncate">
                      {item.category}
                    </span>
                    <span className="text-[14px] font-bold text-[#9f3c16] mt-0.5">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => onRemoveItem(item.id)}
                  className="w-8 h-8 rounded-full bg-white text-[#ba1a1a] flex items-center justify-center hover:bg-[#ffdad6] active:scale-90 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="p-3.5 rounded-xl bg-[#aeeecb]/40 border border-[#2c694e]/20 flex flex-col gap-1.5 mt-2">
              <div className="flex items-center justify-between text-[13px] text-[#57423b]">
                <span>Artisan Direct Subtotal</span>
                <span className="font-bold text-[#181d1a]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-[13px] text-[#57423b]">
                <span>Safe Recycled Straw Packing</span>
                <span className="font-bold text-[#181d1a]">₹{packaging}</span>
              </div>
              <div className="border-t border-[#2c694e]/20 pt-2 flex items-center justify-between text-[16px] font-bold text-[#181d1a]">
                <span>Total Direct Payable</span>
                <span className="text-[#9f3c16]">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-[11px] text-[#2c694e] font-semibold mt-0.5">
                ✓ 100% of craft amount goes directly to Artisan bank account via ONDC.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="pt-3 border-t border-[#dfe4df]">
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full h-14 rounded-full bg-[#9f3c16] hover:bg-[#bf542c] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
              <span>
                {isHindi ? `सीधा ऑर्डर दें • ₹${total.toLocaleString('en-IN')}` : `Direct Checkout • ₹${total.toLocaleString('en-IN')}`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
