import React from 'react';
import { ARTISAN_PROFILE, INITIAL_CRAFTS } from '../../data/crafts';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface HomeScreenProps {
  language: Language;
  onStartVoiceStudio?: () => void;
  onStartVoiceCatalog?: () => void;
  onOpenVoiceOverlay?: () => void;
  onViewAllCrafts?: () => void;
  onSelectCraft?: (craftId: string) => void;
  onNavigate?: (tab: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onStartVoiceStudio,
  onStartVoiceCatalog,
  onOpenVoiceOverlay = () => {},
  onViewAllCrafts,
  onSelectCraft,
  onNavigate,
}) => {
  const isHindi = language === 'hi';
  const isTamil = language === 'ta';

  const handleStartVoice = () => {
    if (onStartVoiceStudio) {
      onStartVoiceStudio();
    } else if (onStartVoiceCatalog) {
      onStartVoiceCatalog();
    } else if (onNavigate) {
      onNavigate('voice-studio');
    }
  };

  const handleViewAll = () => {
    if (onViewAllCrafts) {
      onViewAllCrafts();
    } else if (onNavigate) {
      onNavigate('products');
    }
  };

  const handleSelect = (craftId: string) => {
    if (onSelectCraft) {
      onSelectCraft(craftId);
    } else if (onNavigate) {
      onNavigate('review-publish');
    }
  };

  const handleGreetingAudio = () => {
    if (isTamil) {
      speakText('வணக்கம் சாந்தி தேவி. குஜராத் கட்ச் கைவினை பாரம்பரிய ஸ்டுடியோவிற்கு வரவேற்கிறோம். புதிய கைவினைப்பொருளை சேர்க்க மைக்கை அழுத்தவும்.', 'ta');
    } else if (isHindi) {
      speakText('नमस्ते शांति देवी। कच्छ गुजरात के आपके शिल्प विरासत स्टूडियो में आपका स्वागत है। बोलकर नया शिल्प जोड़ने के लिए माइक दबाएं।', 'hi');
    } else {
      speakText('Welcome, Shanti Devi. Master Terracotta Artisan at Craft Heritage Studio, Kutch, Gujarat. Tap Start Speaking to catalog a new craft.', 'en');
    }
  };

  const handleTutorialAudio = () => {
    speakText(
      isTamil
        ? 'கலாமித்ராவிற்கு வரவேற்கிறோம். உங்கள் கைவினைப்பொருள் பற்றி தமிழில் பேசலாம். AI தானாகவே பரிமாணங்கள், மூலப்பொருட்கள், நியாயமான விலை ஆகியவற்றைத் தயாரித்து ONDC-க்கு அனுப்பும்.'
        : isHindi
        ? 'कला मित्र में आपका स्वागत है। आप अपनी क्षेत्रीय भाषा में बोल सकते हैं। हम आपके शिल्प की तस्वीर, विवरण और उचित मूल्य अपने आप तैयार करेंगे।'
        : 'Welcome to Kalamitra. Simply speak about your craft in Hindi, Gujarati, Tamil, or English. Our AI automatically extracts dimensions, raw materials, fair pricing, and exports to ONDC.',
      language
    );
  };

  const handleCraftAudio = (e: React.MouseEvent, title: string, price: number, desc: string) => {
    e.stopPropagation();
    speakText(`${title}. ${desc}. Selling price is rupees ${price}.`, language);
  };

  return (
    <div className="flex flex-col w-full px-4 gap-3.5 pb-28 pt-3 max-w-md mx-auto">
      {/* Warm Artisan Greeting Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#ebefea] p-4 shadow-sm">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#9f3c16]/5 rounded-full pointer-events-none" />
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[14px] mr-1 text-[#2c694e]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                {ARTISAN_PROFILE.location}
              </span>
            </div>
            <h1 className="text-[26px] leading-[34px] tracking-tight font-bold text-[#181d1a]">
              {isTamil ? `வணக்கம், சாந்தி தேவி` : isHindi ? `स्वागत है, ${ARTISAN_PROFILE.nameHi}` : `Welcome, ${ARTISAN_PROFILE.name}`}
            </h1>
            <p className="text-[13px] text-[#57423b] mt-0.5 leading-snug">
              {isTamil ? 'முதன்மை சுடுமண் கைவினைஞர் • கைவினை பாரம்பரிய ஸ்டுடியோ' : isHindi ? ARTISAN_PROFILE.titleHi : ARTISAN_PROFILE.title}
            </p>
          </div>

          <button
            type="button"
            aria-label="Audio readout of greeting"
            onClick={handleGreetingAudio}
            className="w-11 h-11 rounded-full bg-[#e5e9e4] hover:bg-[#dfe4df] active:bg-[#9f3c16] active:text-white flex items-center justify-center shrink-0 transition-all active:scale-90 shadow-sm text-[#9f3c16] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">volume_up</span>
          </button>
        </div>

        {/* Live Ambient Voice Prompt Banner */}
        <div
          onClick={onOpenVoiceOverlay}
          className="mt-3 bg-[#ffffff] rounded-lg p-3 flex items-center gap-2.5 shadow-sm cursor-pointer active:scale-[0.99] transition-transform border border-[#dfe4df]/50"
        >
          <div className="w-9 h-9 rounded-full bg-[#ffdbcf] flex items-center justify-center text-[#9f3c16] shrink-0 animate-pulse">
            <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] text-[#9f3c16] uppercase font-bold tracking-wider">
              {isTamil ? 'குரல் உதவியாளர்' : isHindi ? 'कला मित्र वाणी' : 'Voice Assistant'}
            </span>
            <span className="text-[13px] text-[#181d1a] truncate font-semibold">
              {isTamil ? '"புதிய கைவினை சேர்க்க" என்று சொல்லுங்கள்' : isHindi ? 'बोलें "नया शिल्प जोड़ें" या यहाँ दबाएं' : 'Say "Add new craft" or tap here'}
            </span>
          </div>
          <span className="material-symbols-outlined text-[#8a726a] text-[20px]">arrow_forward</span>
        </div>
      </div>

      {/* Hero Voice Cataloging Anchor Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#9f3c16] text-[#ffffff] p-5 shadow-md flex flex-col justify-between">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-44 h-44 rounded-full bg-[#bf542c]/40 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b1f0ce] animate-ping" />
            <span className="text-[12px] text-white font-bold tracking-wide">
              {isTamil ? 'AI குரல் ஸ்டுடியோ • தட்டச்சு தேவையில்லை' : isHindi ? 'AI वॉइस स्टूडियो • टाइपिंग की जरूरत नहीं' : 'AI Voice Studio • No Typing Needed'}
            </span>
          </div>
          <h2 className="text-[24px] leading-tight font-bold text-white mt-1">
            {isTamil ? 'உங்கள் குரலால் கைவினைகளைச் சேர்க்கவும்' : isHindi ? 'अपनी आवाज़ से शिल्प जोड़ें' : 'Describe Your Craft with Voice'}
          </h2>
          <p className="text-[13px] text-white/85 leading-relaxed mt-1">
            {isTamil
              ? 'தட்டச்சு செய்ய வேண்டியதில்லை. தமிழ், இந்தி அல்லது ஆங்கிலத்தில் பேசுங்கள். AI விவரக்குறிப்புகள், நியாய விலை ஆகியவற்றைத் தயாரித்து ONDC-க்கு மாற்றும்.'
              : isHindi
              ? 'लिखने की जरूरत नहीं। हिन्दी, गुजराती, कच्छी या अंग्रेज़ी में बोलें। AI विवरण, टैग और उचित मूल्य तैयार करके ONDC पर भेज देगा।'
              : 'No typing needed. Speak in Hindi, Gujarati, Tamil, or English. AI drafts specs, tags, fair pricing, and exports to ONDC.'}
          </p>
        </div>

        <div className="relative z-10 mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={handleStartVoice}
            className="flex-1 h-13 bg-[#ffffff] text-[#9f3c16] hover:bg-[#ffdbcf] active:bg-[#ffdbcf] rounded-full text-[16px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px] text-[#9f3c16]" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
            <span>{isTamil ? 'பேசத் தொடங்குங்கள்' : isHindi ? 'बोलना शुरू करें' : 'Start Speaking'}</span>
          </button>

          <button
            type="button"
            aria-label="Voice Tutorial Audio"
            onClick={handleTutorialAudio}
            className="w-13 h-13 rounded-full bg-[#bf542c] hover:bg-[#a23e18] text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform shadow-sm cursor-pointer"
            title="Listen to Tutorial"
          >
            <span className="material-symbols-outlined text-[24px]">help</span>
          </button>
        </div>
      </div>

      {/* Quick Contextual Tip */}
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-[#f0f5f0] text-[#57423b] shadow-sm border border-[#dfe4df]">
        <div className="w-6 h-6 rounded-full bg-[#ffdcbd] text-[#2c1600] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[16px]">lightbulb</span>
        </div>
        <span className="text-[13px] truncate flex-1">
          <strong className="text-[#181d1a]">{isTamil ? 'குறிப்பு: ' : isHindi ? 'सलाह: ' : 'Tip: '}</strong>
          {isTamil ? 'களிமண் வகை, சூளை முறை மற்றும் அளவைக் குறிப்பிடவும்.' : isHindi ? 'मिट्टी का प्रकार, पकाने की विधि और माप बताएं।' : 'Mention clay type, firing method & dimensions.'}
        </span>
        <button
          type="button"
          aria-label="Tip info"
          onClick={() => speakText(isTamil ? 'குறிப்பு: அதிக வாங்குபவர் நம்பிக்கைக்கு களிமண் வகை, சூளை முறை மற்றும் அளவைக் குறிப்பிடவும்.' : isHindi ? 'सलाह: अपने शिल्प की मिट्टी का प्रकार, पकाने की विधि और नाप बताएं।' : 'Tip: Mention clay type, firing method and dimensions for higher buyer trust.', language)}
          className="material-symbols-outlined text-[#8a726a] text-[18px] cursor-pointer hover:text-[#9f3c16]"
        >
          volume_up
        </button>
      </div>

      {/* Quick Metrics Overview (3 Columns) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Active Listings */}
        <div className="flex flex-col bg-[#ffffff] p-3 rounded-xl shadow-sm min-w-0 border border-[#dfe4df]/50">
          <div className="flex items-center justify-between mb-1">
            <span className="material-symbols-outlined text-[#2c694e] text-[22px]">store</span>
            <span className="w-2 h-2 rounded-full bg-[#2c694e]" />
          </div>
          <span className="text-[24px] font-bold text-[#181d1a] leading-none">
            {ARTISAN_PROFILE.activeCrafts}
          </span>
          <span className="text-[12px] text-[#57423b] truncate mt-1">
            {isTamil ? 'நேரலை கைவினை' : isHindi ? 'सक्रिय शिल्प' : 'Active Crafts'}
          </span>
        </div>

        {/* Total Sales */}
        <div className="flex flex-col bg-[#ffffff] p-3 rounded-xl shadow-sm min-w-0 border border-[#dfe4df]/50">
          <div className="flex items-center justify-between mb-1">
            <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">payments</span>
            <span className="material-symbols-outlined text-[#2c694e] text-[16px]">trending_up</span>
          </div>
          <span className="text-[24px] font-bold text-[#181d1a] leading-none truncate">
            ₹{(ARTISAN_PROFILE.monthlyEarnings / 1000).toFixed(1)}k
          </span>
          <span className="text-[12px] text-[#57423b] truncate mt-1">
            {isTamil ? 'மாத வருவாய்' : isHindi ? 'मासिक कमाई' : 'Monthly Earnings'}
          </span>
          <span className="text-[11px] font-bold text-[#2c694e] truncate">+15% {isTamil ? 'வளர்ச்சி' : isHindi ? 'वृद्धि' : 'growth'}</span>
        </div>

        {/* Offline Queue */}
        <div className="flex flex-col bg-[#ffffff] p-3 rounded-xl shadow-sm min-w-0 border border-[#dfe4df]/50">
          <div className="flex items-center justify-between mb-1">
            <span className="material-symbols-outlined text-[#7b542b] text-[22px]">cloud_sync</span>
            <span className="w-2 h-2 rounded-full bg-[#7b542b] animate-ping" />
          </div>
          <span className="text-[24px] font-bold text-[#181d1a] leading-none">
            {ARTISAN_PROFILE.offlineSyncQueue}
          </span>
          <span className="text-[12px] text-[#57423b] truncate mt-1">
            {isTamil ? 'ஒத்திசைவு' : isHindi ? 'सिंक कतार' : 'Sync Queue'}
          </span>
          <span className="text-[11px] font-bold text-[#7b542b] truncate">
            {isTamil ? 'சேமிக்கப்பட்டது' : isHindi ? 'सुरक्षित ड्राफ्ट' : 'Offline saved'}
          </span>
        </div>
      </div>

      {/* Catalog Quality Health Score Bar */}
      <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-[#dfe4df]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#2c694e] text-[20px]">workspace_premium</span>
            <span className="text-[14px] text-[#181d1a] font-bold">
              {isTamil ? 'பட்டியல் தரம்' : isHindi ? 'कैटलॉग गुणवत्ता स्कोर' : 'Catalog Health'}
            </span>
          </div>
          <span className="text-[14px] text-[#2c694e] font-bold">
            {ARTISAN_PROFILE.catalogHealth}% ({isTamil ? 'உயர்தரம்' : isHindi ? 'शीर्ष श्रेणी' : 'Top Tier'})
          </span>
        </div>

        {/* Progress Indicator Bar */}
        <div className="w-full h-3 bg-[#e5e9e4] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#2c694e] rounded-full transition-all duration-500"
            style={{ width: `${ARTISAN_PROFILE.catalogHealth}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-1">
          <span className="text-[13px] text-[#57423b]">
            {isTamil ? 'அதிக வாங்குபவர் நம்பிக்கை • ஏற்றுமதிக்கு தயார்' : isHindi ? 'उच्च खरीदार विश्वास • अंतरराष्ट्रीय निर्यात के लिए तैयार' : 'High buyer trust • Ready for international exports'}
          </span>
          <span className="material-symbols-outlined text-[#2c694e] text-[18px]">verified</span>
        </div>
      </div>

      {/* Recent Products Horizontal Showcase */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] text-[#181d1a] font-bold">
            {isTamil ? 'சமீபத்திய கைவினை' : isHindi ? 'हालिया शिल्प' : 'Recent Crafts'}
          </h2>
          <button
            type="button"
            onClick={handleViewAll}
            className="text-[14px] text-[#9f3c16] font-bold flex items-center hover:underline cursor-pointer"
          >
            <span>{isTamil ? 'அனைத்தையும் காண்க' : isHindi ? 'सभी देखें' : 'View All'}</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Carousel Container */}
        <div className="flex overflow-x-auto gap-3 pb-2 pt-1 -mx-4 px-4 scroll-smooth no-scrollbar">
          {INITIAL_CRAFTS.slice(0, 3).map((craft) => (
            <div
              key={craft.id}
              onClick={() => handleSelect(craft.id)}
              className="min-w-[240px] max-w-[240px] bg-[#ffffff] rounded-xl p-2 flex flex-col shadow-sm shrink-0 border border-[#dfe4df]/50 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#ebefea]">
                <img
                  src={craft.image}
                  alt={craft.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#181d1a] text-[12px] font-bold flex items-center gap-1 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#2c694e]" />
                  <span>{craft.status === 'live' ? 'Live' : craft.status === 'dispatch' ? '3 Inquiries' : 'Fair Price'}</span>
                </div>
                <button
                  type="button"
                  aria-label="Listen details"
                  onClick={(e) => handleCraftAudio(e, craft.title, craft.price, craft.subtitle)}
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 text-[#9f3c16] flex items-center justify-center shadow-sm active:scale-90 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                </button>
              </div>

              <div className="flex flex-col p-1.5 mt-1">
                <h3 className="text-[16px] font-bold text-[#181d1a] truncate">
                  {isHindi && craft.titleHi ? craft.titleHi : craft.title}
                </h3>
                <span className="text-[13px] text-[#57423b] truncate">
                  {isHindi && craft.subtitleHi ? craft.subtitleHi : craft.subtitle}
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[18px] text-[#9f3c16] font-bold">
                    ₹{craft.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[12px] px-2 py-0.5 rounded bg-[#aeeecb] text-[#316e52] font-semibold">
                    {craft.ondcLive ? 'ONDC Live' : 'AI Approved'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
