import React, { useState } from 'react';
import { INITIAL_CRAFTS } from '../../data/crafts';
import { Language, CraftItem } from '../../types';
import { speakText } from '../../utils/speech';

interface MarketplaceScreenProps {
  language: Language;
  onAddToCart: (item: CraftItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  language,
  onAddToCart,
  onOpenCart,
  cartCount,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>(['craft-1']);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);

  const isHindi = language === 'hi';

  const categories = [
    { id: 'all', label: isHindi ? 'सभी शिल्प' : 'All Crafts', icon: 'auto_awesome' },
    { id: 'terracotta', label: isHindi ? 'टेराकोटा मिट्टी' : 'Terracotta Pottery', icon: 'potted_plant' },
    { id: 'handloom', label: isHindi ? 'हथकरघा और रेशम' : 'Handloom & Silk', icon: 'texture' },
    { id: 'dhokra', label: isHindi ? 'ढोकरा धातु' : 'Dhokra Brass', icon: 'stat_1' },
    { id: 'wood', label: isHindi ? 'लकड़ी की नक्काशी' : 'Wood Carving', icon: 'carpenter' },
    { id: 'jewelry', label: isHindi ? 'आदिवासी आभूषण' : 'Tribal Jewelry', icon: 'diamond' },
  ];

  const filteredCrafts = INITIAL_CRAFTS.filter(craft => {
    const matchesCategory = 
      activeCategory === 'all' || 
      (activeCategory === 'terracotta' && craft.category === 'Terracotta Pottery') ||
      (activeCategory === 'handloom' && craft.category === 'Handloom & Silk') ||
      (activeCategory === 'dhokra' && craft.category === 'Dhokra Brass') ||
      (activeCategory === 'wood' && craft.category === 'Wood Carving');

    const matchesSearch = 
      craft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      craft.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (craft.titleHi && craft.titleHi.includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddCart = (craft: CraftItem) => {
    onAddToCart(craft);
    setAddedItemIds(prev => [...prev, craft.id]);
    speakText(
      isHindi ? `${craft.title} कार्ट में जोड़ा गया` : `${craft.title} added to your cart`,
      language
    );
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== craft.id));
    }, 1800);
  };

  const handleVoiceSearch = () => {
    setIsVoiceSearching(true);
    speakText(
      isHindi ? 'बोलिए क्या ढूंढ रहे हैं? जैसे: टेराकोटा या शॉल' : 'Listening... Speak what you are looking for, like Terracotta or Pashmina',
      language
    );
    setTimeout(() => {
      setIsVoiceSearching(false);
      setSearchQuery('Terracotta');
    }, 2800);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-md mx-auto space-y-4">
      {/* Search & Delivery Header Section */}
      <section className="px-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52]">
            <span className="material-symbols-outlined text-[16px] text-[#2c694e]">public</span>
            <span className="text-[12px] tracking-tight font-bold">
              {isHindi ? 'संपूर्ण भारत और वैश्विक डिलीवरी' : 'Delivering to All India & Global'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Audio shopping guide"
              onClick={() => speakText('Welcome to Kalamitra Artisan Guild Marketplace. All crafts are 100% genuine and verified directly from studio workshops.', language)}
              className="w-8 h-8 rounded-full bg-[#e5e9e4] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
            </button>

            {/* Cart Button with Counter */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative w-9 h-9 rounded-full bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center shadow-sm cursor-pointer active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Voice & Visual Search Bar */}
        <div className="relative flex items-center w-full">
          <div className="w-full flex items-center bg-white rounded-full shadow-sm pl-4 pr-1.5 py-1.5 border border-[#dfe4df] focus-within:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-[#8a726a] text-[22px] mr-2 shrink-0">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVoiceSearching ? (isHindi ? 'सुन रहा हूँ... बोलिए...' : 'Listening... speak now...') : (isHindi ? 'हस्तशिल्प खोजें या बोलें...' : 'Search authentic handcrafted products...')}
              className="w-full bg-transparent text-[14px] text-[#181d1a] placeholder:text-[#8a726a] focus:outline-none min-w-0"
            />
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleVoiceSearch}
                aria-label="Voice Search"
                className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
                  isVoiceSearching ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-[#ffdbcf] text-[#9f3c16] hover:bg-[#9f3c16] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">mic</span>
              </button>
              <button
                type="button"
                aria-label="Camera Visual Search"
                onClick={() => speakText('Visual lens search activated. Point camera at craft item.', language)}
                className="w-9 h-9 rounded-full bg-[#e5e9e4] text-[#181d1a] flex items-center justify-center active:scale-90 transition-all hover:bg-[#dfe4df] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">photo_camera</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable Category Pills */}
      <section className="w-full">
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 h-10 rounded-full text-[13px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#9f3c16] text-white'
                  : 'bg-white text-[#181d1a] hover:bg-[#ebefea] border border-[#dfe4df]/60'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Artisan of the Week Banner */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#ebefea] p-4 shadow-md flex items-center gap-3.5 border border-[#dfe4df]">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#ffdbcf]/40 pointer-events-none blur-xl" />

          {/* Portrait */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-md bg-[#dfe4df] ring-2 ring-[#2c694e]/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeBEEvq2MR7mNkbf4HWtXE2KyQvCR6NSnskjOGloLCWydy7HhF6QynL6u3-487w2ZfMb8FKTHiDCiCNCtUPVGw2p4oRT5Lyphtw0Y5tUQ9xAjrbxwWLHy8oJoLcOmvzogsefQeym8fcuXL-2UxkHuiF2k61L8N3CNRvGrcwptNGSHjSIoAJcoNzUnYBEEZTX_Na7tWT3lxN8YGUmrbNIOnc7-huxk7cseYHPab5rHaYZ_aFjpDrtNz"
                alt="Shanti Devi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#2c694e] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[14px]">verified</span>
            </div>
          </div>

          {/* Banner Text */}
          <div className="flex flex-col min-w-0 z-10">
            <div className="inline-flex items-center gap-1 text-[#9f3c16] mb-0.5">
              <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
              <span className="text-[11px] uppercase tracking-wider font-bold">
                {isHindi ? 'सप्ताह की विशेष शिल्पकार' : 'Featured Artisan of the Week'}
              </span>
            </div>
            <h2 className="text-[16px] font-bold text-[#181d1a] truncate">
              {isHindi ? 'मास्टर शिल्पकार शांति देवी' : 'Master Craftswoman Shanti Devi'}
            </h2>
            <p className="text-[12px] text-[#57423b] mt-0.5 line-clamp-2">
              Kutch Heritage Guild • Explore 12 authentic handmade vessels
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('terracotta')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#9f3c16] text-white text-[12px] font-bold shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <span>{isHindi ? 'संग्रह देखें' : 'Explore Collection'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                type="button"
                aria-label="Listen to Artisan Story"
                onClick={() => speakText('Master Craftswoman Shanti Devi has spent 24 years preserving wheel-thrown terracotta pottery in Kutch, Gujarat.', language)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white text-[#181d1a] text-[11px] font-bold shadow-sm active:scale-95 transition-transform cursor-pointer border border-[#dfe4df]"
              >
                <span className="material-symbols-outlined text-[#9f3c16] text-[16px]">play_circle</span>
                <span>Listen</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Trust Assurance Badge */}
      <section className="px-4">
        <div className="rounded-xl bg-[#aeeecb]/60 p-3 flex items-center gap-3 shadow-sm border border-[#2c694e]/20">
          <div className="w-10 h-10 rounded-full bg-[#2c694e] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">handshake</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-bold text-[#316e52]">
                {isHindi ? '१००% सीधा शिल्पकार भुगतान' : '100% Direct Artisan Payout'}
              </span>
              <span className="material-symbols-outlined text-[#2c694e] text-[15px]">verified_user</span>
            </div>
            <p className="text-[12px] text-[#181d1a] leading-tight mt-0.5">
              {isHindi
                ? 'आपकी खरीद का १००% सीधे बिना किसी बिचौलिये के शिल्पकार के खाते में जाता है।'
                : '100% of purchase goes directly to verified artisan bank accounts with zero intermediary cuts.'}
            </p>
          </div>
        </div>
      </section>

      {/* Curated Craft Product Grid Section */}
      <section className="px-4 flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-[18px] text-[#181d1a] font-bold flex items-center gap-1.5">
              <span>{isHindi ? 'शिल्पकार गिल्ड संग्रह' : 'Curated Craft Guild'}</span>
              <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">local_florist</span>
            </h3>
            <span className="text-[12px] text-[#57423b]">Direct from studio looms &amp; workshops</span>
          </div>
          <span className="text-[12px] text-[#2c694e] font-bold px-2.5 py-1 rounded-full bg-[#aeeecb]">
            {filteredCrafts.length} {isHindi ? 'शिल्प उपलब्ध' : 'Curated Gems'}
          </span>
        </div>

        {/* 2 Column Responsive Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredCrafts.map((craft) => {
            const isFav = wishlist.includes(craft.id);
            const isAdded = addedItemIds.includes(craft.id);

            return (
              <article
                key={craft.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group border border-[#dfe4df]"
              >
                <div>
                  {/* Media */}
                  <div className="relative w-full aspect-square bg-[#ebefea] overflow-hidden">
                    <img
                      src={craft.image}
                      alt={craft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#2c694e] text-[11px] font-bold shadow-sm">
                        <span className="material-symbols-outlined text-[13px]">verified</span>
                        <span>{craft.category === 'Handloom & Silk' ? 'GI Tagged' : craft.category === 'Dhokra Brass' ? '4000 yr Art' : craft.category === 'Wood Carving' ? 'Pure Wood' : 'Direct'}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Add to Wishlist"
                      onClick={(e) => toggleWishlist(craft.id, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-75 transition-all cursor-pointer"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${isFav ? 'text-[#9f3c16]' : 'text-[#8a726a]'}`}
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-3 flex flex-col">
                    <div className="flex items-center gap-1 text-[#7b542b] mb-1">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      <span className="text-[12px] font-bold">{craft.rating}</span>
                      <span className="text-[12px] text-[#8a726a]">({craft.reviewCount})</span>
                    </div>
                    <h4 className="text-[14px] font-bold text-[#181d1a] line-clamp-1 leading-snug">
                      {isHindi && craft.titleHi ? craft.titleHi : craft.title}
                    </h4>
                    <p className="text-[12px] text-[#57423b] truncate mt-0.5">
                      {craft.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="px-3 pb-3 pt-0 flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex flex-col">
                      {craft.originalPrice && (
                        <span className="text-[11px] text-[#8a726a] line-through leading-none">
                          ₹{craft.originalPrice}
                        </span>
                      )}
                      <span className="text-[16px] text-[#181d1a] font-bold">
                        ₹{craft.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#2c694e] font-bold bg-[#aeeecb] px-1.5 py-0.5 rounded">
                      Fair Price
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddCart(craft)}
                    className={`w-full h-10 rounded-full font-bold text-[13px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#2c694e] text-white'
                        : 'bg-[#9f3c16] hover:bg-[#bf542c] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {isAdded ? 'done' : 'shopping_bag'}
                    </span>
                    <span>{isAdded ? (isHindi ? 'जोड़ा गया!' : 'Added!') : (isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart')}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Artisan Voice Support Floating Ribbon */}
      <section className="px-4 pt-2">
        <div className="rounded-xl bg-[#ebefea] p-3.5 flex items-center justify-between shadow-sm border border-[#dfe4df]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">graphic_eq</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-[#181d1a] truncate">
                {isHindi ? 'माप या प्रामाणिकता के बारे में सवाल?' : 'Confused about size or authenticity?'}
              </span>
              <span className="text-[12px] text-[#57423b] truncate">
                {isHindi ? 'शिल्पकार गिल्ड गाइड से सीधे बात करें' : 'Talk directly to Artisan Guild Guides'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => speakText('Connecting you to Bhuj Artisan Guild Assistant...', language)}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#2c694e] text-white text-[13px] font-bold active:scale-95 transition-transform cursor-pointer"
          >
            {isHindi ? 'पूछें' : 'Ask Guide'}
          </button>
        </div>
      </section>
    </div>
  );
};
