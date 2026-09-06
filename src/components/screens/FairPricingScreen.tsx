import React, { useState } from 'react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface FairPricingScreenProps {
  language: Language;
  onConfirmPrice: (price: number) => void;
  onSetCustomPrice: () => void;
}

export const FairPricingScreen: React.FC<FairPricingScreenProps> = ({
  language,
  onConfirmPrice,
  onSetCustomPrice,
}) => {
  const [currentPrice, setCurrentPrice] = useState(1850);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  const isHindi = language === 'hi';
  const isTamil = language === 'ta';

  const updatePrice = (delta: number) => {
    setCurrentPrice(prev => Math.max(1000, Math.min(4000, prev + delta)));
  };

  const getPriceStatus = () => {
    if (currentPrice === 1850) {
      return { text: isTamil ? 'சிறந்த விலை' : isHindi ? 'सर्वोत्तम मूल्य' : 'Sweet Spot', color: 'text-[#2c694e]' };
    }
    if (currentPrice >= 1650 && currentPrice <= 1950) {
      return { text: isTamil ? 'நியாயமான வரம்பு' : isHindi ? 'उचित मूल्य सीमा में' : 'In Fair Band', color: 'text-[#2c694e]' };
    }
    if (currentPrice < 1650) {
      return { text: isTamil ? 'குறைந்த லாபம்' : isHindi ? 'लागत से कम मार्जिन' : 'Below Fair Margin', color: 'text-[#ba1a1a]' };
    }
    return { text: isTamil ? 'பிரீமியம் விலை' : isHindi ? 'प्रीमियम दर' : 'Premium Rate', color: 'text-[#7b542b]' };
  };

  const handleVoicePrice = () => {
    setIsListeningVoice(true);
    speakText(
      isTamil
        ? 'கேட்கிறேன்... நீங்கள் விரும்பும் விலையைக் கூறுங்கள்.'
        : isHindi
        ? 'सुन रहा हूँ... अपनी पसंद का मूल्य बोलें।'
        : 'Listening... Speak your desired price.',
      language
    );

    setTimeout(() => {
      setIsListeningVoice(false);
      setCurrentPrice(1900);
      speakText(
        isTamil ? 'விலை ஆயிரத்து தொள்ளாயிரம் ரூபாயாக அமைக்கப்பட்டது.' : isHindi ? 'मूल्य उन्नीस सौ रुपये तय किया गया।' : 'Price updated to nineteen hundred rupees.',
        language
      );
    }, 2500);
  };

  const status = getPriceStatus();

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 max-w-md mx-auto gap-4">
      {/* Disclaimer / Reassurance Banner */}
      <div className="rounded-2xl bg-[#f0f5f0] p-4 shadow-sm border border-[#dfe4df]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#181d1a]">
              {isTamil ? 'நியாய விலை AI ஆலோசகர்' : isHindi ? 'उचित मूल्य AI सलाहकार' : 'Fair-Price AI Advisory'}
            </span>
            <p className="text-[13px] text-[#57423b] mt-1 leading-snug">
              {isTamil
                ? 'AI பரிந்துரை மூலப்பொருள் செலவு, உழைப்பு நேரம் மற்றும் சந்தை விகிதங்களை அடிப்படையாகக் கொண்டது. '
                : isHindi
                ? 'AI सुझाव सत्यापित सामग्री लागत, श्रम के घंटे और बाज़ार दरों पर आधारित है। '
                : 'AI recommendation is based on verified material costs, labor hours, and artisan market rates. '}
              <span className="font-bold text-[#181d1a]">
                {isTamil ? 'இறுதி விற்பனை விலையில் 100% உங்கள் கட்டுப்பாடே உள்ளது.' : isHindi ? 'अंतिम विक्रय मूल्य पर हमेशा १००% आपका नियंत्रण है।' : 'You are always in 100% control of your final selling price.'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Reference Card */}
      <div className="rounded-xl bg-white p-3 shadow-sm flex items-center gap-3 border border-[#dfe4df]">
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#ebefea]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv0iZ1nTk3M8slMy8_yvD5b_aIubj-WEwQko-JblyGURQHDYOm9dJ7m1B6M6QwEY57kIDVUcCpF6V4uhCdkJgxaWo0UTUD7b6f-635vEY-yLaM_y8JBYDQHXSDZzE3w6Ip8rhgaK5yXTlGE-Z9oRmRlLFTSIy0AqGBsKiJJWYdrPPHrpZjBVGOPE5GqLiNIRRSR1S_295fwc2GqxfH4uZKEDKIeqQF0prfIjIW5s3Ii_lO7iRB1eXX"
            alt="Terracotta Vase"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-white/90 text-[#9f3c16] text-[10px] font-bold shadow-sm">
            GI TAG
          </span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#2c694e] font-bold uppercase tracking-wider">Kutch Pottery</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]" />
            <span className="text-[11px] text-[#57423b]">Batch #402</span>
          </div>
          <h2 className="text-[16px] font-bold text-[#181d1a] truncate mt-0.5">
            Hand-Etched Terracotta Vase
          </h2>
          <div className="flex items-center gap-1 mt-1 text-[#7b542b]">
            <span className="material-symbols-outlined text-[18px]">handyman</span>
            <span className="text-[13px] font-medium">14 hrs handcraft</span>
          </div>
        </div>
      </div>

      {/* Recommended Fair Price Range Box */}
      <div className="rounded-2xl bg-[#e5e9e4] p-5 shadow-md relative overflow-hidden border border-[#dfe4df]">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#ffb59c]/30 pointer-events-none blur-2xl" />
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#57423b] uppercase tracking-wider font-bold">
            {isHindi ? 'उचित मूल्य सीमा' : 'Fair Price Band'}
          </span>
          <div className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[12px] font-bold flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            ONDC Ready
          </div>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[26px] text-[#9f3c16] font-bold">₹1,650</span>
          <span className="text-[16px] text-[#57423b] font-medium">{isHindi ? 'से' : 'to'}</span>
          <span className="text-[26px] text-[#9f3c16] font-bold">₹1,950</span>
        </div>

        <div className="mt-3.5 p-3 rounded-xl bg-white flex items-center justify-between shadow-sm border border-[#dfe4df]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">stars</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#57423b]">
                {isHindi ? 'सुझाया गया आदर्श मूल्य' : 'Recommended Sweet Spot'}
              </span>
              <span className="text-[18px] text-[#181d1a] font-bold">₹1,850</span>
            </div>
          </div>
          <span className="text-[11px] text-[#2c694e] bg-[#aeeecb]/50 px-2.5 py-1 rounded-full font-bold">
            {isHindi ? 'सबसे तेज़ मांग' : 'Fastest Buyer Demand'}
          </span>
        </div>
      </div>

      {/* Explainable AI Cost Breakdown */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[16px] text-[#181d1a] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">analytics</span>
            <span>{isHindi ? 'पारदर्शी लागत विवरण' : 'Cost Breakdown'}</span>
          </h3>
          <span className="text-[12px] text-[#2c694e] font-semibold">100% Transparent</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Raw Material */}
          <div className="rounded-xl bg-white p-3 shadow-sm flex items-center justify-between border border-[#dfe4df]">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#ebefea] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#7b542b] text-[22px]">water_drop</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#181d1a] font-bold">Raw Material Cost</span>
                <span className="text-[12px] text-[#57423b] truncate">Kutch fine clay, organic slip, natural pigments</span>
              </div>
            </div>
            <span className="text-[16px] text-[#181d1a] font-bold shrink-0 ml-2">₹320</span>
          </div>

          {/* Skilled Labor */}
          <div className="rounded-xl bg-white p-3 shadow-sm flex items-center justify-between border border-[#dfe4df]">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#ebefea] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">timer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#181d1a] font-bold">Skilled Labor / Crafting Time</span>
                <span className="text-[12px] text-[#57423b] truncate">14 hrs wheel spinning &amp; hand-etching</span>
              </div>
            </div>
            <span className="text-[16px] text-[#9f3c16] font-bold shrink-0 ml-2">₹950</span>
          </div>

          {/* GI & Heritage */}
          <div className="rounded-xl bg-white p-3 shadow-sm flex items-center justify-between border border-[#dfe4df]">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#ebefea] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#2c694e] text-[22px]">workspace_premium</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#181d1a] font-bold">GI &amp; Heritage Value</span>
                <span className="text-[12px] text-[#57423b] truncate">Authentic Kutch heritage motifs</span>
              </div>
            </div>
            <span className="text-[16px] text-[#2c694e] font-bold shrink-0 ml-2">₹380</span>
          </div>

          {/* Packaging */}
          <div className="rounded-xl bg-white p-3 shadow-sm flex items-center justify-between border border-[#dfe4df]">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#ebefea] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#8a726a] text-[22px]">inventory_2</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#181d1a] font-bold">Packaging &amp; Safe Transit</span>
                <span className="text-[12px] text-[#57423b] truncate">Eco-friendly straw wrap &amp; localized box</span>
              </div>
            </div>
            <span className="text-[16px] text-[#181d1a] font-bold shrink-0 ml-2">₹200</span>
          </div>
        </div>
      </div>

      {/* Market Comparison Card */}
      <div className="rounded-2xl bg-[#f0f5f0] p-4 shadow-sm flex flex-col gap-3 border border-[#dfe4df]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#57423b] uppercase tracking-wider font-bold">Market Comparison</span>
          <span className="material-symbols-outlined text-[#57423b] text-[20px]">storefront</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-white shadow-sm border border-[#dfe4df]/50">
            <span className="text-[11px] text-[#57423b] block">Middlemen Trader Offer</span>
            <span className="text-[18px] text-[#ba1a1a] font-bold mt-1 block">₹400 – ₹600</span>
            <span className="text-[11px] text-[#8a726a] block mt-0.5">Below production cost</span>
          </div>
          <div className="p-3 rounded-xl bg-white shadow-sm border border-[#dfe4df]/50">
            <span className="text-[11px] text-[#57423b] block">Metro Retail Store</span>
            <span className="text-[18px] text-[#181d1a] font-bold mt-1 block">₹2,800 – ₹3,400</span>
            <span className="text-[11px] text-[#8a726a] block mt-0.5">High commercial markup</span>
          </div>
        </div>

        {/* Kalamitra Advantage */}
        <div className="rounded-xl bg-[#aeeecb] p-3 flex items-center gap-3 border border-[#2c694e]/20">
          <div className="w-9 h-9 rounded-full bg-[#2c694e] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">savings</span>
          </div>
          <p className="text-[13px] text-[#316e52] font-semibold leading-snug">
            By selling direct via KALAMITRA, you keep <span className="text-[#181d1a] font-bold underline">₹{currentPrice.toLocaleString('en-IN')}</span> — that is <span className="text-[#181d1a] font-bold">3.5x higher</span> artisan earnings!
          </p>
        </div>
      </div>

      {/* Interactive Price Adjustment Section */}
      <div className="rounded-2xl bg-white p-5 shadow-md flex flex-col items-center gap-4 border border-[#dfe4df]">
        <div className="text-center">
          <span className="text-[12px] text-[#57423b] uppercase tracking-wider block font-bold">
            {isHindi ? 'आपका चुना हुआ मूल्य' : 'Your Selected Price'}
          </span>
          <span className="text-[13px] text-[#2c694e] font-medium">
            {isHindi ? 'प्रकाशित करने से पहले पूरी तरह संपादन योग्य' : 'Fully editable before publishing'}
          </span>
        </div>

        {/* Stepper Controller */}
        <div className="flex items-center justify-center gap-4 w-full max-w-xs">
          <button
            type="button"
            aria-label="Decrease price"
            onClick={() => updatePrice(-100)}
            className="w-14 h-14 rounded-2xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-transform flex items-center justify-center text-[#181d1a] shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]">remove</span>
          </button>

          <div className="flex flex-col items-center justify-center min-w-[130px]">
            <span className="text-[28px] text-[#9f3c16] font-bold">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            <span className={`text-[12px] font-bold ${status.color}`}>
              {status.text}
            </span>
          </div>

          <button
            type="button"
            aria-label="Increase price"
            onClick={() => updatePrice(100)}
            className="w-14 h-14 rounded-2xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-transform flex items-center justify-center text-[#181d1a] shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
        </div>

        {/* Voice Pricing Button */}
        <button
          type="button"
          onClick={handleVoicePrice}
          className={`w-full h-12 rounded-full border transition-all flex items-center justify-center gap-2 text-[14px] font-bold cursor-pointer ${
            isListeningVoice
              ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]'
              : 'bg-[#f0f5f0] hover:bg-[#ebefea] text-[#9f3c16] border-[#dec0b7]'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${isListeningVoice ? 'animate-pulse' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            mic
          </span>
          <span>{isListeningVoice ? (isHindi ? 'सुन रहा हूँ... बोलें' : 'Listening... Speak price') : (isHindi ? 'मूल्य बदलने के लिए बोलें' : 'Speak to adjust price')}</span>
        </button>
      </div>

      {/* Action CTA Area */}
      <div className="flex flex-col gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => onConfirmPrice(currentPrice)}
          className="w-full h-14 rounded-full bg-[#9f3c16] hover:bg-[#bf542c] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-transform cursor-pointer"
        >
          <span>{isTamil ? 'விலையை உறுதிசெய்து முன்னோட்டம் காண்க' : isHindi ? 'मूल्य पक्का करें और लिस्टिंग देखें' : 'Confirm Price & Preview Listing'}</span>
          <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={onSetCustomPrice}
          className="w-full h-12 rounded-full bg-[#ebefea] hover:bg-[#e5e9e4] text-[#181d1a] text-[14px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span>{isTamil ? 'தனிப்பயன் துல்லிய விலையை உள்ளிடுக' : isHindi ? 'कस्टम सटीक मूल्य दर्ज करें' : 'Set Custom Exact Price'}</span>
        </button>
      </div>
    </div>
  );
};
