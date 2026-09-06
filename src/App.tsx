import React, { useState } from 'react';
import { MainTab, Language, CraftItem } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { VoiceOverlay } from './components/VoiceOverlay';
import { CartModal } from './components/CartModal';

import { HomeScreen } from './components/screens/HomeScreen';
import { VoiceStudioScreen } from './components/screens/VoiceStudioScreen';
import { ExtractedCatalogScreen } from './components/screens/ExtractedCatalogScreen';
import { PhotoEnhancerScreen } from './components/screens/PhotoEnhancerScreen';
import { FairPricingScreen } from './components/screens/FairPricingScreen';
import { ReviewPublishScreen } from './components/screens/ReviewPublishScreen';
import { MarketplaceScreen } from './components/screens/MarketplaceScreen';
import { ArtisanProfileScreen } from './components/screens/ArtisanProfileScreen';
import { INITIAL_CRAFTS } from './data/crafts';
import { speakText } from './utils/speech';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CraftItem[]>([INITIAL_CRAFTS[0]]);
  const [selectedPrice, setSelectedPrice] = useState<number>(1850);
  const [notificationCount, setNotificationCount] = useState<number>(2);

  const handleStartVoiceCatalog = () => {
    setCurrentTab('voice-studio');
    speakText(
      language === 'hi'
        ? 'कैटलॉग स्टूडियो में आपका स्वागत है। अपने शिल्प के बारे में खुलकर बताएं।'
        : 'Welcome to Kalamitra Voice Studio. Speak naturally about your craft.',
      language
    );
  };

  const handleAddToCart = (item: CraftItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f6fbf5] text-[#181d1a] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col items-center">
      {/* Container max-width to give a premium mobile-first app shell on desktop and native feel on mobile */}
      <div className="w-full max-w-md min-h-screen bg-[#f6fbf5] flex flex-col relative shadow-2xl">
        {/* Global App Header */}
        <Header
          language={language}
          onLanguageChange={(lang) => {
            setLanguage(lang);
            speakText(
              lang === 'hi' 
                ? 'भाषा बदलकर हिन्दी कर दी गई है।' 
                : lang === 'gu'
                ? 'ભાષા ગુજરાતીમાં બદલાઈ ગઈ છે.'
                : 'Language set to English.',
              lang
            );
          }}
          notificationCount={notificationCount}
          onOpenNotifications={() => {
            setNotificationCount(0);
            speakText(
              language === 'hi'
                ? 'आपके पास २ नए अपडेट हैं: ओ एन डी सी पर आपकी लिस्टिंग सक्रिय है और खरीदार ने पूछताछ की है।'
                : 'You have 2 updates: Your ONDC listing is active, and a buyer inquired about custom sizing.',
              language
            );
          }}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1 w-full flex flex-col">
          {currentTab === 'home' && (
            <HomeScreen
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onStartVoiceCatalog={handleStartVoiceCatalog}
              onStartVoiceStudio={handleStartVoiceCatalog}
              onOpenVoiceOverlay={() => setIsVoiceOverlayOpen(true)}
              onViewAllCrafts={() => setCurrentTab('products')}
              onSelectCraft={(_craftId) => setCurrentTab('review-publish')}
            />
          )}

          {currentTab === 'voice-studio' && (
            <VoiceStudioScreen
              language={language}
              onGenerateCatalog={() => {
                setCurrentTab('extracted-catalog');
                speakText(
                  language === 'hi'
                    ? 'AI ने आपके विवरण निकाल लिए हैं। कृपया जांचें।'
                    : 'AI has extracted your craft specifications. Please review the details.',
                  language
                );
              }}
              onCancel={() => setCurrentTab('home')}
            />
          )}

          {currentTab === 'extracted-catalog' && (
            <ExtractedCatalogScreen
              language={language}
              onProceedToPhoto={() => {
                setCurrentTab('photo-enhancer');
                speakText(
                  language === 'hi'
                    ? 'फोटो संवर्धन स्टूडियो में आपका स्वागत है।'
                    : 'Welcome to AI Studio Photography Enhancer.',
                  language
                );
              }}
              onSaveDraft={() => {
                speakText(
                  language === 'hi' ? 'कैटलॉग ड्राफ्ट सहेज लिया गया।' : 'Catalog draft saved successfully.',
                  language
                );
                setCurrentTab('home');
              }}
            />
          )}

          {currentTab === 'photo-enhancer' && (
            <PhotoEnhancerScreen
              language={language}
              onContinue={() => {
                setCurrentTab('fair-pricing');
                speakText(
                  language === 'hi'
                    ? 'उचित मूल्य सलाहकार में आपका स्वागत है।'
                    : 'Welcome to Fair Price Advisory.',
                  language
                );
              }}
              onRetake={() => {
                speakText(
                  language === 'hi'
                    ? 'कैमरा खोल रहा हूँ। वस्तु को अच्छी रोशनी में रखें।'
                    : 'Opening camera. Ensure the craft is in clear lighting.',
                  language
                );
              }}
            />
          )}

          {currentTab === 'fair-pricing' && (
            <FairPricingScreen
              language={language}
              onConfirmPrice={(price) => {
                setSelectedPrice(price);
                setCurrentTab('review-publish');
                speakText(
                  language === 'hi'
                    ? `मूल्य ₹${price} तय किया गया। अब समीक्षा करें।`
                    : `Price set to ₹${price}. Ready for final review.`,
                  language
                );
              }}
              onSetCustomPrice={() => {
                const custom = prompt(
                  language === 'hi' ? 'कस्टम मूल्य दर्ज करें (₹):' : 'Enter custom price (₹):',
                  '1850'
                );
                if (custom && !isNaN(Number(custom))) {
                  setSelectedPrice(Number(custom));
                  setCurrentTab('review-publish');
                }
              }}
            />
          )}

          {currentTab === 'review-publish' && (
            <ReviewPublishScreen
              language={language}
              selectedPrice={selectedPrice}
              onPublishSuccess={() => {
                setCurrentTab('marketplace');
              }}
              onEditWithVoice={() => {
                setCurrentTab('voice-studio');
              }}
            />
          )}

          {currentTab === 'products' && (
            <div className="flex flex-col w-full pb-28 pt-2 max-w-md mx-auto px-4">
              <div className="flex items-center justify-between my-2">
                <div>
                  <h2 className="text-[22px] font-bold text-[#181d1a]">
                    {language === 'hi' ? 'शिल्प सूची और कैटलॉग' : 'Artisan Catalog'}
                  </h2>
                  <p className="text-[13px] text-[#57423b]">
                    {language === 'hi' ? 'आपके द्वारा बनाए गए सभी हस्तशिल्प' : 'All handcrafted items published across ONDC'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleStartVoiceCatalog}
                  className="px-3.5 py-1.5 rounded-full bg-[#9f3c16] text-white text-[13px] font-bold shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>{language === 'hi' ? 'नया जोड़ें' : 'Add Item'}</span>
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {INITIAL_CRAFTS.map((craft) => (
                  <div
                    key={craft.id}
                    className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dfe4df] flex items-center gap-3.5"
                  >
                    <img
                      src={craft.image}
                      alt={craft.title}
                      className="w-20 h-20 rounded-xl object-cover bg-[#ebefea] shrink-0"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                          ONDC Active
                        </span>
                        <span className="text-[11px] text-[#8a726a]">{craft.location}</span>
                      </div>
                      <h3 className="text-[15px] font-bold text-[#181d1a] truncate mt-1">
                        {craft.title}
                      </h3>
                      <span className="text-[12px] text-[#57423b] truncate">
                        {craft.category}
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[16px] font-bold text-[#9f3c16]">
                          ₹{craft.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => speakText(`${craft.title}. Price ₹${craft.price}. Active on ONDC Network.`, language)}
                          className="w-8 h-8 rounded-full bg-[#f0f5f0] text-[#181d1a] flex items-center justify-center hover:bg-[#e5e9e4] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">volume_up</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'marketplace' && (
            <MarketplaceScreen
              language={language}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={cartItems.length}
            />
          )}

          {currentTab === 'profile' && (
            <ArtisanProfileScreen
              language={language}
              onAddNewCraft={handleStartVoiceCatalog}
            />
          )}
        </main>

        {/* Global Bottom Navigation Bar */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
          onMicClick={() => setIsVoiceOverlayOpen(true)}
          language={language}
        />

        {/* Global Voice Assistant Overlay */}
        <VoiceOverlay
          isOpen={isVoiceOverlayOpen}
          onClose={() => setIsVoiceOverlayOpen(false)}
          language={language}
          onAction={(action) => {
            if (action === 'new-craft') {
              handleStartVoiceCatalog();
            } else if (action === 'pricing') {
              setCurrentTab('fair-pricing');
            } else if (action === 'orders') {
              setCurrentTab('profile');
            } else if (action === 'market') {
              setCurrentTab('marketplace');
            }
          }}
        />

        {/* Shopping Cart Drawer / Modal */}
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveFromCart}
          language={language}
        />
      </div>
    </div>
  );
}
