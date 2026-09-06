export type Language = 'en' | 'hi' | 'gu' | 'ta';

export type MainTab = 
  | 'home' 
  | 'products' 
  | 'voice-studio' 
  | 'extracted-catalog' 
  | 'photo-enhancer' 
  | 'fair-pricing' 
  | 'review-publish' 
  | 'marketplace' 
  | 'market' 
  | 'profile';

export type AddProductStep = 
  | 'voice-recording' 
  | 'extracted-details' 
  | 'photo-enhancer' 
  | 'fair-pricing' 
  | 'review-publish';

export interface CraftItem {
  id: string;
  title: string;
  titleHi?: string;
  subtitle: string;
  subtitleHi?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  craftForm?: string;
  location?: string;
  status: 'live' | 'draft' | 'syncing' | 'dispatch';
  statusLabel: string;
  statusLabelHi?: string;
  views?: number;
  inquiries?: number;
  buyersReady?: number;
  giTagEligible?: boolean;
  giNumber?: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  enhancedImage?: string;
  rawImage?: string;
  badge?: string;
  fairPriceVerified?: boolean;
  ondcLive?: boolean;
  dimensions?: string;
  material?: string;
  story?: string;
}

export interface ExtractedDetails {
  title: string;
  category: string;
  guild: string;
  material: string;
  subMaterial: string;
  dimensions: {
    height: string;
    width: string;
    weight: string;
  };
  finish: string;
  story: string;
  tags: string[];
  suggestedPrice: number;
}

export interface ArtisanProfile {
  name: string;
  nameHi: string;
  title: string;
  titleHi: string;
  location: string;
  avatar: string;
  guild: string;
  experience?: string;
  experienceYears: number;
  giCertId: string;
  ondcId: string;
  catalogHealth: number;
  activeCrafts: number;
  monthlyEarnings: number;
  offlineSyncQueue: number;
}
