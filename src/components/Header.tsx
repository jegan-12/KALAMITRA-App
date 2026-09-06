import React, { useState } from 'react';
import { Language, MainTab } from '../types';
import { ARTISAN_PROFILE, LOGO_URL } from '../data/crafts';
import { speakText } from '../utils/speech';

interface HeaderProps {
  currentTab: MainTab;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTabChange: (tab: MainTab) => void;
  subTitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  language,
  onLanguageChange,
  onTabChange,
  subTitle,
  showBack = false,
  onBack,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const getLangName = (l: Language) => {
    switch (l) {
      case 'en': return 'English';
      case 'hi': return 'हिन्दी';
      case 'gu': return 'ગુજરાતી';
    }
  };

  const handleProfileClick = () => {
    onTabChange('profile');
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f6fbf5]/90 backdrop-blur-xl shadow-[0_2px_12px_rgba(159,60,22,0.06)] border-b border-[#dfe4df]/50">
      <div className="h-20 max-w-md mx-auto px-4 flex items-center justify-between gap-3">
        {/* Left Section: Logo or Back Button */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              type="button"
              aria-label="Go Back"
              onClick={onBack}
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#181d1a] hover:bg-[#ebefea] active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <img
            src={LOGO_URL}
            alt="Kalamitra Brand Logo"
            className="h-8 w-auto object-contain shrink-0 cursor-pointer"
            onClick={() => onTabChange('home')}
          />

          <div className="flex flex-col min-w-0">
            {showBack ? (
              <>
                <h1 className="text-[18px] font-semibold text-[#181d1a] truncate leading-tight">
                  {currentTab === 'add-product' ? 'Add Product' : 'Kalamitra'}
                </h1>
                <span className="text-[12px] text-[#2c694e] font-medium truncate">
                  {subTitle || 'Voice Catalog Studio'}
                </span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <span className="text-[18px] font-bold text-[#9f3c16] tracking-tight leading-none">
                    KALAMITRA
                  </span>
                  <span className="hidden sm:inline text-[#dec0b7] font-bold">•</span>
                  <span className="hidden sm:inline text-[12px] text-[#57423b] truncate">
                    {currentTab === 'home' ? 'Home' : currentTab === 'products' ? 'Catalog' : 'Market'}
                  </span>
                </div>
                <span className="text-[12px] text-[#2c694e] font-medium tracking-normal truncate">
                  {subTitle || 'Artisan First'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Section: Language switcher & Artisan Profile */}
        <div className="flex items-center gap-2 shrink-0 relative">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              aria-label="Switch Language"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="h-9 px-3 rounded-full bg-[#e5e9e4] hover:bg-[#dfe4df] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#9f3c16] text-[18px]">translate</span>
              <span className="text-[12px] text-[#181d1a] font-bold">
                {getLangName(language)}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-11 w-32 bg-white rounded-xl shadow-xl border border-[#dfe4df] py-1.5 z-50 flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('en');
                    setLangMenuOpen(false);
                    speakText('English selected', 'en');
                  }}
                  className={`px-3 py-2 text-left text-xs font-semibold hover:bg-[#f0f5f0] flex items-center justify-between ${language === 'en' ? 'text-[#9f3c16] bg-[#ffdbcf]/30' : 'text-[#181d1a]'}`}
                >
                  <span>English</span>
                  {language === 'en' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('hi');
                    setLangMenuOpen(false);
                    speakText('हिन्दी चुनी गई', 'hi');
                  }}
                  className={`px-3 py-2 text-left text-xs font-semibold hover:bg-[#f0f5f0] flex items-center justify-between ${language === 'hi' ? 'text-[#9f3c16] bg-[#ffdbcf]/30' : 'text-[#181d1a]'}`}
                >
                  <span>हिन्दी (Hindi)</span>
                  {language === 'hi' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange('gu');
                    setLangMenuOpen(false);
                    speakText('ગુજરાતી પસંદ કરી', 'gu');
                  }}
                  className={`px-3 py-2 text-left text-xs font-semibold hover:bg-[#f0f5f0] flex items-center justify-between ${language === 'gu' ? 'text-[#9f3c16] bg-[#ffdbcf]/30' : 'text-[#181d1a]'}`}
                >
                  <span>ગુજરાતી (Gujarati)</span>
                  {language === 'gu' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
              </div>
            )}
          </div>

          {/* Profile Avatar with online status */}
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              aria-label="Artisan Profile"
              onClick={handleProfileClick}
              className="rounded-full p-0.5 transition-transform active:scale-95 cursor-pointer ring-2 ring-[#2c694e]/30 hover:ring-[#2c694e]"
            >
              <img
                src={ARTISAN_PROFILE.avatar}
                alt={ARTISAN_PROFILE.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#2c694e] ring-2 ring-[#f6fbf5]"
              title="Online & Sync Active"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
