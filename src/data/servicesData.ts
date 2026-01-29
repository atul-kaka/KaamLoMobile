/**
 * Service Data Configuration
 * 
 * This file contains all service data in a data-driven format.
 * To add a new service, simply add a new entry to the SERVICES_DATA object.
 * 
 * DATA STRUCTURE:
 * - id: Unique service identifier (kebab-case)
 * - icon: Emoji or icon for the service
 * - tileImage: Image URL from Azure Blob Storage
 * - title: Service title (base language - English)
 * - subtitle: Service description/subtitle (base language - English)
 * - images: Array of "Our Work" image URLs or paths
 * - assetFolder: (Deprecated) Previously used for ImgBB album URL, now field work images are loaded from Azure Blob Storage
 * - whatWeDo: Array of service offerings (base language - English)
 * - faq: Array of FAQ items (base language - English)
 * - serviceArea: Array of service area locations
 * - contact: Contact information (optional, defaults to main contact)
 * 
 * NOTE: Localization happens at runtime via getTranslatedService utility.
 * This file contains only the base data structure.
 */

// Azure Blob Storage base URL for home category images
const AZURE_BLOB_BASE_URL = 'https://kaamlo.blob.core.windows.net/kaamloimages/homecategories/';

// Mapping of service IDs to Azure Blob Storage image filenames
const HOME_CATEGORY_IMAGES: Record<string, string> = {
  'websites-mobile-app-development': `${AZURE_BLOB_BASE_URL}websitemobile.jpg`,
  'solar-setup': `${AZURE_BLOB_BASE_URL}solar.jpg`,
  'plumber': `${AZURE_BLOB_BASE_URL}plumber.jpg`,
  'electrician': `${AZURE_BLOB_BASE_URL}electrician.jpg`,
  'interior-designs': `${AZURE_BLOB_BASE_URL}interior.jpg`,
  'painting': `${AZURE_BLOB_BASE_URL}painting.jpg`,
  'construction': `${AZURE_BLOB_BASE_URL}construction.jpg`,
  'gardening': `${AZURE_BLOB_BASE_URL}gardening.jpg`,
  'carpentry': `${AZURE_BLOB_BASE_URL}carpentry.jpg`,
  'furnitures': `${AZURE_BLOB_BASE_URL}furniture.jpg`,
  'elevations': `${AZURE_BLOB_BASE_URL}elevations.jpg`,
  'floor-and-tiles': `${AZURE_BLOB_BASE_URL}tiles.jpg`,
  'glass-homes': `${AZURE_BLOB_BASE_URL}glass.jpg`,
  'layout-planning': `${AZURE_BLOB_BASE_URL}layout.jpg`,
  'office-setup': `${AZURE_BLOB_BASE_URL}office.jpg`,
  'windows-doors-mesh': `${AZURE_BLOB_BASE_URL}doors.jpg`,
  'steel-iron-railings': `${AZURE_BLOB_BASE_URL}railings.jpg`,
  'pop-puc-services': `${AZURE_BLOB_BASE_URL}pop.jpg`,
  'raw-materials': `${AZURE_BLOB_BASE_URL}rawmaterials.jpg`,
};

export interface Website {
  name: string;
  url: string;
  description?: string;
}

export interface ServiceData {
  id: string;
  icon: string;
  tileImage?: string | null; // Image URL from Azure Blob Storage
  title: string;
  subtitle: string;
  images: string[]; // "Our Work" images - URLs or paths
  assetFolder?: string; // (Deprecated) Previously used for ImgBB album URL, now field work images are loaded from Azure Blob Storage at https://kaamlo.blob.core.windows.net/kaamloimages/fieldwork/[serviceId]/
  whatWeDo: string[];
  faq: Array<{ question: string; answer: string }>;
  serviceArea: string[];
  websites?: Website[]; // Websites developed (for website development service)
  contact?: {
    phone: string;
    email: string;
  };
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  'websites-mobile-app-development': {
    id: 'websites-mobile-app-development',
    icon: '💻',
    tileImage: HOME_CATEGORY_IMAGES['websites-mobile-app-development'],
    title: 'Website and Mobile App Development',
    subtitle: 'Professional website and mobile app development services to help your business establish a strong online presence and reach customers on all devices',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800'
    ],
    assetFolder: 'https://ibb.co/album/websites-mobile-app-development',
    // Websites we've developed - will be displayed in field work section
    websites: [
      {
        name: 'Kunda Electricals and Solar',
        url: 'https://www.kundaelectricalsandsolar.com/',
        description: 'Professional electrical and solar services website'
      },
      {
        name: 'GP Manapur',
        url: 'https://www.gpmanapur.in/',
        description: 'Website for Gram Panchayat Manapur'
      },
      {
        name: 'GP Pathrai',
        url: 'https://www.gppathrai.in/',
        description: 'Website for Gram Panchayat Pathrai'
      },
      {
        name: 'GP Karwahi',
        url: 'http://gpkarwahi.in/',
        description: 'Website for Gram Panchayat Karwahi'
      }
    ],
    whatWeDo: [
      'Custom website design and development',
      'Responsive web applications',
      'Mobile app development (iOS & Android)',
      'E-commerce solutions',
      'Content Management Systems (CMS)',
      'Progressive Web Apps (PWA)',
      'API integration and backend development',
      'Website maintenance and updates',
      'SEO optimization',
      'Performance optimization'
    ],
    faq: [
      {
        question: 'What technologies do you use for web development?',
        answer: 'We use modern technologies including React, Next.js, Vue.js, Node.js, and various other frameworks based on your project requirements.'
      },
      {
        question: 'Do you provide mobile app development for both iOS and Android?',
        answer: 'Yes, we develop native and cross-platform mobile applications for both iOS and Android platforms using React Native, Flutter, or native development tools.'
      },
      {
        question: 'How long does it take to develop a website?',
        answer: 'The timeline depends on the complexity of your project. A simple website can take 2-4 weeks, while a complex e-commerce platform may take 2-3 months.'
      },
      {
        question: 'Do you provide ongoing maintenance and support?',
        answer: 'Yes, we offer maintenance packages to keep your website or app updated, secure, and performing optimally.'
      },
      {
        question: 'Can you help with SEO optimization?',
        answer: 'Absolutely! We provide SEO optimization services to improve your website\'s visibility in search engines and help attract more organic traffic.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'webdevvakaamlo@gmail.com'
    }
  },
  'solar-setup': {
    id: 'solar-setup',
    icon: '☀️',
    tileImage: HOME_CATEGORY_IMAGES['solar-setup'],
    title: 'Solar Setup',
    subtitle: 'Professional solar panel installation and renewable energy solutions',
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
    ],
    assetFolder: 'https://ibb.co/album/Kz2LDX',
    whatWeDo: [
      'Solar panel installation',
      'Solar system design and consultation',
      'Grid-tied and off-grid solutions',
      'Solar inverter installation',
      'Battery backup systems',
      'Solar system maintenance and repair',
      'Government subsidy assistance',
      'Energy efficiency assessment'
    ],
    faq: [
      {
        question: 'How much can I save with solar panels?',
        answer: 'Solar panels can reduce your electricity bills by 70-90% depending on your system size and energy consumption. Most systems pay for themselves within 5-7 years.'
      },
      {
        question: 'Do you help with government subsidies and incentives?',
        answer: 'Yes, we assist with all government subsidy applications and help you avail maximum benefits from solar energy incentives and tax credits.'
      },
      {
        question: 'How long does solar panel installation take?',
        answer: 'A typical residential solar installation takes 2-5 days, depending on the system size and complexity. We ensure minimal disruption to your daily routine.'
      },
      {
        question: 'What maintenance do solar panels require?',
        answer: 'Solar panels require minimal maintenance - mainly periodic cleaning and annual inspections. We provide maintenance services to ensure optimal performance.'
      },
      {
        question: 'What warranty do you provide on solar installations?',
        answer: 'We provide comprehensive warranties covering panels (25 years), inverters (5-10 years), and workmanship (5 years) to ensure your investment is protected.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'solarvakaamlo@gmail.com'
    }
  },
  'plumber': {
    id: 'plumber',
    icon: '🔧',
    tileImage: HOME_CATEGORY_IMAGES['plumber'],
    title: 'Plumber',
    subtitle: 'Professional plumbing services for your home and business',
    images: [
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800'
    ],
    assetFolder: 'https://ibb.co/album/dsnsDP',
    whatWeDo: [
      'Pipe installation and repair',
      'Leak detection and fixing',
      'Drain cleaning and unclogging',
      'Water heater installation',
      'Bathroom and kitchen plumbing',
      'Emergency plumbing services'
    ],
    faq: [
      {
        question: 'How quickly can you respond to emergency plumbing calls?',
        answer: 'We offer 24/7 emergency plumbing services and typically respond within 1-2 hours for urgent situations.'
      },
      {
        question: 'Do you provide warranties on your plumbing work?',
        answer: 'Yes, we provide warranties on all our plumbing installations and repairs. The warranty period varies depending on the type of work performed.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, credit cards, debit cards, and digital payment methods for your convenience.'
      },
      {
        question: 'Are your plumbers licensed and insured?',
        answer: 'Yes, all our plumbers are fully licensed, insured, and experienced professionals.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'plumbervakaamlo@gmail.com'
    }
  },
  'electrician': {
    id: 'electrician',
    icon: '⚡',
    tileImage: HOME_CATEGORY_IMAGES['electrician'],
    title: 'Electrician',
    subtitle: 'Expert electrical solutions for residential and commercial needs',
    images: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800'
    ],
    assetFolder: 'https://ibb.co/album/34C28W',
    whatWeDo: [
      'Electrical wiring and installation',
      'Circuit breaker repair',
      'Light fixture installation',
      'Electrical panel upgrades',
      'Outlet and switch installation',
      'Emergency electrical repairs'
    ],
    faq: [
      {
        question: 'How do I know if I need an electrical upgrade?',
        answer: 'Signs include frequent circuit breaker trips, flickering lights, outdated fuse boxes, or insufficient outlets. We can assess your electrical system and recommend upgrades.'
      },
      {
        question: 'Do you handle both residential and commercial electrical work?',
        answer: 'Yes, we provide electrical services for both residential and commercial properties, from small repairs to large installations.'
      },
      {
        question: 'What safety certifications do your electricians have?',
        answer: 'All our electricians are licensed, certified, and follow strict safety protocols. We carry full insurance coverage for all work performed.'
      },
      {
        question: 'Can you help with electrical permits?',
        answer: 'Yes, we handle all necessary permits and inspections for electrical work to ensure compliance with local building codes.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'electricianvakaamlo@gmail.com'
    }
  },
  'interior-designs': {
    id: 'interior-designs',
    icon: '🎨',
    tileImage: HOME_CATEGORY_IMAGES['interior-designs'],
    title: 'Interior Designs',
    subtitle: 'Transform your space with beautiful and functional interior designs',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
      'https://images.unsplash.com/photo-1631889993957-25c0a57f0c0b?w=800'
    ],
    assetFolder: 'https://ibb.co/album/BVb3Wt',
    whatWeDo: [
      'Complete interior design consultation',
      'Space planning and layout',
      'Color scheme selection',
      'Furniture selection and placement',
      'Lighting design',
      'Home decoration and styling'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'interiorvakaamlo@gmail.com'
    }
  },
  'elevations': {
    id: 'elevations',
    icon: '🏗️',
    tileImage: HOME_CATEGORY_IMAGES['elevations'],
    title: 'Elevations',
    subtitle: 'Professional elevation design and construction services',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    assetFolder: 'https://ibb.co/album/pj9M6g',
    whatWeDo: [
      'Building elevation design',
      '3D elevation visualization',
      'Material selection and installation',
      'Exterior wall finishing',
      'Facade renovation',
      'Architectural elevation planning'
    ],
    faq: [
      {
        question: 'How long does an elevation project typically take?',
        answer: 'The duration depends on the scope of work. Simple elevation designs can take 2-3 weeks, while complete facade renovations may take 4-8 weeks.'
      },
      {
        question: 'Do you provide 3D visualization before starting work?',
        answer: 'Yes, we provide detailed 3D elevation visualizations so you can see exactly how your building will look before construction begins.'
      },
      {
        question: 'What materials do you work with for elevations?',
        answer: 'We work with a variety of materials including stone, brick, tiles, paint, and modern cladding materials based on your preferences and budget.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'elevationsvakaamlo@gmail.com'
    }
  },
  'furnitures': {
    id: 'furnitures',
    icon: '🪑',
    tileImage: HOME_CATEGORY_IMAGES['furnitures'],
    title: 'Furnitures',
    subtitle: 'Quality furniture solutions for every room in your home',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800'
    ],
    assetFolder: 'https://ibb.co/album/xFKk6Z',
    whatWeDo: [
      'Custom furniture design',
      'Furniture manufacturing',
      'Furniture repair and restoration',
      'Modular furniture solutions',
      'Office furniture installation',
      'Furniture delivery and assembly'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'furniturevakaamlo@gmail.com'
    }
  },
  'raw-materials': {
    id: 'raw-materials',
    icon: '🧱',
    tileImage: HOME_CATEGORY_IMAGES['raw-materials'],
    title: 'Raw Materials Supply',
    subtitle: 'Quality raw materials for construction and manufacturing',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
    ],
    assetFolder: 'https://ibb.co/album/ZLNnLd',
    whatWeDo: [
      'Cement and concrete supply',
      'Steel and iron materials',
      'Bricks and blocks',
      'Sand and aggregates',
      'Wood and timber',
      'Construction material delivery'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'materialsvakaamlo@gmail.com'
    }
  },
  'windows-doors-mesh': {
    id: 'windows-doors-mesh',
    icon: '🪟',
    tileImage: HOME_CATEGORY_IMAGES['windows-doors-mesh'],
    title: 'Windows, Doors & Mesh',
    subtitle: 'Premium windows, doors and mesh solutions',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    assetFolder: 'https://ibb.co/album/Qpc5bZ',
    whatWeDo: [
      'Window installation and repair',
      'Door installation and replacement',
      'Mesh screen installation',
      'Security door solutions',
      'Window and door maintenance',
      'Custom size windows and doors'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'windowsdoorsvakaamlo@gmail.com'
    }
  },
  'steel-iron-railings': {
    id: 'steel-iron-railings',
    icon: '🛡️',
    tileImage: HOME_CATEGORY_IMAGES['steel-iron-railings'],
    title: 'Steel & Iron Railings',
    subtitle: 'Durable and elegant steel and iron railing solutions',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    assetFolder: 'https://ibb.co/album/Q9jzFn',
    whatWeDo: [
      'Staircase railing installation',
      'Balcony railing design',
      'Custom railing fabrication',
      'Railing repair and maintenance',
      'Gate and fence installation',
      'Ornamental iron work'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'railingsvakaamlo@gmail.com'
    }
  },
  'glass-homes': {
    id: 'glass-homes',
    icon: '🪟',
    tileImage: HOME_CATEGORY_IMAGES['glass-homes'],
    title: 'Glass for Homes',
    subtitle: 'Premium glass solutions for modern homes',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800'
    ],
    assetFolder: 'https://ibb.co/album/0qXCV1',
    whatWeDo: [
      'Window glass replacement',
      'Mirror installation',
      'Glass partition walls',
      'Tempered glass solutions',
      'Glass door installation',
      'Glass repair and maintenance'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'glassvakaamlo@gmail.com'
    }
  },
  'pop-puc-services': {
    id: 'pop-puc-services',
    icon: '🏛️',
    tileImage: HOME_CATEGORY_IMAGES['pop-puc-services'],
    title: 'PoP & PUC Services',
    subtitle: 'Professional PoP (Plaster of Paris) and PUC (Pollution Under Control) services',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
    ],
    assetFolder: 'https://ibb.co/album/bgCXWp',
    whatWeDo: [
      'PoP ceiling design and installation',
      'False ceiling work',
      'PUC certificate services',
      'Vehicle pollution testing',
      'PoP decorative work',
      'Ceiling repair and maintenance'
    ],
    faq: [],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'poppucvakaamlo@gmail.com'
    }
  },
  'layout-planning': {
    id: 'layout-planning',
    icon: '📐',
    tileImage: HOME_CATEGORY_IMAGES['layout-planning'],
    title: 'Layout Planning',
    subtitle: 'Professional space planning and layout design services for homes and commercial spaces',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
      'https://images.unsplash.com/photo-1631889993957-25c0a57f0c0b?w=800'
    ],
    assetFolder: 'https://ibb.co/album/rFmDDK',
    whatWeDo: [
      'Space planning and layout design',
      'Floor plan creation and optimization',
      'Room arrangement and furniture placement',
      'Commercial space planning',
      'Kitchen and bathroom layout design',
      '3D visualization and rendering',
      'Building code compliance planning',
      'Accessibility and ergonomic design'
    ],
    faq: [
      {
        question: 'What is included in layout planning services?',
        answer: 'Our layout planning services include space analysis, floor plan creation, furniture placement optimization, traffic flow planning, and 3D visualizations to help you visualize the final design.'
      },
      {
        question: 'Do you provide layout planning for both residential and commercial spaces?',
        answer: 'Yes, we provide comprehensive layout planning services for both residential homes and commercial spaces including offices, retail stores, restaurants, and more.'
      },
      {
        question: 'How long does a layout planning project take?',
        answer: 'The timeline depends on the project scope. Simple residential layouts can take 1-2 weeks, while complex commercial projects may take 3-6 weeks including revisions and approvals.'
      },
      {
        question: 'Do you provide 3D renderings with layout plans?',
        answer: 'Yes, we provide detailed 3D visualizations and renderings so you can see exactly how your space will look before any construction or changes begin.'
      },
      {
        question: 'Can you help with building code compliance?',
        answer: 'Absolutely! We ensure all layout plans comply with local building codes, accessibility requirements, and safety regulations.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'layoutvakaamlo@gmail.com'
    }
  },
  'painting': {
    id: 'painting',
    icon: '🎨',
    tileImage: HOME_CATEGORY_IMAGES['painting'],
    title: 'Painting Services',
    subtitle: 'Professional interior and exterior painting services for homes and commercial spaces',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'
    ],
    assetFolder: 'https://ibb.co/album/8gLxDk',
    whatWeDo: [
      'Interior painting and wall treatments',
      'Exterior painting and weatherproofing',
      'Texture painting and decorative finishes',
      'Primer and base coat application',
      'Color consultation and selection',
      'Wall preparation and surface repair',
      'Commercial painting services',
      'Post-construction painting'
    ],
    faq: [
      {
        question: 'How long does a painting project typically take?',
        answer: 'A typical room painting takes 1-2 days, while a complete home interior can take 5-7 days. Exterior painting depends on weather conditions and surface area.'
      },
      {
        question: 'Do you provide color consultation services?',
        answer: 'Yes, we offer professional color consultation to help you choose the perfect colors that match your style and space requirements.'
      },
      {
        question: 'What types of paint do you use?',
        answer: 'We use high-quality, eco-friendly paints from reputed brands. We can work with oil-based, water-based, and specialty paints based on your requirements.'
      },
      {
        question: 'Do you handle surface preparation before painting?',
        answer: 'Yes, proper surface preparation is crucial for a lasting finish. We handle cleaning, sanding, filling cracks, and applying primer before painting.'
      },
      {
        question: 'What warranty do you provide on painting work?',
        answer: 'We provide a 2-3 year warranty on our painting work, covering peeling, cracking, and color fading under normal conditions.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'paintingvakaamlo@gmail.com'
    }
  },
  'floor-and-tiles': {
    id: 'floor-and-tiles',
    icon: '🧱',
    tileImage: HOME_CATEGORY_IMAGES['floor-and-tiles'],
    title: 'Floor & Tiles',
    subtitle: 'Professional flooring and tiling solutions for homes and commercial spaces',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
    ],
    assetFolder: 'https://ibb.co/album/yh8Dgb',
    whatWeDo: [
      'Ceramic and vitrified tile installation',
      'Marble and granite flooring',
      'Wooden flooring installation',
      'Vinyl and laminate flooring',
      'Bathroom and kitchen tiling',
      'Floor repair and replacement',
      'Grouting and sealing services',
      'Pattern and design tile work'
    ],
    faq: [
      {
        question: 'What types of flooring materials do you work with?',
        answer: 'We work with ceramic tiles, vitrified tiles, marble, granite, wooden flooring, vinyl, laminate, and other modern flooring materials.'
      },
      {
        question: 'How long does tile installation take?',
        answer: 'A typical room (100-150 sq ft) takes 1-2 days. Complete home flooring depends on area and complexity, usually 5-10 days.'
      },
      {
        question: 'Do you provide tile design and pattern services?',
        answer: 'Yes, we offer custom tile designs, patterns, and mosaic work to create unique and beautiful flooring solutions.'
      },
      {
        question: 'What is included in your flooring services?',
        answer: 'Our services include material selection guidance, surface preparation, installation, grouting, sealing, and cleanup.'
      },
      {
        question: 'Do you handle floor repair and replacement?',
        answer: 'Yes, we provide repair services for damaged tiles, cracked floors, and complete floor replacement when needed.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'flooringvakaamlo@gmail.com'
    }
  },
  'carpentry': {
    id: 'carpentry',
    icon: '🪵',
    tileImage: HOME_CATEGORY_IMAGES['carpentry'],
    title: 'Carpentry & Woodwork',
    subtitle: 'Expert carpentry and woodwork services for custom furniture and home improvements',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
    ],
    assetFolder: 'https://ibb.co/album/cJKtLQ',
    whatWeDo: [
      'Custom furniture design and manufacturing',
      'Wooden doors and windows',
      'Kitchen cabinets and wardrobes',
      'Wooden flooring and paneling',
      'Carpentry repairs and restoration',
      'Modular furniture solutions',
      'Wood carving and decorative work',
      'Wood polishing and finishing'
    ],
    faq: [
      {
        question: 'What types of wood do you work with?',
        answer: 'We work with various types including teak, plywood, MDF, particle board, hardwood, and engineered wood based on your requirements and budget.'
      },
      {
        question: 'Do you provide custom furniture design?',
        answer: 'Yes, we specialize in custom furniture design and manufacturing tailored to your space, style, and functional requirements.'
      },
      {
        question: 'How long does custom furniture take to build?',
        answer: 'Simple pieces take 1-2 weeks, while complex custom furniture like wardrobes or kitchen cabinets can take 3-6 weeks including design and installation.'
      },
      {
        question: 'Do you handle carpentry repairs?',
        answer: 'Yes, we provide repair services for damaged furniture, doors, windows, and other wooden items, including restoration work.'
      },
      {
        question: 'What finishing options do you offer?',
        answer: 'We offer various finishing options including polish, paint, laminate, veneer, and other modern finishes to protect and enhance the wood.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'carpentryvakaamlo@gmail.com'
    }
  },
  'office-setup': {
    id: 'office-setup',
    icon: '🏢',
    tileImage: HOME_CATEGORY_IMAGES['office-setup'],
    title: 'Office Setup',
    subtitle: 'Complete office setup and workspace solutions for businesses',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    assetFolder: 'https://ibb.co/album/TmdYwW',
    whatWeDo: [
      'Office space planning and design',
      'Workstation and furniture installation',
      'Cubicle and partition setup',
      'Electrical and networking setup',
      'Office interior decoration',
      'Conference room setup',
      'Reception area design',
      'Complete office renovation'
    ],
    faq: [
      {
        question: 'What is included in office setup services?',
        answer: 'Our office setup includes space planning, furniture selection and installation, electrical work, networking, partitions, and complete interior design.'
      },
      {
        question: 'Do you handle both small and large office setups?',
        answer: 'Yes, we handle office setups of all sizes, from small startups to large corporate offices, with scalable solutions.'
      },
      {
        question: 'How long does an office setup project take?',
        answer: 'Small offices (500-1000 sq ft) take 2-3 weeks, while larger offices can take 4-8 weeks depending on complexity and requirements.'
      },
      {
        question: 'Do you provide modular office solutions?',
        answer: 'Yes, we provide modern modular office solutions including workstations, cubicles, and flexible layouts that can be reconfigured as needed.'
      },
      {
        question: 'Can you help with office relocation?',
        answer: 'Yes, we provide complete office relocation services including disassembly, transportation, and reassembly at the new location.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'officevakaamlo@gmail.com'
    }
  },
  'gardening': {
    id: 'gardening',
    icon: '🌳',
    tileImage: HOME_CATEGORY_IMAGES['gardening'],
    title: 'Gardening & Landscaping',
    subtitle: 'Professional gardening and landscaping services for homes and commercial spaces',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
      'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=800'
    ],
    assetFolder: 'https://ibb.co/album/KpXwBC',
    whatWeDo: [
      'Garden design and landscaping',
      'Lawn installation and maintenance',
      'Plant selection and installation',
      'Tree planting and care',
      'Garden irrigation systems',
      'Garden lighting and decoration',
      'Seasonal plant care',
      'Commercial landscaping'
    ],
    faq: [
      {
        question: 'What types of gardens do you design?',
        answer: 'We design various types including flower gardens, vegetable gardens, ornamental gardens, rooftop gardens, and commercial landscapes.'
      },
      {
        question: 'Do you provide ongoing maintenance services?',
        answer: 'Yes, we provide regular maintenance services including watering, pruning, fertilizing, pest control, and seasonal care.'
      },
      {
        question: 'Can you work with small spaces?',
        answer: 'Absolutely! We specialize in creating beautiful gardens in small spaces, balconies, terraces, and even indoor gardens.'
      },
      {
        question: 'What plants do you recommend for local climate?',
        answer: 'We recommend plants suitable for the local climate, including native species that require less water and maintenance.'
      },
      {
        question: 'Do you install irrigation systems?',
        answer: 'Yes, we install automated irrigation systems including drip irrigation, sprinklers, and smart watering systems for efficient garden maintenance.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'gardeningvakaamlo@gmail.com'
    }
  },
  'construction': {
    id: 'construction',
    icon: '🏗️',
    tileImage: HOME_CATEGORY_IMAGES['construction'],
    title: 'Construction Services',
    subtitle: 'Complete construction and building solutions for residential and commercial projects',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    assetFolder: 'https://ibb.co/album/j9vQps',
    whatWeDo: [
      'Residential construction and building',
      'Commercial construction projects',
      'Home renovation and remodeling',
      'Foundation and structural work',
      'Roofing and waterproofing',
      'Building extension and expansion',
      'Construction project management',
      'Quality construction materials'
    ],
    faq: [
      {
        question: 'What types of construction projects do you handle?',
        answer: 'We handle all types of construction projects including residential homes, commercial buildings, renovations, extensions, and complete building construction from foundation to finishing.'
      },
      {
        question: 'Do you provide complete construction services or just specific parts?',
        answer: 'We provide complete end-to-end construction services including planning, design, material procurement, construction, and finishing. We can also handle specific parts of construction as per your requirements.'
      },
      {
        question: 'How long does a typical construction project take?',
        answer: 'Project duration depends on scope and size. A small renovation takes 2-4 weeks, while a complete home construction typically takes 4-8 months. We provide detailed timelines during project planning.'
      },
      {
        question: 'Do you handle all necessary permits and approvals?',
        answer: 'Yes, we assist with all necessary building permits, approvals, and compliance with local building codes and regulations to ensure your project is legally compliant.'
      },
      {
        question: 'What warranty do you provide on construction work?',
        answer: 'We provide comprehensive warranties covering structural work (10 years), general construction (5 years), and finishing work (2 years) to ensure your investment is protected.'
      }
    ],
    serviceArea: [
      'Nagpur City',
      'Ramtek',
      'Kamptee',
      'Katol',
      'Umred',
      'Kalmeshwar',
      'Narkhed',
      'Mauda',
      'Parseoni',
      'Saoner',
      'Hingna',
      'Kuhi',
      'Bhiwapur',
      'Kapsi',
      'Koradi'
    ],
    contact: {
      phone: '+91 9028302467',
      email: 'constructionvakaamlo@gmail.com'
    }
  }
};

// Service order for display on home page
export const SERVICE_ORDER = [
  'solar-setup',
  'websites-mobile-app-development',
  'interior-designs',
  'elevations',
  'raw-materials',
  'furnitures',
  'plumber',
  'electrician',
  'windows-doors-mesh',
  'steel-iron-railings',
  'glass-homes',
  'pop-puc-services',
  'layout-planning',
  'painting',
  'floor-and-tiles',
  'carpentry',
  'office-setup',
  'gardening',
  'construction'
] as const;
