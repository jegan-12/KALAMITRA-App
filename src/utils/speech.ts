/**
 * Speech synthesis and voice assistance utilities for Kalamitra
 */

import { Language } from '../types';

export const speakText = (text: string, lang: Language = 'en') => {
  if (typeof window === 'undefined') return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose voice based on language
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = null;

    if (lang === 'hi') {
      preferredVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
    } else if (lang === 'gu') {
      preferredVoice = voices.find(v => v.lang.includes('gu') || v.name.includes('Gujarati'));
    } else if (lang === 'ta') {
      preferredVoice = voices.find(v => v.lang.includes('ta') || v.name.includes('Tamil'));
    } else {
      preferredVoice = voices.find(v => v.lang.includes('en-IN') || (v.lang.includes('en') && !v.name.includes('David')));
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.95; // slightly slower for maximum clarity for artisans
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.log('Speech synthesis not supported in this browser environment');
  }
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
