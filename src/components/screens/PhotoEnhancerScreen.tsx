import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface PhotoEnhancerScreenProps {
  language: Language;
  onContinue: () => void;
  onRetake: () => void;
}

export const PhotoEnhancerScreen: React.FC<PhotoEnhancerScreenProps> = ({
  language,
  onContinue,
  onRetake,
}) => {
  const [sliderPos, setSliderPos] = useState(52); // Percentage
  const [selectedStyle, setSelectedStyle] = useState<'minimal' | 'wood' | 'heritage'>('minimal');
  const stageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const isHindi = language === 'hi';

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updatePosition = (clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    setSliderPos((offsetX / rect.width) * 100);
  };

  const handleListenGuide = () => {
    speakText(
      isHindi
        ? 'हमने आपकी कार्यशाला की अव्यवस्था हटा दी है और प्राकृतिक ५००० केल्विन स्टूडियो रोशनी जोड़ दी है। धातु की चमक और बनावट बिल्कुल प्राकृतिक है।'
        : 'We removed your workshop clutter and infused balanced 5000K natural daylight. All brass engravings and lost-wax Dhokra ridges are preserved with zero glare.',
      language
    );
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 max-w-md mx-auto">
      {/* Value Proposition & Intro Header */}
      <div className="flex flex-col gap-1 mt-1 mb-3">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_fix_high
          </span>
          <span className="text-[12px] font-bold">
            {isHindi ? 'स्टूडियो AI फोटो संवर्धन' : 'Studio AI Enhancement'}
          </span>
        </div>
        <h2 className="text-[22px] font-bold text-[#181d1a] mt-1 leading-snug">
          {isHindi ? 'AI स्टूडियो फोटोग्राफी जादू' : 'AI Studio Photography Magic'}
        </h2>
        <p className="text-[14px] text-[#57423b]">
          {isHindi
            ? 'कार्यशाला की सामान्य तस्वीरों को प्राकृतिक रोशनी और साफ़ बनावट वाली ई-कॉमर्स लिस्टिंग में बदलें।'
            : 'Turn rustic workshop snaps into pristine e-commerce listings with balanced daylight and crisp textures.'}
        </p>
      </div>

      {/* Interactive Comparison Frame */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-md flex flex-col border border-[#dfe4df]">
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full aspect-[4/3] select-none touch-none overflow-hidden bg-[#e5e9e4] cursor-ew-resize"
        >
          {/* BEFORE Image Layer (Full Base Layer) */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ChOyJncUIcW4_ZXrNgZORPdmfmRtHSuTjvIYyBQfAco7GVu2ogjdvAuMIOGxtqY1o8zC0lyuteyyubxYnjCAxkczjgHWVIyxHGx6vda5PsJo1UlYiLCWHqfQZ2MJaWz_r-2xAf4rWprcPxU0cNSzkIPTgaM31c-FhAAPCN07aoS1BHSHWSe_EkRKI59wOjOc20917237TxVpu-ri_-bv-v8xFwJoiL1xm4BN78BoxTP8ELyo7map"
            alt="Original workshop photo with dim lighting"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* AFTER Image Layer (Clipped dynamically based on slider position) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none transition-none"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full" style={{ width: stageRef.current ? `${stageRef.current.clientWidth}px` : '100%' }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxmS51B2jBIBbGX_MqBlyb1MsuJoRbaLDlsgtHRBVnezysaDvl0k9kjNHOTBVWrJUHXK6A6mZH-kNNalpKBF7jRvOcri14dtGbAyP9AMM9b4bCJjPzWJQ1yNmAsz93PgHSywAWIfYAVguMVvQ_t1ppPxSFHzYTlwT2bRmaxxP27-abmHzC6tQI2Vxttr1QGpDcKwYT75HdMqTRCxBdDpQXcpXGmMzvG-vaiXQFYgxOZFhTAYqD2HCf"
                alt="AI enhanced studio photo"
                className="absolute inset-y-0 left-0 h-full w-full object-cover max-w-none pointer-events-none"
              />
            </div>
          </div>

          {/* Before Tag Badge */}
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-[#d7dbd6]/90 backdrop-blur-md shadow-sm pointer-events-none">
            <span className="text-[12px] text-[#181d1a] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#8a726a]" />
              {isHindi ? 'मूल (पहले)' : 'Original (Before)'}
            </span>
          </div>

          {/* After Tag Badge */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-[#2c694e]/90 backdrop-blur-md text-white shadow-sm pointer-events-none">
            <span className="text-[12px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              {isHindi ? 'AI स्टूडियो (बाद में)' : 'AI Studio (After)'}
            </span>
          </div>

          {/* Divider & Draggable Handle */}
          <div
            className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-1 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-11 h-11 rounded-full bg-white text-[#9f3c16] shadow-xl flex items-center justify-center transition-transform active:scale-95 border border-[#dfe4df]">
              <span className="material-symbols-outlined text-[22px]">compare_arrows</span>
            </div>
          </div>
        </div>

        {/* Micro-instruction bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f0f5f0] text-[#57423b] border-t border-[#dfe4df]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#2c694e] text-[20px]">swipe</span>
            <span className="text-[12px] font-medium">
              {isHindi ? 'तुलना करने के लिए स्लाइडर को खींचे' : 'Drag slider to compare Before & After'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleListenGuide}
            className="inline-flex items-center gap-1 text-[#9f3c16] active:scale-95 font-bold text-[12px] cursor-pointer hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">volume_up</span>
            <span>{isHindi ? 'मार्गदर्शिका सुनें' : 'Listen to AI Guide'}</span>
          </button>
        </div>
      </div>

      {/* Audio Coach Bubble */}
      <div className="mt-3.5 p-3.5 rounded-xl bg-[#ebefea] flex items-start gap-3 border border-[#dfe4df]/50">
        <div className="w-10 h-10 rounded-full bg-[#bf542c] text-white flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-[#9f3c16] font-bold">KALAMITRA AI • Voice Coach</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]" />
          </div>
          <p className="text-[14px] text-[#181d1a] font-semibold mt-0.5">
            "We removed your workshop clutter and infused balanced 5000K natural daylight."
          </p>
          <span className="text-[13px] text-[#57423b] mt-0.5">
            All brass engravings and lost-wax Dhokra ridges are preserved with zero glare.
          </span>
        </div>
      </div>

      {/* Studio Lighting & Backdrop Style Pills */}
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#181d1a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9f3c16] text-[20px]">palette</span>
            <span>{isHindi ? 'स्टूडियो शैली चुनें' : 'Select Studio Style'}</span>
          </h3>
          <span className="text-[12px] text-[#2c694e] font-semibold">3 Instant Styles</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Style 1 */}
          <button
            type="button"
            onClick={() => setSelectedStyle('minimal')}
            className={`flex flex-col items-center p-3 rounded-xl shadow-sm text-center relative active:scale-95 transition-all cursor-pointer ${
              selectedStyle === 'minimal'
                ? 'bg-[#9f3c16] text-white'
                : 'bg-[#f0f5f0] text-[#181d1a] hover:bg-[#ebefea]'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              selectedStyle === 'minimal' ? 'bg-white text-[#9f3c16]' : 'bg-[#e5e9e4] text-[#181d1a]'
            }`}>
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
            </div>
            <span className="text-[12px] font-bold truncate">Minimal Studio</span>
            {selectedStyle === 'minimal' && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#2c694e] text-white flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </span>
            )}
          </button>

          {/* Style 2 */}
          <button
            type="button"
            onClick={() => setSelectedStyle('wood')}
            className={`flex flex-col items-center p-3 rounded-xl shadow-sm text-center relative active:scale-95 transition-all cursor-pointer ${
              selectedStyle === 'wood'
                ? 'bg-[#9f3c16] text-white'
                : 'bg-[#f0f5f0] text-[#181d1a] hover:bg-[#ebefea]'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              selectedStyle === 'wood' ? 'bg-white text-[#9f3c16]' : 'bg-[#ffdcbd] text-[#2c1600]'
            }`}>
              <span className="material-symbols-outlined text-[18px]">deck</span>
            </div>
            <span className="text-[12px] font-bold truncate">Wooden Table</span>
            {selectedStyle === 'wood' && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#2c694e] text-white flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </span>
            )}
          </button>

          {/* Style 3 */}
          <button
            type="button"
            onClick={() => setSelectedStyle('heritage')}
            className={`flex flex-col items-center p-3 rounded-xl shadow-sm text-center relative active:scale-95 transition-all cursor-pointer ${
              selectedStyle === 'heritage'
                ? 'bg-[#9f3c16] text-white'
                : 'bg-[#f0f5f0] text-[#181d1a] hover:bg-[#ebefea]'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              selectedStyle === 'heritage' ? 'bg-white text-[#9f3c16]' : 'bg-[#b1f0ce] text-[#002114]'
            }`}>
              <span className="material-symbols-outlined text-[18px]">cottage</span>
            </div>
            <span className="text-[12px] font-bold truncate">Heritage Corner</span>
            {selectedStyle === 'heritage' && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#2c694e] text-white flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* AI Enhancement Breakdown List */}
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-[16px] font-bold text-[#181d1a] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#2c694e] text-[20px]">checklist</span>
          <span>{isHindi ? 'संवर्धन विवरण' : 'Enhancement Breakdown'}</span>
        </h3>

        <div className="flex flex-col gap-2 mt-1">
          {/* Item 1 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#dfe4df]">
            <div className="w-8 h-8 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] text-[#181d1a] font-semibold">Workshop clutter removed</span>
              <span className="text-[12px] text-[#57423b]">Replaced floor tools with seamless off-white backdrop</span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#dfe4df]">
            <div className="w-8 h-8 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] text-[#181d1a] font-semibold">Balanced 5000K warm daylight</span>
              <span className="text-[12px] text-[#57423b]">Soft studio key lighting eliminates harsh workshop shadow</span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#dfe4df]">
            <div className="w-8 h-8 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">flare</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] text-[#181d1a] font-semibold">Dhokra brass highlights sharpened</span>
              <span className="text-[12px] text-[#57423b]">Handcrafted metal coils and patina glints amplified</span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#dfe4df]">
            <div className="w-8 h-8 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">hd</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] text-[#181d1a] font-semibold">4K Ultra-clarity texture preservation</span>
              <span className="text-[12px] text-[#57423b]">Every authentic artisan thumb imprint remains tactile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="flex flex-col gap-2.5 mt-5">
        <button
          type="button"
          onClick={onContinue}
          className="w-full h-14 rounded-full bg-[#9f3c16] hover:bg-[#bf542c] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{isHindi ? 'यह संवर्धित फोटो रखें और आगे बढ़ें' : 'Keep Enhanced Photo & Continue'}</span>
          <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={onRetake}
          className="w-full h-13 rounded-full bg-[#e5e9e4] hover:bg-[#dfe4df] text-[#9f3c16] text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          <span>{isHindi ? 'वॉइस गाइड के साथ दोबारा फोटो लें' : 'Re-take Photo with Voice Guide'}</span>
        </button>
      </div>
    </div>
  );
};
