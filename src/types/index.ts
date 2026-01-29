// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  tileImage?: string | null;
  images: string[];
  whatWeDo: string[];
  faq?: FAQItem[];
  serviceArea?: string[];
  assetFolder?: string; // ImgBB album URL for field work images
  websites?: Website[];
  contact: {
    phone: string;
    email: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Website {
  name: string;
  url: string;
  description?: string;
}

export type Language = 'en' | 'hi' | 'mr';

export type ServiceId =
  | 'solar-setup'
  | 'websites-mobile-app-development'
  | 'plumber'
  | 'electrician'
  | 'interior-designs'
  | 'elevations'
  | 'furnitures'
  | 'raw-materials'
  | 'windows-doors-mesh'
  | 'steel-iron-railings'
  | 'glass-homes'
  | 'pop-puc-services'
  | 'layout-planning'
  | 'painting'
  | 'floor-and-tiles'
  | 'carpentry'
  | 'office-setup'
  | 'gardening'
  | 'construction';

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  ServiceDetails: { serviceId: ServiceId };
};

