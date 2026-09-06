import React, { useState } from 'react';
import { SAMPLE_EXTRACTED_DETAILS } from '../../data/crafts';
import { Language, ExtractedDetails } from '../../types';
import { speakText } from '../../utils/speech';

interface ExtractedCatalogScreenProps {
  language: Language;
  onProceedToPhoto: () => void;
  onSaveDraft: () => void;
}

export const ExtractedCatalogScreen: React.FC<ExtractedCatalogScreenProps> = ({
  language,
  onProceedToPhoto,
  onSaveDraft,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [details, setDetails] = useState<ExtractedDetails>(SAMPLE_EXTRACTED_DETAILS);
  const [editingStory, setEditingStory] = useState(false);
  const [voiceAdjustActive, setVoiceAdjustActive] = useState(false);

  const isHindi = language === 'hi';
  const isTamil = language === 'ta';

  const toggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlayingAudio(true);
      speakText(
        isTamil
          ? 'இந்த மண் குவளை கட்ச் சிவப்பு களிமண்ணால் கைவினை முறையில் செய்யப்பட்டது. உயரம் 25 செமீ, அகலம் 18 செமீ, எடை சுமார் 1.4 கிலோ.'
          : isHindi
          ? 'यह मिट्टी का फूलदान कच्छ की लाल चिकनी मिट्टी से बना है। ऊंचाई २५ सेंटीमीटर, चौड़ाई १८ सेंटीमीटर और वजन लगभग १.४ किलोग्राम है।'
          : 'This is an earthen terracotta pot handcrafted on the potter wheel using Kutch red clay with tribal etched patterns. Height is 25 cm, width 18 cm, weight 1.4 kg.',
        language
      );
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  const handleFieldMic = (fieldName: string) => {
    speakText(
      isTamil
        ? `${fieldName} பற்றி பேசவும்...`
        : isHindi 
        ? `${fieldName} के लिए बोलें...` 
        : `Listening for ${fieldName}...`,
      language
    );
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-md mx-auto">
      {/* AI Processing & Success Banner */}
      <section className="px-4 pt-2 pb-2">
        <div className="bg-[#aeeecb] text-[#316e52] rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#2c694e]/20">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#2c694e] shrink-0 text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[16px] font-bold text-[#181d1a] truncate">
                  {isTamil ? 'பட்டியல் 3.2 வினாடிகளில் பெறப்பட்டது' : isHindi ? 'कैटलॉग ३.२ सेकंड में तैयार' : 'Catalog Extracted in 3.2s'}
                </span>
                <span className="text-[12px] text-[#2c694e] font-medium">
                  {isTamil ? 'குரல் விவரிப்பிலிருந்து தானாக உருவாக்கப்பட்டது' : isHindi ? 'आवाज़ विवरण से स्वतः उत्पन्न' : 'Auto-generated from voice narration in 3.2s'}
                </span>
              </div>
            </div>

            <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full bg-white text-[#2c694e] text-[12px] font-bold shadow-sm">
              100% Verified
            </span>
          </div>

          {/* Audio Playback Pill */}
          <div className="flex items-center justify-between bg-white rounded-xl p-2 shadow-sm">
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e5e9e4] hover:bg-[#dfe4df] active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#9f3c16] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
              <span className="text-[13px] text-[#181d1a] font-semibold">
                {isPlayingAudio ? 'Playing (0:14)' : 'Original Voice (0:38)'}
              </span>
            </button>

            {/* Live Audio Waveform Graphic */}
            <div className="flex items-center gap-1 px-2 flex-1 justify-center max-w-[100px] overflow-hidden">
              <span className={`w-1 rounded-full bg-[#2c694e] ${isPlayingAudio ? 'h-5 animate-pulse' : 'h-3'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingAudio ? 'h-7 animate-pulse' : 'h-5'}`} />
              <span className={`w-1 rounded-full bg-[#2c694e] ${isPlayingAudio ? 'h-4 animate-pulse' : 'h-2'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingAudio ? 'h-8 animate-pulse' : 'h-6'}`} />
              <span className={`w-1 rounded-full bg-[#2c694e] ${isPlayingAudio ? 'h-3 animate-pulse' : 'h-4'}`} />
            </div>

            <button
              type="button"
              onClick={toggleAudio}
              className="h-8 px-2 rounded-lg flex items-center gap-1 text-[#7b542b] hover:bg-[#f0f5f0] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
              <span className="text-[12px] font-bold">{isHindi ? 'सुने' : 'Listen'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Preview Card */}
      <section className="px-4 py-2">
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-[#dfe4df]">
          <div className="relative w-full aspect-[4/3] bg-[#ebefea] overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv0iZ1nTk3M8slMy8_yvD5b_aIubj-WEwQko-JblyGURQHDYOm9dJ7m1B6M6QwEY57kIDVUcCpF6V4uhCdkJgxaWo0UTUD7b6f-635vEY-yLaM_y8JBYDQHXSDZzE3w6Ip8rhgaK5yXTlGE-Z9oRmRlLFTSIy0AqGBsKiJJWYdrPPHrpZjBVGOPE5GqLiNIRRSR1S_295fwc2GqxfH4uZKEDKIeqQF0prfIjIW5s3Ii_lO7iRB1eXX"
              alt="Terracotta Vase"
              className="w-full h-full object-cover"
            />
            {/* Category Pill */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#9f3c16] text-[18px]">potted_plant</span>
              <span className="text-[12px] text-[#181d1a] font-bold">Terracotta &amp; Clay Crafts</span>
            </div>
            {/* GI Tag */}
            <div className="absolute bottom-3 right-3 bg-[#2c694e] text-white px-3 py-1 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-md">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              GI Craft Eligible
            </div>
          </div>

          <div className="p-4 flex items-start justify-between bg-white">
            <div>
              <h2 className="text-[18px] font-bold text-[#181d1a]">Kutch Terracotta Vase</h2>
              <span className="text-[12px] text-[#57423b]">Handcrafted clay pottery</span>
            </div>
            <div className="text-right">
              <span className="text-[20px] font-bold text-[#9f3c16]">₹1,850</span>
              <div className="text-[12px] text-[#2c694e] font-semibold flex items-center justify-end gap-0.5">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Fair Price
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extracted Structured Fields */}
      <section className="px-4 py-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9f3c16] text-[22px]">format_list_bulleted</span>
            <h3 className="text-[16px] text-[#181d1a] font-bold">
              {isHindi ? 'निकाले गए फ़ील्ड' : 'Extracted Fields'}
            </h3>
          </div>
          <span className="text-[12px] text-[#57423b]">
            {isHindi ? 'फिर से बोलने के लिए माइक दबाएं' : 'Tap mic to re-speak'}
          </span>
        </div>

        {/* Product Title Field */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#dfe4df]">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] text-[#8a726a] font-semibold">Product Title</span>
            <p className="text-[15px] text-[#181d1a] font-semibold pt-0.5 leading-snug">
              {details.title}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleFieldMic('Product Title')}
            className="w-10 h-10 shrink-0 rounded-full bg-[#e5e9e4] hover:bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Craft Category Field */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#dfe4df]">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] text-[#8a726a] font-semibold">Craft Category</span>
            <p className="text-[14px] text-[#181d1a] font-medium pt-0.5">
              {details.category}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[11px] font-bold">
                GI Candidate
              </span>
              <span className="text-[11px] text-[#7b542b] font-medium">{details.guild}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleFieldMic('Craft Category')}
            className="w-10 h-10 shrink-0 rounded-full bg-[#e5e9e4] hover:bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Primary Material */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#dfe4df]">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] text-[#8a726a] font-semibold">Primary Material</span>
            <p className="text-[14px] text-[#181d1a] font-medium pt-0.5">
              {details.material}
            </p>
            <span className="text-[12px] text-[#2c694e] font-medium">{details.subMaterial}</span>
          </div>
          <button
            type="button"
            onClick={() => handleFieldMic('Primary Material')}
            className="w-10 h-10 shrink-0 rounded-full bg-[#e5e9e4] hover:bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Dimensions & Weight Field */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#dfe4df]">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] text-[#8a726a] font-semibold">Dimensions &amp; Weight</span>
            <div className="grid grid-cols-3 gap-2 pt-1.5">
              <div className="bg-[#f0f5f0] rounded-lg p-2 flex flex-col text-center">
                <span className="text-[11px] text-[#8a726a]">Height</span>
                <span className="text-[14px] text-[#181d1a] font-bold">{details.dimensions.height}</span>
              </div>
              <div className="bg-[#f0f5f0] rounded-lg p-2 flex flex-col text-center">
                <span className="text-[11px] text-[#8a726a]">Width</span>
                <span className="text-[14px] text-[#181d1a] font-bold">{details.dimensions.width}</span>
              </div>
              <div className="bg-[#f0f5f0] rounded-lg p-2 flex flex-col text-center">
                <span className="text-[11px] text-[#8a726a]">Weight</span>
                <span className="text-[14px] text-[#181d1a] font-bold">{details.dimensions.weight}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleFieldMic('Dimensions')}
            className="w-10 h-10 shrink-0 rounded-full bg-[#e5e9e4] hover:bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Color / Finish Field */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#dfe4df]">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12px] text-[#8a726a] font-semibold">Color &amp; Finish</span>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-4 h-4 rounded-full bg-[#9f3c16] shrink-0" />
              <p className="text-[14px] text-[#181d1a] font-medium">{details.finish}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleFieldMic('Color')}
            className="w-10 h-10 shrink-0 rounded-full bg-[#e5e9e4] hover:bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Rich Story & Description */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col gap-2 border border-[#dfe4df]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#7b542b] text-[20px]">auto_stories</span>
              <span className="text-[12px] text-[#8a726a] font-semibold">
                {isHindi ? 'शिल्पकार कहानी (AI निर्मित)' : 'Artisan Story (AI Generated)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleFieldMic('Story')}
              className="w-8 h-8 rounded-full bg-[#e5e9e4] hover:bg-[#ffdbcf] text-[#9f3c16] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>

          {editingStory ? (
            <textarea
              value={details.story}
              onChange={(e) => setDetails({ ...details, story: e.target.value })}
              className="w-full text-[14px] text-[#181d1a] bg-[#f0f5f0] p-2.5 rounded-lg border border-[#9f3c16] focus:outline-none"
              rows={4}
            />
          ) : (
            <blockquote className="text-[14px] text-[#181d1a] bg-[#f0f5f0]/70 rounded-lg p-3 italic leading-relaxed">
              "{details.story}"
            </blockquote>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setEditingStory(!editingStory)}
              className="flex items-center gap-1 text-[#9f3c16] text-[12px] font-bold hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>{editingStory ? (isHindi ? 'सहेजें' : 'Save Text') : (isHindi ? 'त्वरित संपादन' : 'Quick Edit Text')}</span>
            </button>
          </div>
        </div>

        {/* Marketplace Tags */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm flex flex-col gap-2 border border-[#dfe4df]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#8a726a] font-semibold">SEO &amp; Marketplace Tags</span>
            <button
              type="button"
              onClick={() => speakText('Tags refreshed with latest buyer search terms.', language)}
              className="text-[#2c694e] flex items-center gap-1 text-[12px] font-bold cursor-pointer hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Refresh</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {details.tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${
                  i === 3 ? 'bg-[#ffdbcf] text-[#822801] font-bold' : i === 4 ? 'bg-[#aeeecb] text-[#316e52] font-bold' : 'bg-[#ebefea] text-[#57423b]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action Area */}
      <footer className="sticky bottom-0 w-full bg-[#f6fbf5]/95 backdrop-blur-xl pt-2 pb-5 px-4 shadow-[0_-4px_16px_rgba(31,36,33,0.06)] flex flex-col gap-2.5 mt-4 z-40 border-t border-[#dfe4df]">
        {/* Voice Correction Trigger */}
        <button
          type="button"
          onClick={() => {
            setVoiceAdjustActive(!voiceAdjustActive);
            speakText(isTamil ? 'எந்த விவரத்தை மாற்ற வேண்டும் என்று சொல்லுங்கள்.' : isHindi ? 'बताएं, आप क्या सुधारना चाहते हैं?' : 'Tell me what you would like to adjust.', language);
          }}
          className={`w-full h-12 rounded-full shadow-sm flex items-center justify-center gap-2 font-bold text-[15px] transition-all cursor-pointer ${
            voiceAdjustActive ? 'bg-[#9f3c16] text-white' : 'bg-white text-[#9f3c16] hover:bg-[#ffdbcf] border border-[#dec0b7]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">mic</span>
          <span>{isTamil ? 'விவரங்களை திருத்த குரலால் கூறவும்' : isHindi ? 'कोई भी विवरण सुधारने के लिए बोलें' : 'Speak to adjust any detail'}</span>
        </button>

        {/* Primary & Secondary CTA Stack */}
        <div className="flex items-center gap-2.5 w-full">
          <button
            type="button"
            onClick={onSaveDraft}
            className="h-14 px-4 rounded-full bg-[#dfe4df] hover:bg-[#d7dbd6] text-[#181d1a] text-[15px] font-bold flex items-center justify-center active:scale-95 transition-transform shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] mr-1">bookmark</span>
            <span>{isTamil ? 'வரைவு சேமி' : isHindi ? 'ड्राफ्ट सहेजें' : 'Save Draft'}</span>
          </button>

          <button
            type="button"
            onClick={onProceedToPhoto}
            className="flex-1 h-14 rounded-full bg-[#9f3c16] hover:bg-[#bf542c] text-white text-[15px] font-bold shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{isTamil ? 'பட மேம்பாட்டுக்கு செல்லவும்' : isHindi ? 'फोटो सुशोभन पर जाएं' : 'Proceed to Image Enhancement'}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
