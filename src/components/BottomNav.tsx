import React from 'react';
import { MainTab, Language } from '../types';

interface BottomNavProps {
  currentTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  onMicClick: () => void;
  language?: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onMicClick,
  language = 'en',
}) => {
  const isMarket = currentTab === 'market' || currentTab === 'marketplace';
  const isHindi = language === 'hi';

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f6fbf5]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(159,60,22,0.08)] border-t border-[#dfe4df]">
      <div className="h-20 max-w-md mx-auto px-2 flex items-center justify-around relative">
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[52px] px-1 py-1 transition-colors cursor-pointer group ${
            currentTab === 'home' ? 'text-[#9f3c16] font-bold' : 'text-[#57423b] hover:text-[#181d1a]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            home
          </span>
          <span className="text-[12px] leading-tight text-center mt-0.5">
            {isHindi ? 'होम' : 'Home'}
          </span>
          <span className="text-[10px] text-[#8a726a] leading-none">Dashboard</span>
        </button>

        {/* Tab 2: Products */}
        <button
          type="button"
          onClick={() => onTabChange('products')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[52px] px-1 py-1 transition-colors cursor-pointer group ${
            currentTab === 'products' ? 'text-[#9f3c16] font-bold' : 'text-[#57423b] hover:text-[#181d1a]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            inventory_2
          </span>
          <span className="text-[12px] leading-tight text-center mt-0.5">
            {isHindi ? 'कैटलॉग' : 'Products'}
          </span>
          <span className="text-[10px] text-[#8a726a] leading-none">Listing</span>
        </button>

        {/* Tab 3: Prominent Center Floating FAB - Voice Studio */}
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button
            type="button"
            aria-label="Voice Cataloging Studio"
            onClick={onMicClick}
            className="w-16 h-16 rounded-full bg-[#9f3c16] text-[#ffffff] flex items-center justify-center shadow-[0_8px_20px_-2px_rgba(159,60,22,0.45)] active:scale-95 active:bg-[#bf542c] hover:bg-[#bf542c] transition-all relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-[32px]">mic</span>
            <span className="material-symbols-outlined text-[16px] absolute top-3 right-3 text-[#ffdbcf]">add</span>
          </button>
          <span className="text-[11px] text-[#9f3c16] font-bold mt-1 text-center">
            {isHindi ? 'आवाज़ से जोड़ें' : 'Voice Studio'}
          </span>
        </div>

        {/* Tab 4: Market */}
        <button
          type="button"
          onClick={() => onTabChange('marketplace')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[52px] px-1 py-1 transition-colors cursor-pointer group ${
            isMarket ? 'text-[#9f3c16] font-bold' : 'text-[#57423b] hover:text-[#181d1a]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            storefront
          </span>
          <span className="text-[12px] leading-tight text-center mt-0.5">
            {isHindi ? 'बाज़ार' : 'Market'}
          </span>
          <span className="text-[10px] text-[#8a726a] leading-none">ONDC Direct</span>
        </button>

        {/* Tab 5: Profile */}
        <button
          type="button"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[52px] px-1 py-1 transition-colors cursor-pointer group ${
            currentTab === 'profile' ? 'text-[#9f3c16] font-bold' : 'text-[#57423b] hover:text-[#181d1a]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
            person
          </span>
          <span className="text-[12px] leading-tight text-center mt-0.5">
            {isHindi ? 'प्रोफ़ाइल' : 'Profile'}
          </span>
          <span className="text-[10px] text-[#8a726a] leading-none">Artisan ID</span>
        </button>
      </div>
    </nav>
  );
};
