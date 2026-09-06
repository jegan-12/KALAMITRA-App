import React, { useState } from 'react';
import { ARTISAN_PROFILE, INITIAL_CRAFTS } from '../../data/crafts';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface ArtisanProfileScreenProps {
  language: Language;
  onAddNewCraft: () => void;
}

export const ArtisanProfileScreen: React.FC<ArtisanProfileScreenProps> = ({
  language,
  onAddNewCraft,
}) => {
  const [isPlayingBio, setIsPlayingBio] = useState(false);

  const isHindi = language === 'hi';

  const toggleBioAudio = () => {
    if (isPlayingBio) {
      setIsPlayingBio(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlayingBio(true);
      speakText(
        isHindi
          ? 'नमस्ते, मेरा नाम शांति देवी है। मैं कच्छ के भुज में २४ वर्षों से मिट्टी के पारंपरिक पात्र और नक्काशीदार फूलदान बना रही हूँ।'
          : 'Namaste! I am Shanti Devi. For 24 years I have practiced traditional wheel-thrown Kutch terracotta craft, carrying forward my ancestral heritage.',
        language
      );
      setTimeout(() => setIsPlayingBio(false), 5500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-md mx-auto space-y-4">
      {/* Master Profile Card */}
      <section className="px-4">
        <div className="relative bg-white rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col border border-[#dfe4df]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#ffdbcf]/50 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-start gap-4 z-10">
            {/* Portrait */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md ring-3 ring-[#2c694e]/30 bg-[#ebefea]">
                <img
                  src={ARTISAN_PROFILE.avatar}
                  alt={ARTISAN_PROFILE.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#2c694e] text-white flex items-center justify-center ring-2 ring-white shadow">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </span>
            </div>

            {/* Bio Info */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[20px] font-bold text-[#181d1a] truncate">
                  {ARTISAN_PROFILE.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[11px] font-bold shrink-0">
                  GI Master
                </span>
              </div>
              <p className="text-[13px] font-semibold text-[#9f3c16] mt-0.5 truncate">
                {ARTISAN_PROFILE.guild}
              </p>
              <span className="text-[12px] text-[#57423b] mt-0.5">
                {ARTISAN_PROFILE.experience} • {ARTISAN_PROFILE.location}
              </span>
            </div>
          </div>

          {/* Voice Greeting Audio Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-[#f0f5f0] flex items-center justify-between gap-2 border border-[#dfe4df]">
            <button
              type="button"
              onClick={toggleBioAudio}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#9f3c16] hover:bg-[#bf542c] text-white text-[13px] font-bold active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlayingBio ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlayingBio ? (isHindi ? 'बजा रहे हैं (०:०८)' : 'Playing (0:08)') : (isHindi ? 'शिल्पकार का संदेश सुनें' : 'Listen to Artisan Greeting')}</span>
            </button>

            <div className="flex items-center gap-1">
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingBio ? 'h-4 animate-pulse' : 'h-2'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingBio ? 'h-6 animate-pulse' : 'h-4'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingBio ? 'h-3 animate-pulse' : 'h-2'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingBio ? 'h-5 animate-pulse' : 'h-3'}`} />
            </div>

            <span className="text-[11px] text-[#57423b] font-medium">
              Gujarati / Hindi
            </span>
          </div>
        </div>
      </section>

      {/* Financial Performance & Direct Impact Grid */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[16px] text-[#181d1a] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#2c694e] text-[20px]">account_balance_wallet</span>
            <span>{isHindi ? 'शिल्पकार आय और प्रभाव' : 'Direct Artisan Earnings'}</span>
          </h3>
          <span className="text-[12px] text-[#2c694e] font-bold bg-[#aeeecb] px-2 py-0.5 rounded-full">
            ONDC Connected
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col border border-[#dfe4df]">
            <span className="text-[12px] text-[#57423b]">Total Direct Sales</span>
            <span className="text-[20px] font-bold text-[#181d1a] mt-1">₹1,48,200</span>
            <span className="text-[11px] text-[#2c694e] font-semibold mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +38% via ONDC
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col border border-[#dfe4df]">
            <span className="text-[12px] text-[#57423b]">Artisan Take-Home</span>
            <span className="text-[20px] font-bold text-[#9f3c16] mt-1">89.4%</span>
            <span className="text-[11px] text-[#57423b] mt-0.5">
              vs 22% with middlemen
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col border border-[#dfe4df]">
            <span className="text-[12px] text-[#57423b]">Active Catalog</span>
            <span className="text-[20px] font-bold text-[#181d1a] mt-1">14 Products</span>
            <span className="text-[11px] text-[#2c694e] font-semibold mt-0.5">
              100% GI Verified
            </span>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col border border-[#dfe4df]">
            <span className="text-[12px] text-[#57423b]">Happy Patrons</span>
            <span className="text-[20px] font-bold text-[#181d1a] mt-1">128 Orders</span>
            <span className="text-[11px] text-[#7b542b] font-semibold mt-0.5">
              Across 12 states &amp; 4 countries
            </span>
          </div>
        </div>
      </section>

      {/* Artisan Live Catalog Management */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[16px] text-[#181d1a] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">store</span>
            <span>{isHindi ? 'आपकी लाइव लिस्टिंग्स' : 'Your Live Listings'}</span>
          </h3>
          <button
            type="button"
            onClick={onAddNewCraft}
            className="text-[12px] text-[#9f3c16] font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>{isHindi ? 'नया जोड़ें' : 'Add New'}</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {INITIAL_CRAFTS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-sm flex items-center justify-between gap-3 border border-[#dfe4df]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-lg object-cover bg-[#ebefea] shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <h4 className="text-[14px] font-bold text-[#181d1a] truncate">
                    {item.title}
                  </h4>
                  <span className="text-[12px] text-[#57423b] truncate">
                    {item.category} • {item.craftForm}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[13px] font-bold text-[#9f3c16]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                      Live on ONDC
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => speakText(`${item.title} is live at rupees ${item.price}`, language)}
                  className="w-8 h-8 rounded-full bg-[#f0f5f0] flex items-center justify-center text-[#57423b] hover:bg-[#e5e9e4] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Banking & Payout Node */}
      <section className="px-4">
        <div className="bg-[#f0f5f0] rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-[#dfe4df]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2c694e] text-[22px]">account_balance</span>
              <span className="text-[14px] font-bold text-[#181d1a]">
                Direct Bank Settlement
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#2c694e] bg-[#aeeecb] px-2 py-0.5 rounded-full">
              UPI Auto-Credited
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[12px] text-[#57423b]">State Bank of India</span>
              <span className="text-[14px] font-semibold text-[#181d1a]">•••• 4029 (Shanti Devi)</span>
            </div>
            <div className="text-right">
              <span className="text-[12px] text-[#57423b]">Next Payout</span>
              <span className="text-[15px] font-bold text-[#9f3c16] block">₹6,850 on Friday</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8a726a] pt-1 border-t border-[#dfe4df]">
            <span>ONDC Node ID: IND-GJ-BHJ-0829</span>
            <span className="text-[#2c694e] font-semibold">Gateway Active</span>
          </div>
        </div>
      </section>

      {/* Voice Add Craft Floating CTA */}
      <section className="px-4 pt-2">
        <button
          type="button"
          onClick={onAddNewCraft}
          className="w-full h-14 rounded-full bg-[#9f3c16] hover:bg-[#bf542c] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">mic</span>
          <span>{isHindi ? 'आवाज़ से नया शिल्प जोड़ें' : 'Add New Craft Item via Voice'}</span>
        </button>
      </section>
    </div>
  );
};
