import React, { useState } from 'react';
import { ARTISAN_PROFILE } from '../../data/crafts';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface ReviewPublishScreenProps {
  language: Language;
  selectedPrice: number;
  onPublishSuccess: () => void;
  onEditWithVoice: () => void;
}

export const ReviewPublishScreen: React.FC<ReviewPublishScreenProps> = ({
  language,
  selectedPrice,
  onPublishSuccess,
  onEditWithVoice,
}) => {
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [destinations, setDestinations] = useState({
    kalamitra: true,
    ondc: true,
    whatsapp: true,
  });

  const isHindi = language === 'hi';

  const handleVoiceStory = () => {
    if (isPlayingStory) {
      setIsPlayingStory(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlayingStory(true);
      speakText(
        isHindi
          ? 'नमस्ते, मैं शांति देवी हूँ। तीन पीढ़ियों से हमारा परिवार कच्छ की लाल मिट्टी से पारंपरिक पात्र और फूलदान बना रहा है।'
          : 'Namaste, I am Shanti Devi. For three generations, our artisan family in Bhuj has shaped riverbed clay with sacred etched motifs on the potter wheel.',
        language
      );
      setTimeout(() => setIsPlayingStory(false), 6000);
    }
  };

  const handleRotate = () => {
    setRotationAngle(prev => (prev + 90) % 360);
  };

  const handleZoom = () => {
    setZoomLevel(prev => (prev === 1 ? 1.25 : 1));
  };

  const handlePublish = () => {
    setIsPublishing(true);
    speakText(
      isHindi 
        ? 'कैटलॉग ONDC और कला मित्र पर प्रकाशित किया जा रहा है...' 
        : 'Publishing catalog to ONDC network and Kalamitra guild...',
      language
    );

    setTimeout(() => {
      setIsPublishing(false);
      setPublished(true);
      speakText(
        isHindi
          ? 'बधाई हो! आपका शिल्प ONDC और कला मित्र पर सफलतापूर्वक प्रकाशित हो गया है।'
          : 'Congratulations! Your craft is now live on ONDC and Kalamitra Marketplace.',
        language
      );
      setTimeout(() => {
        onPublishSuccess();
      }, 1500);
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-1 max-w-md mx-auto">
      {/* Top Audio Notification & Progress Status Bar */}
      <div className="px-4 py-2.5 bg-[#aeeecb]/50 border-b border-[#2c694e]/20 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[#2c694e] text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <p className="text-[12px] text-[#316e52] font-semibold truncate">
            {isHindi ? '१००% आवाज़-सत्यापित शिल्प कैटलॉग' : '100% Voice-Verified Artisan Catalog'}
          </p>
        </div>
        <span className="text-[12px] px-2.5 py-0.5 rounded-full bg-[#2c694e] text-white font-bold shrink-0">
          Step 4 of 4
        </span>
      </div>

      <div className="px-4 pt-3 flex flex-col gap-4">
        {/* Screen Subheading */}
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[24px] font-bold text-[#181d1a]">
            {isHindi ? 'समीक्षा और प्रकाशन' : 'Review & Publish'}
          </h2>
          <p className="text-[13px] text-[#8a726a]">
            {isHindi
              ? 'घरेलू और वैश्विक खरीदारों को प्रसारित करने से पहले उत्पन्न कैटलॉग विवरण की समीक्षा करें।'
              : 'Review generated catalog details before broadcasting to domestic & global buyers.'}
          </p>
        </div>

        {/* Hero Product Imagery with 360 / GI Hologram */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#ebefea] shadow-md border border-[#dfe4df]">
          <div className="overflow-hidden aspect-[4/3] flex items-center justify-center bg-black/5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv0iZ1nTk3M8slMy8_yvD5b_aIubj-WEwQko-JblyGURQHDYOm9dJ7m1B6M6QwEY57kIDVUcCpF6V4uhCdkJgxaWo0UTUD7b6f-635vEY-yLaM_y8JBYDQHXSDZzE3w6Ip8rhgaK5yXTlGE-Z9oRmRlLFTSIy0AqGBsKiJJWYdrPPHrpZjBVGOPE5GqLiNIRRSR1S_295fwc2GqxfH4uZKEDKIeqQF0prfIjIW5s3Ii_lO7iRB1eXX"
              alt="Terracotta Vase"
              className="w-full h-full object-cover transition-all duration-300"
              style={{
                transform: `rotate(${rotationAngle}deg) scale(${zoomLevel})`,
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top GI Hologram Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
            <span className="material-symbols-outlined text-[#7b542b] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] leading-3 text-[#7b542b] uppercase tracking-wider font-bold">GI Tagged Craft</span>
              <span className="text-[11px] leading-3 text-[#181d1a] font-semibold">Kutch Terracotta #829</span>
            </div>
          </div>

          {/* Top Right Sound Prompt */}
          <button
            type="button"
            aria-label="Audio description of this photo"
            onClick={() => speakText('Terracotta vase with geometric Kutch engravings, studio daylight photography.', language)}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#9f3c16] shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
          </button>

          {/* Bottom Interactive Controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#2c322e]/85 backdrop-blur-sm text-white text-[12px] font-medium">
              <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
              <span>360° Studio View</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Zoom Photo"
                onClick={handleZoom}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#181d1a] flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {zoomLevel > 1 ? 'zoom_out' : 'zoom_in'}
                </span>
              </button>
              <button
                type="button"
                aria-label="Rotate View"
                onClick={handleRotate}
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#181d1a] flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">360</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Details Card */}
        <div className="p-4 rounded-2xl bg-white shadow-sm flex flex-col gap-3 border border-[#dfe4df]">
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[18px] font-bold text-[#181d1a] leading-snug">
                Hand-Etched Kutch Terracotta Artisan Vase
              </h3>
              <button
                type="button"
                aria-label="Play title audio narration"
                onClick={() => speakText('Hand-Etched Kutch Terracotta Artisan Vase. Traditional Kutch hand-carved terracotta vase.', language)}
                className="w-8 h-8 rounded-full bg-[#e5e9e4] flex items-center justify-center text-[#9f3c16] shrink-0 active:scale-90 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">campaign</span>
              </button>
            </div>
            <p className="text-[13px] text-[#57423b] font-medium">
              Traditional Kutch hand-carved terracotta vase
            </p>
          </div>

          {/* Pricing and Fair Trade Badge */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-bold text-[#9f3c16]">
                ₹{selectedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[13px] text-[#8a726a] line-through">₹2,400</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#aeeecb] text-[#316e52]">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
              <span className="text-[12px] font-bold">Fair Trade Certified</span>
            </div>
          </div>

          {/* Shipping Information Tile */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f0f5f0] text-[#181d1a]">
            <div className="w-10 h-10 rounded-lg bg-[#dfe4df] flex items-center justify-center text-[#2c694e] shrink-0">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold truncate">Ships in 2–3 days</span>
              <span className="text-[12px] text-[#8a726a] truncate">
                Safe artisan bubble &amp; recycled straw packaging
              </span>
            </div>
          </div>
        </div>

        {/* Artisan Story Card */}
        <div className="p-4 rounded-2xl bg-white shadow-sm flex flex-col gap-3 border border-[#dfe4df]">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={ARTISAN_PROFILE.avatar}
                alt={ARTISAN_PROFILE.name}
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#2c694e]/30"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#2c694e] ring-2 ring-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[16px] font-bold text-[#181d1a] truncate">Shanti Devi</h4>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#ffdbcf] text-[#822801] font-bold">
                  Guild Master
                </span>
              </div>
              <p className="text-[12px] text-[#57423b] truncate">
                Master Potter, Bhuj Guild • 24 Years Practice
              </p>
            </div>
          </div>

          {/* Interactive Voice Snippet Card */}
          <div className="p-3 rounded-xl bg-[#ebefea] flex items-center justify-between gap-3 border border-[#dfe4df]">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                aria-label="Play artisan voice story"
                onClick={handleVoiceStory}
                className="w-12 h-12 rounded-full bg-[#9f3c16] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-[#bf542c]"
              >
                <span className="material-symbols-outlined text-[26px]">
                  {isPlayingStory ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="flex flex-col min-w-0">
                <p className="text-[14px] font-bold text-[#181d1a] truncate">
                  {isHindi ? 'शिल्पकार की आवाज़ में कहानी' : 'Artisan Voice Story'}
                </p>
                <p className="text-[12px] text-[#8a726a] truncate">
                  {isHindi ? 'गुजराती व हिन्दी ऑडियो अनुवाद' : 'Gujarati audio narrative (with English translation)'}
                </p>
              </div>
            </div>

            {/* Waveform Simulation */}
            <div className="flex items-center gap-1 shrink-0 px-1">
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingStory ? 'h-5 animate-pulse' : 'h-3'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingStory ? 'h-7 animate-pulse' : 'h-6'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingStory ? 'h-4 animate-pulse' : 'h-3'}`} />
              <span className={`w-1 rounded-full bg-[#9f3c16] ${isPlayingStory ? 'h-8 animate-pulse' : 'h-5'}`} />
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="p-4 rounded-2xl bg-white shadow-sm flex flex-col gap-3 border border-[#dfe4df]">
          <h4 className="text-[16px] font-bold text-[#181d1a]">Product Specifications</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f5f0]">
              <span className="text-[13px] text-[#8a726a]">Material</span>
              <span className="text-[14px] text-[#181d1a] font-semibold text-right">
                Natural Riverbed Terracotta
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f5f0]">
              <span className="text-[13px] text-[#8a726a]">Dimensions</span>
              <span className="text-[14px] text-[#181d1a] font-semibold text-right">
                25 cm × 18 cm (1.4 kg)
              </span>
            </div>
            <div className="flex items-start justify-between p-2.5 rounded-lg bg-[#f0f5f0] gap-4">
              <span className="text-[13px] text-[#8a726a] shrink-0">Care Instructions</span>
              <span className="text-[13px] text-[#181d1a] font-medium text-right">
                Wipe with dry cotton cloth, safe for fresh water flowers
              </span>
            </div>
          </div>
        </div>

        {/* Digital Channels Multi-Publish Selection */}
        <div className="p-4 rounded-2xl bg-white shadow-sm flex flex-col gap-3 border border-[#dfe4df]">
          <div className="flex items-center justify-between">
            <h4 className="text-[16px] font-bold text-[#181d1a]">Publishing Destinations</h4>
            <span className="text-[12px] text-[#9f3c16] font-bold">3 Channels</span>
          </div>
          <p className="text-[13px] text-[#8a726a]">
            Your item syncs directly into open commerce protocols and direct buyer storefronts.
          </p>

          <div className="flex flex-col gap-2">
            {/* Channel 1 */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f0f5f0] cursor-pointer hover:bg-[#ebefea] transition-colors border border-[#dfe4df]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#ffdbcf] flex items-center justify-center text-[#390c00] font-bold">
                  <span className="material-symbols-outlined text-[22px]">hub</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#181d1a]">KALAMITRA Global Craft Guild</span>
                  <span className="text-[12px] text-[#8a726a]">Global diaspora &amp; verified patrons</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={destinations.kalamitra}
                onChange={() => setDestinations({ ...destinations, kalamitra: !destinations.kalamitra })}
                className="w-5 h-5 rounded accent-[#9f3c16] cursor-pointer"
              />
            </label>

            {/* Channel 2 */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f0f5f0] cursor-pointer hover:bg-[#ebefea] transition-colors border border-[#dfe4df]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#b1f0ce] flex items-center justify-center text-[#002114] font-bold">
                  <span className="material-symbols-outlined text-[22px]">storefront</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#181d1a]">ONDC Network (Govt. Gateway)</span>
                  <span className="text-[12px] text-[#8a726a]">Reaches 14+ Indian buyer applications</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={destinations.ondc}
                onChange={() => setDestinations({ ...destinations, ondc: !destinations.ondc })}
                className="w-5 h-5 rounded accent-[#9f3c16] cursor-pointer"
              />
            </label>

            {/* Channel 3 */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f0f5f0] cursor-pointer hover:bg-[#ebefea] transition-colors border border-[#dfe4df]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#dfe4df] flex items-center justify-center text-[#181d1a] font-bold">
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#181d1a]">Direct WhatsApp Shop Link</span>
                  <span className="text-[12px] text-[#8a726a]">Shareable catalog link for neighborhood orders</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={destinations.whatsapp}
                onChange={() => setDestinations({ ...destinations, whatsapp: !destinations.whatsapp })}
                className="w-5 h-5 rounded accent-[#9f3c16] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Action Fixed Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#f6fbf5]/95 backdrop-blur-xl p-4 shadow-[0_-4px_20px_rgba(31,36,33,0.08)] flex flex-col gap-2 border-t border-[#dfe4df]">
        <div className="max-w-md mx-auto w-full flex flex-col gap-2">
          <button
            type="button"
            disabled={isPublishing}
            onClick={handlePublish}
            className={`w-full h-14 rounded-full text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer ${
              published
                ? 'bg-[#2c694e]'
                : isPublishing
                ? 'bg-[#bf542c]'
                : 'bg-[#9f3c16] hover:bg-[#bf542c]'
            }`}
          >
            {isPublishing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
                <span>{isHindi ? 'ONDC पर प्रसारित हो रहा है...' : 'Broadcasting to ONDC & Kalamitra...'}</span>
              </>
            ) : published ? (
              <>
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
                <span>{isHindi ? 'सफलतापूर्वक प्रकाशित हुआ! 🎉' : 'Published Successfully! 🎉'}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                <span>{isHindi ? 'स्वीकृत करें और बाज़ार में प्रकाशित करें' : 'Approve & Publish to Marketplace'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onEditWithVoice}
            className="w-full h-12 rounded-full bg-[#e5e9e4] hover:bg-[#dfe4df] text-[#181d1a] text-[14px] font-semibold flex items-center justify-center gap-2 active:bg-[#dfe4df] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">mic</span>
            <span>{isHindi ? 'आवाज़ से सुधारें' : 'Edit with Voice'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
