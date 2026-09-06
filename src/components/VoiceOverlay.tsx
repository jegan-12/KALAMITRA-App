import React, { useEffect, useState } from 'react';
import { speakText } from '../utils/speech';
import { Language } from '../types';

interface VoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCataloging: () => void;
  language: Language;
}

export const VoiceOverlay: React.FC<VoiceOverlayProps> = ({
  isOpen,
  onClose,
  onStartCataloging,
  language,
}) => {
  const [transcript, setTranscript] = useState('"Large terracotta vase, 5 kg weight..."');
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    // Simulate animated speech recognition listening
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 400);

    const phrasesEn = [
      '"Large terracotta vase, 5 kg weight..."',
      '"Made on potter wheel with natural Kutch red clay..."',
      '"Say \'Add new craft\' or tap here..."'
    ];
    const phrasesHi = [
      '"बड़ा मिट्टी का फूलदान, ५ किलो वज़न..."',
      '"कच्छ की लाल मिट्टी से चाक पर बना हुआ..."',
      '"नया शिल्प जोड़ने के लिए बोलें..."'
    ];

    const chosen = language === 'hi' ? phrasesHi : phrasesEn;
    let i = 0;
    const textInterval = setInterval(() => {
      i = (i + 1) % chosen.length;
      setTranscript(chosen[i]);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isOpen, language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-24 z-50 px-4 max-w-md mx-auto pointer-events-auto transition-all duration-300">
      <div className="bg-[#ffffff] p-4 rounded-2xl shadow-2xl border border-[#dec0b7]/60 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
        <div 
          className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
          onClick={onStartCataloging}
        >
          <div className="w-12 h-12 rounded-full bg-[#9f3c16] text-[#ffffff] flex items-center justify-center animate-bounce shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[28px]">mic</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] text-[#9f3c16] font-bold uppercase tracking-wider flex items-center gap-1">
              <span>{language === 'hi' ? 'सुन रहा हूँ' : 'Listening'}</span>
              <span className="w-4">{dots}</span>
            </span>
            <span className="text-[14px] text-[#181d1a] font-semibold truncate mt-0.5">
              {transcript}
            </span>
            <span className="text-[11px] text-[#2c694e] font-medium">
              {language === 'hi' ? 'शिल्प सूची बनाने के लिए टैप करें' : 'Tap to create voice catalog'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Voice Overlay"
          className="w-9 h-9 rounded-full bg-[#dfe4df] hover:bg-[#d7dbd6] flex items-center justify-center text-[#181d1a] shrink-0 active:scale-90 transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
};
