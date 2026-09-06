import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { speakText } from '../../utils/speech';

interface VoiceStudioScreenProps {
  language: Language;
  onGenerateCatalog: () => void;
  onCancel: () => void;
}

export const VoiceStudioScreen: React.FC<VoiceStudioScreenProps> = ({
  language,
  onGenerateCatalog,
  onCancel,
}) => {
  const [seconds, setSeconds] = useState(0); // starts from 00:00
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isRecording || isPaused) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleMicToggle = () => {
    if (isPaused) {
      setIsPaused(false);
      setIsRecording(true);
    } else {
      setIsPaused(true);
    }
  };

  const handleRestart = () => {
    setSeconds(0);
    setIsPaused(false);
    setIsRecording(true);
  };

  const transcriptText = language === 'ta'
    ? '“இது கட்ச் சிவப்பு களிமண்ணால் குயவர் சக்கரத்தில் பழங்குடி செதுக்கப்பட்ட வடிவங்களுடன் செய்யப்பட்ட சுடுமண் பானை. உயரம் சுமார் 10 அங்குலம், செடி நட அல்லது குடிநீரைக் குளிர்ச்சியாக வைத்திருக்க ஏற்றது...”'
    : language === 'hi' 
    ? '“यह पारंपरिक कुम्हार के चाक पर कच्छ की लाल मिट्टी से हस्तनिर्मित मिट्टी का पात्र है, जिस पर आदिवासी नक्काशीदार पैटर्न उकेरे गए हैं। ऊंचाई लगभग १० इंच है, जो रोपण या पीने के पानी को ठंडा रखने के लिए उत्तम है...”'
    : '“This is an earthen terracotta pot handcrafted on the potter wheel using Kutch red clay with tribal etched patterns. Height is approximately 10 inches, perfect for planting or keeping drinking water cool...”';

  return (
    <div className="flex flex-col w-full pb-24 pt-2 max-w-md mx-auto">
      {/* Top Ambient Context Bar */}
      <section className="px-4 pt-2 pb-3">
        <div className="bg-[#f0f5f0] rounded-2xl p-3 flex flex-col gap-2 shadow-sm border border-[#dfe4df]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-8 h-8 rounded-full bg-[#ffdbcf] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#9f3c16] text-[18px]">
                  record_voice_over
                </span>
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-[#181d1a] font-bold truncate">
                  {language === 'ta' ? 'தமிழ் • முதன்மை' : language === 'hi' ? 'हिन्दी • प्राथमिक' : 'English • Primary'}
                </span>
                <span className="text-[12px] text-[#2c694e] truncate">
                  {language === 'ta' ? 'குரல் அறிதல் செயலில் உள்ளது (தமிழ்)' : language === 'hi' ? 'वाणी पहचान सक्रिय (हिन्दी)' : 'Speech recognition active (English)'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => speakText(transcriptText, language)}
              className="h-9 px-3 rounded-full bg-[#dfe4df] text-[#181d1a] hover:bg-[#e5e9e4] transition-all flex items-center gap-1 active:scale-95 shrink-0 cursor-pointer"
            >
              <span className="text-[12px] font-semibold">{language === 'ta' ? 'மாற்று' : language === 'hi' ? 'बदलें' : 'Change'}</span>
              <span className="material-symbols-outlined text-[16px] text-[#8a726a]">tune</span>
            </button>
          </div>

          {/* Live Audio Clarity Status Strip */}
          <div className="flex items-center justify-between px-1 pt-1 border-t border-[#dfe4df]/60">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2c694e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2c694e]" />
              </span>
              <span className="text-[12px] text-[#2c694e] font-bold tracking-tight">
                {language === 'ta' ? 'தெளிவான குரல் பதிவு • 98% துல்லியம்' : language === 'hi' ? 'स्पष्ट आवाज़ रिकॉर्ड हो रही है • ९८% सटीकता' : 'Listening clearly • 98% Speech Clarity'}
              </span>
            </div>
            <span className="text-[12px] text-[#57423b] font-medium">Active Mic</span>
          </div>
        </div>
      </section>

      {/* Central Hero Voice Interaction Sphere */}
      <section className="flex flex-col items-center justify-center px-4 py-4 relative overflow-hidden">
        {/* Animated Concentric Wave Rings */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#9f3c16]/10 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-52 h-52 rounded-full bg-[#aeeecb]/40 animate-pulse" style={{ animationDuration: '2.2s' }} />
          <div className="absolute w-40 h-40 rounded-full bg-[#ffdbcf]/60 animate-ping" style={{ animationDuration: '4s' }} />

          {/* Giant Pulsating Mic Button (136px) */}
          <button
            type="button"
            aria-label="Microphone active recording"
            onClick={handleMicToggle}
            className="relative z-10 w-36 h-36 rounded-full bg-[#9f3c16] text-white shadow-2xl flex flex-col items-center justify-center transition-transform active:scale-90 select-none cursor-pointer hover:bg-[#bf542c]"
          >
            <span className="material-symbols-outlined text-[52px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
            <span className="text-[12px] tracking-wider uppercase font-bold mt-1 text-[#ffdbcf]">
              {isPaused ? (language === 'ta' ? 'நிறுத்தப்பட்டது' : language === 'hi' ? 'रुका हुआ' : 'Paused') : (language === 'ta' ? 'பதிவாகிறது' : language === 'hi' ? 'रिकॉर्डिंग' : 'Recording')}
            </span>
          </button>
        </div>

        {/* Timer Indicator & Comfort Guidance */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e5e9e4] text-[#181d1a] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#9f3c16] animate-pulse" />
            <span className="text-[18px] tracking-tight text-[#9f3c16] font-bold">
              {formatTimer(seconds)}
            </span>
            <span className="text-[12px] text-[#8a726a]">|</span>
            <span className="text-[12px] text-[#57423b]">
              {language === 'ta' ? 'உங்கள் கைவினைப்பொருள் பற்றி தமிழில் பேசவும்' : language === 'hi' ? 'अपने शिल्प के बारे में सहजता से बताएं' : 'Speak naturally about your craft in English'}
            </span>
          </div>
        </div>

        {/* Dynamic Audio Waveform Canvas Visualizer */}
        <div className="w-full max-w-sm mt-4 px-2">
          <div className="h-12 bg-[#f0f5f0] rounded-2xl flex items-center justify-between px-4 gap-1.5 overflow-hidden shadow-sm border border-[#dfe4df]">
            {[14, 26, 36, 48, 28, 42, 18, 40, 52, 34, 22, 44, 30, 16].map((h, idx) => (
              <span
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  idx % 3 === 0 ? 'bg-[#9f3c16]' : idx % 3 === 1 ? 'bg-[#bf542c]' : 'bg-[#2c694e]'
                } ${isPaused ? 'h-3 opacity-40' : 'animate-pulse'}`}
                style={{
                  height: isPaused ? '8px' : `${Math.max(10, (h * (isRecording ? 1 : 0.4)))}px`,
                  animationDelay: `${idx * 80}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Live Speech-to-Text Transcription Banner */}
      <section className="px-4 mt-2">
        <div className="bg-[#ffffff] rounded-3xl p-4 shadow-md flex flex-col gap-2 relative overflow-hidden border border-[#dfe4df]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#ffdbcf]/40 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#2c694e]" />
              <span className="text-[12px] uppercase tracking-wider text-[#2c694e] font-bold">
                {language === 'ta' ? 'நேரலை உரைவடிவம் • AI மொழிபெயர்ப்பு' : language === 'hi' ? 'लाइव प्रतिलेखन • AI अनुवादित' : 'Live Transcription • AI Translated'}
              </span>
            </div>
            <button
              type="button"
              aria-label="Listen back"
              onClick={() => speakText(transcriptText, language)}
              className="w-8 h-8 rounded-full bg-[#ebefea] flex items-center justify-center text-[#181d1a] hover:bg-[#e5e9e4] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
            </button>
          </div>

          <p className="text-[15px] text-[#181d1a] leading-relaxed font-semibold">
            {transcriptText}
          </p>
        </div>
      </section>

      {/* Real-Time AI Attribute Extraction Badges */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9f3c16] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <h2 className="text-[18px] text-[#181d1a] font-bold">
              {language === 'ta' ? 'தானாக பெறப்பட்ட விவரங்கள்' : language === 'hi' ? 'स्वतः निकाले गए विवरण' : 'Auto-Extracted Details'}
            </h2>
          </div>
          <span className="text-[12px] text-[#2c694e] font-bold bg-[#aeeecb] px-2 py-0.5 rounded-full">
            4 {language === 'ta' ? 'சரிபார்க்கப்பட்டது' : language === 'hi' ? 'सत्यापित' : 'Verified'}
          </span>
        </div>

        {/* Badges Grid (2x2) */}
        <div className="grid grid-cols-2 gap-2">
          {/* Badge 1: Material */}
          <div className="bg-[#ffffff] rounded-2xl p-3 shadow-sm flex items-start gap-2.5 border border-[#dfe4df]/60">
            <span className="w-6 h-6 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-[#8a726a] truncate">Material</span>
              <span className="text-[14px] text-[#181d1a] font-bold truncate">Red Terracotta</span>
              <span className="text-[12px] text-[#57423b] truncate">Natural clay</span>
            </div>
          </div>

          {/* Badge 2: Technique */}
          <div className="bg-[#ffffff] rounded-2xl p-3 shadow-sm flex items-start gap-2.5 border border-[#dfe4df]/60">
            <span className="w-6 h-6 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-[#8a726a] truncate">Technique</span>
              <span className="text-[14px] text-[#181d1a] font-bold truncate">Wheel-thrown</span>
              <span className="text-[12px] text-[#57423b] truncate">Hand crafted</span>
            </div>
          </div>

          {/* Badge 3: Dimensions */}
          <div className="bg-[#ffffff] rounded-2xl p-3 shadow-sm flex items-start gap-2.5 border border-[#dfe4df]/60">
            <span className="w-6 h-6 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-[#8a726a] truncate">Dimensions</span>
              <span className="text-[14px] text-[#181d1a] font-bold truncate">~10 In Height</span>
              <span className="text-[12px] text-[#57423b] truncate">Pot height ~10 in</span>
            </div>
          </div>

          {/* Badge 4: Utility */}
          <div className="bg-[#ffffff] rounded-2xl p-3 shadow-sm flex items-start gap-2.5 border border-[#dfe4df]/60">
            <span className="w-6 h-6 rounded-full bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] text-[#8a726a] truncate">Utility</span>
              <span className="text-[14px] text-[#181d1a] font-bold truncate">Planter / Cooler</span>
              <span className="text-[12px] text-[#57423b] truncate">Multipurpose</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rotating Guidance Prompt Carousel Card */}
      <section className="px-4 mt-3">
        <div className="bg-[#aeeecb]/40 border border-[#2c694e]/20 rounded-2xl p-3 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2c694e] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">tips_and_updates</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[11px] text-[#316e52] uppercase tracking-wider font-bold">
              {language === 'ta' ? 'கைவினைஞர் குறிப்பு' : language === 'hi' ? 'शिल्पकार सलाह' : 'Artisan Tip'}
            </span>
            <p className="text-[13px] text-[#181d1a] font-semibold truncate">
              {language === 'ta' ? 'தயாரிப்பு நேரம் (எ.கா. 2 நாட்கள்) மற்றும் பராமரிப்பு முறையைக் கூறவும்' : language === 'hi' ? 'समय (उदा. २ दिन) और रखरखाव निर्देश जोड़ें' : 'Mention: Time taken (e.g. 2 days) & care instructions'}
            </p>
            <span className="text-[11px] text-[#57423b]">
              {language === 'ta' ? 'வாங்குபவர்களுக்கு கழுவும் அல்லது பராமரிக்கும் முறையை விளக்குங்கள்' : language === 'hi' ? 'खरीदारों को इसे धोने या संभालने का तरीका बताएं' : 'Tell buyers how to wash or maintain this product'}
            </span>
          </div>
        </div>
      </section>

      {/* Tactile Bottom Control Bar */}
      <section className="px-4 mt-5 flex flex-col gap-2.5">
        {/* Primary Big Action: Stop & Generate Catalog */}
        <button
          type="button"
          onClick={onGenerateCatalog}
          className="w-full h-14 rounded-full bg-[#9f3c16] hover:bg-[#bf542c] text-white shadow-xl flex items-center justify-center gap-2 text-[18px] font-bold transition-transform active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <span>{language === 'ta' ? 'AI பட்டியலை உருவாக்கவும்' : language === 'hi' ? 'AI कैटलॉग तैयार करें' : 'Generate AI Catalog'}</span>
        </button>

        {/* Secondary Tactile Controls Pair */}
        <div className="grid grid-cols-2 gap-2">
          {/* Pause Voice Button */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="h-13 rounded-2xl bg-[#e5e9e4] hover:bg-[#dfe4df] text-[#181d1a] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#7b542b] text-[22px]">
              {isPaused ? 'play_circle' : 'pause_circle'}
            </span>
            <span className="text-[14px] font-bold">
              {isPaused ? (language === 'ta' ? 'தொடரவும்' : language === 'hi' ? 'जारी रखें' : 'Resume') : (language === 'ta' ? 'இடைநிறுத்து' : language === 'hi' ? 'रोकें' : 'Pause')}
            </span>
          </button>

          {/* Restart Recording Button */}
          <button
            type="button"
            onClick={handleRestart}
            className="h-13 rounded-2xl bg-[#e5e9e4] hover:bg-[#dfe4df] text-[#181d1a] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#8a726a] text-[22px]">refresh</span>
            <span className="text-[14px] font-bold">
              {language === 'ta' ? 'மீண்டும் தொடங்கு' : language === 'hi' ? 'फिर से बोलें' : 'Restart'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
