import type { Service, FAQItem, Website } from '../types';
import type { Language } from '../i18n/translations';

const serviceTranslations: Record<string, Record<Language, { name: string; description: string; whatWeDo: string[]; serviceArea?: string[]; faq?: FAQItem[]; websites?: Website[] }>> = {
  'solar-setup': {
    en: {
      name: 'Solar Setup',
      description: 'Professional solar panel installation and renewable energy solutions',
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
      ]
    },
    hi: {
      name: 'सोलर सेटअप',
      description: 'पेशेवर सोलर पैनल स्थापना और नवीकरणीय ऊर्जा समाधान',
      whatWeDo: [
        'सोलर पैनल स्थापना',
        'सोलर सिस्टम डिजाइन और परामर्श',
        'ग्रिड-टाइड और ऑफ-ग्रिड समाधान',
        'सोलर इन्वर्टर स्थापना',
        'बैटरी बैकअप सिस्टम',
        'सोलर सिस्टम रखरखाव और मरम्मत',
        'सरकारी सब्सिडी सहायता',
        'ऊर्जा दक्षता मूल्यांकन'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'सोलर पैनल से मैं कितना बचा सकता हूं?',
          answer: 'सोलर पैनल आपके बिजली बिलों को 70-90% तक कम कर सकते हैं, यह आपके सिस्टम के आकार और ऊर्जा खपत पर निर्भर करता है। अधिकांश सिस्टम 5-7 वर्षों के भीतर अपने लागत को पूरा कर लेते हैं।'
        },
        {
          question: 'क्या आप सरकारी सब्सिडी और प्रोत्साहन में मदद करते हैं?',
          answer: 'हां, हम सभी सरकारी सब्सिडी आवेदनों में सहायता करते हैं और आपको सोलर ऊर्जा प्रोत्साहन और कर क्रेडिट से अधिकतम लाभ प्राप्त करने में मदद करते हैं।'
        },
        {
          question: 'सोलर पैनल स्थापना में कितना समय लगता है?',
          answer: 'एक सामान्य आवासीय सोलर स्थापना में 2-5 दिन लगते हैं, यह सिस्टम के आकार और जटिलता पर निर्भर करता है। हम आपकी दैनिक दिनचर्या में न्यूनतम व्यवधान सुनिश्चित करते हैं।'
        },
        {
          question: 'सोलर पैनल को किस रखरखाव की आवश्यकता है?',
          answer: 'सोलर पैनल को न्यूनतम रखरखाव की आवश्यकता होती है - मुख्य रूप से आवधिक सफाई और वार्षिक निरीक्षण। हम इष्टतम प्रदर्शन सुनिश्चित करने के लिए रखरखाव सेवाएं प्रदान करते हैं।'
        },
        {
          question: 'सोलर स्थापना पर आप क्या वारंटी प्रदान करते हैं?',
          answer: 'हम पैनल (25 वर्ष), इन्वर्टर (5-10 वर्ष), और कारीगरी (5 वर्ष) को कवर करने वाली व्यापक वारंटी प्रदान करते हैं ताकि आपके निवेश की सुरक्षा सुनिश्चित हो सके।'
        }
      ]
    },
    mr: {
      name: 'सोलर सेटअप',
      description: 'व्यावसायिक सोलर पॅनेल स्थापना आणि नूतनीकरणीय ऊर्जा उपाय',
      whatWeDo: [
        'सोलर पॅनेल स्थापना',
        'सोलर सिस्टम डिझाइन आणि सल्ला',
        'ग्रिड-टाइड आणि ऑफ-ग्रिड उपाय',
        'सोलर इन्वर्टर स्थापना',
        'बॅटरी बॅकअप सिस्टम',
        'सोलर सिस्टम देखभाल आणि दुरुस्ती',
        'सरकारी सब्सिडी सहायता',
        'ऊर्जा कार्यक्षमता मूल्यांकन'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'सोलर पॅनेल्ससह मी किती बचत करू शकतो?',
          answer: 'सोलर पॅनेल तुमचे वीज बिल 70-90% पर्यंत कमी करू शकतात, हे तुमच्या सिस्टमच्या आकारावर आणि ऊर्जा वापरावर अवलंबून असते. बहुतेक सिस्टम 5-7 वर्षांत स्वतःची किंमत भरून काढतात।'
        },
        {
          question: 'तुम्ही सरकारी सबसिडी आणि प्रोत्साहनांमध्ये मदत करता का?',
          answer: 'होय, आम्ही सर्व सरकारी सबसिडी अर्जांमध्ये मदत करतो आणि सोलर ऊर्जा प्रोत्साहन आणि कर क्रेडिट्सपासून जास्तीत जास्त फायदे मिळविण्यात मदत करतो।'
        },
        {
          question: 'सोलर पॅनेल स्थापनेसाठी किती वेळ लागतो?',
          answer: 'एक सामान्य निवासी सोलर स्थापना 2-5 दिवस लागते, हे सिस्टमच्या आकारावर आणि जटिलतेवर अवलंबून असते. आम्ही तुमच्या दैनंदिन दिनचर्येत किमान व्यत्यय सुनिश्चित करतो।'
        },
        {
          question: 'सोलर पॅनेल्सना कोणत्या देखभालीची आवश्यकता आहे?',
          answer: 'सोलर पॅनेल्सना किमान देखभालीची आवश्यकता असते - मुख्यत्वे नियतकालिक सफाई आणि वार्षिक तपासणी. आम्ही इष्टतम कार्यक्षमता सुनिश्चित करण्यासाठी देखभाल सेवा प्रदान करतो।'
        },
        {
          question: 'सोलर स्थापनेवर तुम्ही कोणती हमी द्या?',
          answer: 'आम्ही पॅनेल (25 वर्षे), इन्व्हर्टर (5-10 वर्षे), आणि कारागिरी (5 वर्षे) कव्हर करणारी व्यापक हमी प्रदान करतो जेणेकरून तुमच्या गुंतवणुकीचे संरक्षण सुनिश्चित होईल।'
        }
      ]
    }
  },
  plumber: {
    en: {
      name: 'Plumber',
      description: 'Professional plumbing services for your home and business',
      whatWeDo: [
        'Pipe installation and repair',
        'Leak detection and fixing',
        'Drain cleaning and unclogging',
        'Water heater installation',
        'Bathroom and kitchen plumbing',
        'Emergency plumbing services'
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
      ]
    },
    hi: {
      name: 'प्लंबर',
      description: 'आपके घर और व्यवसाय के लिए पेशेवर प्लंबिंग सेवाएं',
      whatWeDo: [
        'पाइप स्थापना और मरम्मत',
        'लीक का पता लगाना और ठीक करना',
        'ड्रेन सफाई और अनब्लॉकिंग',
        'वॉटर हीटर स्थापना',
        'बाथरूम और किचन प्लंबिंग',
        'आपातकालीन प्लंबिंग सेवाएं'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'आप आपातकालीन प्लंबिंग कॉल पर कितनी जल्दी प्रतिक्रिया दे सकते हैं?',
          answer: 'हम 24/7 आपातकालीन प्लंबिंग सेवाएं प्रदान करते हैं और आमतौर पर जरूरी स्थितियों के लिए 1-2 घंटे के भीतर प्रतिक्रिया देते हैं।'
        },
        {
          question: 'क्या आप अपने प्लंबिंग कार्य पर वारंटी प्रदान करते हैं?',
          answer: 'हां, हम अपनी सभी प्लंबिंग स्थापना और मरम्मत पर वारंटी प्रदान करते हैं। वारंटी अवधि किए गए कार्य के प्रकार के आधार पर भिन्न होती है।'
        },
        {
          question: 'आप कौन से भुगतान विधियां स्वीकार करते हैं?',
          answer: 'हम आपकी सुविधा के लिए नकद, क्रेडिट कार्ड, डेबिट कार्ड, और डिजिटल भुगतान विधियां स्वीकार करते हैं।'
        },
        {
          question: 'क्या आपके प्लंबर लाइसेंस प्राप्त और बीमाकृत हैं?',
          answer: 'हां, हमारे सभी प्लंबर पूरी तरह से लाइसेंस प्राप्त, बीमाकृत, और अनुभवी पेशेवर हैं।'
        }
      ]
    },
    mr: {
      name: 'प्लंबर',
      description: 'तुमच्या घर आणि व्यवसायासाठी व्यावसायिक प्लंबिंग सेवा',
      whatWeDo: [
        'पाईप स्थापना आणि दुरुस्ती',
        'लीक शोधणे आणि निराकरण',
        'ड्रेन सफाई आणि अनब्लॉकिंग',
        'वॉटर हीटर स्थापना',
        'बाथरूम आणि किचन प्लंबिंग',
        'आपत्कालीन प्लंबिंग सेवा'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'तुम्ही आपत्कालीन प्लंबिंग कॉलवर किती लवकर प्रतिक्रिया देऊ शकता?',
          answer: 'आम्ही 24/7 आपत्कालीन प्लंबिंग सेवा ऑफर करतो आणि सामान्यत: जरूरी परिस्थितींसाठी 1-2 तासांत प्रतिक्रिया देतो।'
        },
        {
          question: 'तुम्ही तुमच्या प्लंबिंग कामावर हमी द्या?',
          answer: 'होय, आम्ही आमच्या सर्व प्लंबिंग स्थापना आणि दुरुस्तीवर हमी देतो. हमी कालावधी केलेल्या कामाच्या प्रकारावर अवलंबून बदलते।'
        },
        {
          question: 'तुम्ही कोणत्या पेमेंट पद्धती स्वीकारता?',
          answer: 'आम्ही तुमच्या सोयीसाठी रोख, क्रेडिट कार्ड, डेबिट कार्ड, आणि डिजिटल पेमेंट पद्धती स्वीकारतो।'
        },
        {
          question: 'तुमचे प्लंबर परवाना प्राप्त आणि विमा असलेले आहेत का?',
          answer: 'होय, आमचे सर्व प्लंबर पूर्णपणे परवाना प्राप्त, विमा असलेले, आणि अनुभवी व्यावसायिक आहेत।'
        }
      ]
    }
  },
  electrician: {
    en: {
      name: 'Electrician',
      description: 'Expert electrical solutions for residential and commercial needs',
      whatWeDo: [
        'Electrical wiring and installation',
        'Circuit breaker repair',
        'Light fixture installation',
        'Electrical panel upgrades',
        'Outlet and switch installation',
        'Emergency electrical repairs'
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
      ]
    },
    hi: {
      name: 'इलेक्ट्रीशियन',
      description: 'आवासीय और वाणिज्यिक जरूरतों के लिए विशेषज्ञ विद्युत समाधान',
      whatWeDo: [
        'विद्युत वायरिंग और स्थापना',
        'सर्किट ब्रेकर मरम्मत',
        'लाइट फिक्स्चर स्थापना',
        'विद्युत पैनल अपग्रेड',
        'आउटलेट और स्विच स्थापना',
        'आपातकालीन विद्युत मरम्मत'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'मुझे कैसे पता चलेगा कि मुझे विद्युत अपग्रेड की आवश्यकता है?',
          answer: 'संकेतों में लगातार सर्किट ब्रेकर ट्रिप, झिलमिलाती रोशनी, पुराने फ्यूज बॉक्स, या अपर्याप्त आउटलेट शामिल हैं। हम आपकी विद्युत प्रणाली का आकलन कर सकते हैं और अपग्रेड की सिफारिश कर सकते हैं।'
        },
        {
          question: 'क्या आप आवासीय और वाणिज्यिक दोनों विद्युत कार्य संभालते हैं?',
          answer: 'हां, हम छोटी मरम्मत से लेकर बड़ी स्थापना तक आवासीय और वाणिज्यिक दोनों संपत्तियों के लिए विद्युत सेवाएं प्रदान करते हैं।'
        },
        {
          question: 'आपके इलेक्ट्रीशियन के पास कौन सी सुरक्षा प्रमाणपत्र हैं?',
          answer: 'हमारे सभी इलेक्ट्रीशियन लाइसेंस प्राप्त, प्रमाणित हैं, और सख्त सुरक्षा प्रोटोकॉल का पालन करते हैं। हम किए गए सभी कार्यों के लिए पूर्ण बीमा कवरेज रखते हैं।'
        },
        {
          question: 'क्या आप विद्युत परमिट में मदद कर सकते हैं?',
          answer: 'हां, हम स्थानीय भवन कोड के अनुपालन को सुनिश्चित करने के लिए विद्युत कार्य के लिए सभी आवश्यक परमिट और निरीक्षण संभालते हैं।'
        }
      ]
    },
    mr: {
      name: 'इलेक्ट्रीशियन',
      description: 'निवासी आणि व्यावसायिक गरजांसाठी तज्ञ विद्युत उपाय',
      whatWeDo: [
        'विद्युत वायरिंग आणि स्थापना',
        'सर्किट ब्रेकर दुरुस्ती',
        'लाइट फिक्स्चर स्थापना',
        'विद्युत पॅनेल अपग्रेड',
        'आउटलेट आणि स्विच स्थापना',
        'आपत्कालीन विद्युत दुरुस्ती'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'मला कसे कळेल की मला विद्युत अपग्रेडची आवश्यकता आहे?',
          answer: 'चिन्हांमध्ये वारंवार सर्किट ब्रेकर ट्रिप, चमकणारी दिवे, जुन्या फ्यूज बॉक्स, किंवा अपुरे आउटलेट समाविष्ट आहेत. आम्ही तुमच्या विद्युत प्रणालीचे मूल्यांकन करू शकतो आणि अपग्रेडची शिफारस करू शकतो।'
        },
        {
          question: 'तुम्ही निवासी आणि व्यावसायिक दोन्ही विद्युत काम हाताळता का?',
          answer: 'होय, आम्ही लहान दुरुस्तीपासून मोठ्या स्थापनेपर्यंत निवासी आणि व्यावसायिक दोन्ही मालमत्तांसाठी विद्युत सेवा प्रदान करतो।'
        },
        {
          question: 'तुमच्या इलेक्ट्रीशियनकडे कोणती सुरक्षा प्रमाणपत्रे आहेत?',
          answer: 'आमचे सर्व इलेक्ट्रीशियन परवाना प्राप्त, प्रमाणित आहेत, आणि कठोर सुरक्षा प्रोटोकॉलचे अनुसरण करतात. आम्ही केलेल्या सर्व कामासाठी पूर्ण विमा कव्हरेज ठेवतो।'
        },
        {
          question: 'तुम्ही विद्युत परमिटमध्ये मदत करू शकता का?',
          answer: 'होय, आम्ही स्थानिक बिल्डिंग कोडच्या अनुपालनासाठी विद्युत कामासाठी सर्व आवश्यक परमिट आणि तपासणी हाताळतो।'
        }
      ]
    }
  },
  'interior-designs': {
    en: {
      name: 'Interior Design',
      description: 'Transform your space with beautiful interior designs',
      whatWeDo: [
        'Space planning and layout',
        'Color scheme selection',
        'Furniture selection and placement',
        'Lighting design',
        'Wall treatments and finishes',
        'Complete home makeovers'
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
      ]
    },
    hi: {
      name: 'इंटीरियर डिजाइन',
      description: 'सुंदर इंटीरियर डिजाइन के साथ अपने स्थान को बदलें',
      whatWeDo: [
        'स्पेस प्लानिंग और लेआउट',
        'रंग योजना चयन',
        'फर्नीचर चयन और प्लेसमेंट',
        'लाइटिंग डिजाइन',
        'दीवार उपचार और फिनिश',
        'पूर्ण घर का नवीकरण'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    },
    mr: {
      name: 'इंटीरियर डिझाइन',
      description: 'सुंदर इंटीरियर डिझाइनसह तुमची जागा बदला',
      whatWeDo: [
        'स्पेस प्लानिंग आणि लेआउट',
        'रंग योजना निवड',
        'फर्निचर निवड आणि प्लेसमेंट',
        'लाइटिंग डिझाइन',
        'भिंत उपचार आणि फिनिश',
        'पूर्ण घर नवीकरण'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    }
  },
  'elevations': {
    en: {
      name: 'Elevations',
      description: 'Professional elevation design and construction services',
      whatWeDo: [
        '3D elevation design',
        'Facade design and planning',
        'Material selection',
        'Construction supervision',
        'Modern and traditional designs',
        'Complete elevation projects'
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
      ]
    },
    hi: {
      name: 'एलिवेशन',
      description: 'पेशेवर एलिवेशन डिजाइन और निर्माण सेवाएं',
      whatWeDo: [
        '3D एलिवेशन डिजाइन',
        'फैसाड डिजाइन और योजना',
        'सामग्री चयन',
        'निर्माण पर्यवेक्षण',
        'आधुनिक और पारंपरिक डिजाइन',
        'पूर्ण एलिवेशन परियोजनाएं'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'एक एलिवेशन परियोजना में आमतौर पर कितना समय लगता है?',
          answer: 'अवधि कार्य के दायरे पर निर्भर करती है। साधारण एलिवेशन डिजाइन 2-3 सप्ताह ले सकते हैं, जबकि पूर्ण फैसाड नवीकरण 4-8 सप्ताह ले सकते हैं।'
        },
        {
          question: 'क्या आप काम शुरू करने से पहले 3D विज़ुअलाइज़ेशन प्रदान करते हैं?',
          answer: 'हां, हम विस्तृत 3D एलिवेशन विज़ुअलाइज़ेशन प्रदान करते हैं ताकि आप निर्माण शुरू होने से पहले देख सकें कि आपकी इमारत कैसी दिखेगी।'
        },
        {
          question: 'एलिवेशन के लिए आप किन सामग्रियों के साथ काम करते हैं?',
          answer: 'हम आपकी प्राथमिकताओं और बजट के आधार पर पत्थर, ईंट, टाइल्स, पेंट, और आधुनिक क्लैडिंग सामग्री सहित विभिन्न सामग्रियों के साथ काम करते हैं।'
        }
      ]
    },
    mr: {
      name: 'एलिव्हेशन',
      description: 'व्यावसायिक एलिव्हेशन डिझाइन आणि बांधकाम सेवा',
      whatWeDo: [
        '3D एलिव्हेशन डिझाइन',
        'फॅसाड डिझाइन आणि नियोजन',
        'सामग्री निवड',
        'बांधकाम पर्यवेक्षण',
        'आधुनिक आणि पारंपरिक डिझाइन',
        'पूर्ण एलिव्हेशन प्रकल्प'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'एका एलिव्हेशन प्रकल्पाला सामान्यत: किती वेळ लागतो?',
          answer: 'कालावधी कामाच्या व्याप्तीवर अवलंबून असते. साधे एलिव्हेशन डिझाइन 2-3 आठवडे घेऊ शकतात, तर पूर्ण फॅसाड नूतनीकरण 4-8 आठवडे घेऊ शकते।'
        },
        {
          question: 'तुम्ही काम सुरू करण्यापूर्वी 3D व्हिज्युअलायझेशन प्रदान करता का?',
          answer: 'होय, आम्ही तपशीलवार 3D एलिव्हेशन व्हिज्युअलायझेशन प्रदान करतो जेणेकरून बांधकाम सुरू होण्यापूर्वी तुम्ही तुमची इमारत कशी दिसेल हे पाहू शकाल।'
        },
        {
          question: 'एलिव्हेशनसाठी तुम्ही कोणत्या सामग्रीसह काम करता?',
          answer: 'आम्ही तुमच्या प्राधान्यांवर आणि अंदाजावर आधारित दगड, वीट, टाइल्स, पेंट, आणि आधुनिक क्लॅडिंग सामग्रीसह विविध सामग्रीसह काम करतो।'
        }
      ]
    }
  },
  furnitures: {
    en: {
      name: 'Furniture',
      description: 'Quality furniture for your home and office',
      whatWeDo: [
        'Custom furniture design',
        'Furniture manufacturing',
        'Furniture installation',
        'Furniture repair and restoration',
        'Office furniture solutions',
        'Home furniture collections'
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
      ]
    },
    hi: {
      name: 'फर्नीचर',
      description: 'आपके घर और कार्यालय के लिए गुणवत्तापूर्ण फर्नीचर',
      whatWeDo: [
        'कस्टम फर्नीचर डिजाइन',
        'फर्नीचर निर्माण',
        'फर्नीचर स्थापना',
        'फर्नीचर मरम्मत और बहाली',
        'ऑफिस फर्नीचर समाधान',
        'होम फर्नीचर संग्रह'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    },
    mr: {
      name: 'फर्निचर',
      description: 'तुमच्या घर आणि ऑफिससाठी गुणवत्तापूर्ण फर्निचर',
      whatWeDo: [
        'कस्टम फर्निचर डिझाइन',
        'फर्निचर उत्पादन',
        'फर्निचर स्थापना',
        'फर्निचर दुरुस्ती आणि पुनर्स्थापना',
        'ऑफिस फर्निचर उपाय',
        'होम फर्निचर संग्रह'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    }
  },
  'websites-mobile-app-development': {
    en: {
      name: 'Website and Mobile App Development',
      description: 'Professional website and mobile app development services to help your business establish a strong online presence and reach customers on all devices',
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
      ]
    },
    hi: {
      name: 'वेबसाइट और मोबाइल ऐप डेवलपमेंट',
      description: 'पेशेवर वेबसाइट और मोबाइल ऐप डेवलपमेंट सेवाएं आपके व्यवसाय को मजबूत ऑनलाइन उपस्थिति स्थापित करने और सभी उपकरणों पर ग्राहकों तक पहुंचने में मदद करने के लिए',
      whatWeDo: [
        'कस्टम वेबसाइट डिजाइन और डेवलपमेंट',
        'रिस्पॉन्सिव वेब एप्लिकेशन',
        'मोबाइल ऐप डेवलपमेंट (iOS और Android)',
        'ई-कॉमर्स समाधान',
        'कंटेंट मैनेजमेंट सिस्टम (CMS)',
        'प्रोग्रेसिव वेब ऐप्स (PWA)',
        'API एकीकरण और बैकएंड डेवलपमेंट',
        'वेबसाइट रखरखाव और अपडेट',
        'SEO अनुकूलन',
        'प्रदर्शन अनुकूलन'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'वेब डेवलपमेंट के लिए आप कौन सी तकनीकों का उपयोग करते हैं?',
          answer: 'हम आधुनिक तकनीकों का उपयोग करते हैं जिसमें React, Next.js, Vue.js, Node.js, और आपकी परियोजना आवश्यकताओं के आधार पर विभिन्न अन्य फ्रेमवर्क शामिल हैं।'
        },
        {
          question: 'क्या आप iOS और Android दोनों के लिए मोबाइल ऐप डेवलपमेंट प्रदान करते हैं?',
          answer: 'हां, हम React Native, Flutter, या नेटिव डेवलपमेंट टूल्स का उपयोग करके iOS और Android दोनों प्लेटफॉर्म के लिए नेटिव और क्रॉस-प्लेटफॉर्म मोबाइल एप्लिकेशन विकसित करते हैं।'
        },
        {
          question: 'वेबसाइट विकसित करने में कितना समय लगता है?',
          answer: 'समयसीमा आपकी परियोजना की जटिलता पर निर्भर करती है। एक साधारण वेबसाइट 2-4 सप्ताह ले सकती है, जबकि एक जटिल ई-कॉमर्स प्लेटफॉर्म 2-3 महीने ले सकता है।'
        },
        {
          question: 'क्या आप निरंतर रखरखाव और सहायता प्रदान करते हैं?',
          answer: 'हां, हम रखरखाव पैकेज प्रदान करते हैं ताकि आपकी वेबसाइट या ऐप अपडेटेड, सुरक्षित और इष्टतम प्रदर्शन करती रहे।'
        },
        {
          question: 'क्या आप SEO अनुकूलन में मदद कर सकते हैं?',
          answer: 'बिल्कुल! हम SEO अनुकूलन सेवाएं प्रदान करते हैं ताकि आपकी वेबसाइट की खोज इंजन में दृश्यता बढ़े और अधिक ऑर्गेनिक ट्रैफिक आकर्षित हो।'
        }
      ],
      websites: [
        {
          name: 'Kunda Electricals and Solar',
          url: 'https://www.kundaelectricalsandsolar.com/',
          description: 'पेशेवर इलेक्ट्रिकल और सोलर सेवाएं वेबसाइट'
        },
        {
          name: 'GP Manapur',
          url: 'https://www.gpmanapur.in/',
          description: 'ग्राम पंचायत मानापुर के लिए वेबसाइट'
        },
        {
          name: 'GP Pathrai',
          url: 'https://www.gppathrai.in/',
          description: 'ग्राम पंचायत पाथराई के लिए वेबसाइट'
        },
        {
          name: 'GP Karwahi',
          url: 'http://gpkarwahi.in/',
          description: 'ग्राम पंचायत करवाही के लिए वेबसाइट'
        }
      ]
    },
    mr: {
      name: 'वेबसाइट आणि मोबाइल ऍप डेव्हलपमेंट',
      description: 'तुमच्या व्यवसायाला मजबूत ऑनलाइन उपस्थिती स्थापित करण्यात आणि सर्व उपकरणांवर ग्राहकांपर्यंत पोहोचण्यात मदत करण्यासाठी व्यावसायिक वेबसाइट आणि मोबाइल ऍप डेव्हलपमेंट सेवा',
      whatWeDo: [
        'कस्टम वेबसाइट डिझाइन आणि डेव्हलपमेंट',
        'रिस्पॉन्सिव वेब अॅप्लिकेशन',
        'मोबाइल ऍप डेव्हलपमेंट (iOS आणि Android)',
        'ई-कॉमर्स उपाय',
        'कंटेंट मॅनेजमेंट सिस्टम (CMS)',
        'प्रोग्रेसिव वेब ऍप्स (PWA)',
        'API एकत्रीकरण आणि बॅकएंड डेव्हलपमेंट',
        'वेबसाइट देखभाल आणि अपडेट',
        'SEO ऑप्टिमायझेशन',
        'कामगिरी ऑप्टिमायझेशन'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ],
      faq: [
        {
          question: 'वेब डेव्हलपमेंटसाठी तुम्ही कोणत्या तंत्रज्ञानाचा वापर करता?',
          answer: 'आम्ही आधुनिक तंत्रज्ञान वापरतो ज्यात React, Next.js, Vue.js, Node.js, आणि तुमच्या प्रकल्प आवश्यकतांनुसार विविध इतर फ्रेमवर्क समाविष्ट आहेत।'
        },
        {
          question: 'तुम्ही iOS आणि Android दोन्हीसाठी मोबाइल ऍप डेव्हलपमेंट प्रदान करता का?',
          answer: 'होय, आम्ही React Native, Flutter, किंवा नेटिव्ह डेव्हलपमेंट टूल्स वापरून iOS आणि Android दोन्ही प्लॅटफॉर्मसाठी नेटिव्ह आणि क्रॉस-प्लॅटफॉर्म मोबाइल अॅप्लिकेशन विकसित करतो।'
        },
        {
          question: 'वेबसाइट विकसित करण्यासाठी किती वेळ लागतो?',
          answer: 'वेळापत्रक तुमच्या प्रकल्पाच्या जटिलतेवर अवलंबून असते. एक साधी वेबसाइट 2-4 आठवडे घेऊ शकते, तर एक जटिल ई-कॉमर्स प्लॅटफॉर्म 2-3 महिने घेऊ शकते।'
        },
        {
          question: 'तुम्ही सतत देखभाल आणि समर्थन प्रदान करता का?',
          answer: 'होय, आम्ही देखभाल पॅकेजेस ऑफर करतो जेणेकरून तुमची वेबसाइट किंवा ऍप अपडेटेड, सुरक्षित आणि इष्टतम कामगिरी करत राहील।'
        },
        {
          question: 'तुम्ही SEO ऑप्टिमायझेशनमध्ये मदत करू शकता का?',
          answer: 'नक्कीच! आम्ही SEO ऑप्टिमायझेशन सेवा प्रदान करतो जेणेकरून तुमच्या वेबसाइटची शोध इंजिनमध्ये दृश्यता सुधारेल आणि अधिक ऑर्गेनिक ट्रॅफिक आकर्षित करेल।'
        }
      ],
      websites: [
        {
          name: 'Kunda Electricals and Solar',
          url: 'https://www.kundaelectricalsandsolar.com/',
          description: 'व्यावसायिक इलेक्ट्रिकल आणि सोलर सेवा वेबसाइट'
        },
        {
          name: 'GP Manapur',
          url: 'https://www.gpmanapur.in/',
          description: 'ग्राम पंचायत मानापूर साठी वेबसाइट'
        },
        {
          name: 'GP Pathrai',
          url: 'https://www.gppathrai.in/',
          description: 'ग्राम पंचायत पाथराई साठी वेबसाइट'
        },
        {
          name: 'GP Karwahi',
          url: 'http://gpkarwahi.in/',
          description: 'ग्राम पंचायत करवाही साठी वेबसाइट'
        }
      ]
    }
  },
  'raw-materials': {
    en: {
      name: 'Raw Materials Supply',
      description: 'Quality construction and building materials',
      whatWeDo: [
        'Cement and concrete supply',
        'Steel and iron supply',
        'Brick and block supply',
        'Sand and aggregate supply',
        'Construction material delivery',
        'Bulk material supply'
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
      ]
    },
    hi: {
      name: 'कच्चा माल आपूर्ति',
      description: 'गुणवत्तापूर्ण निर्माण और भवन सामग्री',
      whatWeDo: [
        'सीमेंट और कंक्रीट आपूर्ति',
        'स्टील और लोहे की आपूर्ति',
        'ईंट और ब्लॉक आपूर्ति',
        'रेत और समुच्चय आपूर्ति',
        'निर्माण सामग्री वितरण',
        'थोक सामग्री आपूर्ति'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    },
    mr: {
      name: 'कच्चा माल पुरवठा',
      description: 'गुणवत्तापूर्ण बांधकाम आणि बिल्डिंग सामग्री',
      whatWeDo: [
        'सिमेंट आणि काँक्रीट पुरवठा',
        'स्टील आणि लोखंड पुरवठा',
        'वीट आणि ब्लॉक पुरवठा',
        'वाळू आणि समुच्चय पुरवठा',
        'बांधकाम सामग्री वितरण',
        'थोक सामग्री पुरवठा'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    }
  },
  'windows-doors-mesh': {
    en: {
      name: 'Windows, Doors & Mesh',
      description: 'Premium windows, doors and mesh solutions',
      whatWeDo: [
        'Window installation and repair',
        'Door installation and replacement',
        'Mesh screen installation',
        'Security door solutions',
        'Window and door maintenance',
        'Custom size windows and doors'
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
      ]
    },
    hi: {
      name: 'खिड़कियां, दरवाजे और मेश',
      description: 'प्रीमियम खिड़कियां, दरवाजे और मेश समाधान',
      whatWeDo: [
        'खिड़की स्थापना और मरम्मत',
        'दरवाजा स्थापना और प्रतिस्थापन',
        'मेश स्क्रीन स्थापना',
        'सुरक्षा दरवाजा समाधान',
        'खिड़की और दरवाजा रखरखाव',
        'कस्टम आकार की खिड़कियां और दरवाजे'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    },
    mr: {
      name: 'खिडक्या, दरवाजे आणि मेश',
      description: 'प्रीमियम खिडक्या, दरवाजे आणि मेश उपाय',
      whatWeDo: [
        'खिडकी स्थापना आणि दुरुस्ती',
        'दरवाजा स्थापना आणि बदली',
        'मेश स्क्रीन स्थापना',
        'सुरक्षा दरवाजा उपाय',
        'खिडकी आणि दरवाजा देखभाल',
        'कस्टम आकाराच्या खिडक्या आणि दरवाजे'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    }
  },
  'steel-iron-railings': {
    en: {
      name: 'Steel & Iron Railings',
      description: 'Durable steel and iron railing solutions',
      whatWeDo: [
        'Staircase railings',
        'Balcony railings',
        'Gate railings',
        'Custom railing design',
        'Railing installation',
        'Railing repair and maintenance'
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
      ]
    },
    hi: {
      name: 'स्टील और लोहे की रेलिंग',
      description: 'टिकाऊ स्टील और लोहे की रेलिंग समाधान',
      whatWeDo: [
        'सीढ़ी रेलिंग',
        'बालकनी रेलिंग',
        'गेट रेलिंग',
        'कस्टम रेलिंग डिजाइन',
        'रेलिंग स्थापना',
        'रेलिंग मरम्मत और रखरखाव'
      ]
    },
    mr: {
      name: 'स्टील आणि लोखंड रेलिंग',
      description: 'टिकाऊ स्टील आणि लोखंड रेलिंग उपाय',
      whatWeDo: [
        'पायऱ्या रेलिंग',
        'बाल्कनी रेलिंग',
        'गेट रेलिंग',
        'कस्टम रेलिंग डिझाइन',
        'रेलिंग स्थापना',
        'रेलिंग दुरुस्ती आणि देखभाल'
      ]
    }
  },
  'glass-homes': {
    en: {
      name: 'Glass for Homes',
      description: 'Premium glass solutions for modern homes',
      whatWeDo: [
        'Window glass replacement',
        'Mirror installation',
        'Glass partition walls',
        'Tempered glass solutions',
        'Glass door installation',
        'Glass repair and maintenance'
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
      ]
    },
    hi: {
      name: 'घरों के लिए कांच',
      description: 'आधुनिक घरों के लिए प्रीमियम कांच समाधान',
      whatWeDo: [
        'खिड़की कांच प्रतिस्थापन',
        'दर्पण स्थापना',
        'कांच विभाजन दीवारें',
        'टेम्पर्ड कांच समाधान',
        'कांच दरवाजा स्थापना',
        'कांच मरम्मत और रखरखाव'
      ],
      serviceArea: [
        'नागपुर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड़',
        'मौड़ा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    },
    mr: {
      name: 'घरांसाठी काच',
      description: 'आधुनिक घरांसाठी प्रीमियम काच उपाय',
      whatWeDo: [
        'खिडकी काच बदली',
        'आरसा स्थापना',
        'काच विभाजन भिंती',
        'टेम्पर्ड काच उपाय',
        'काच दरवाजा स्थापना',
        'काच दुरुस्ती आणि देखभाल'
      ],
      serviceArea: [
        'नागपूर शहर',
        'रामटेक',
        'कामठी',
        'कटोल',
        'उमरेड',
        'कलमेश्वर',
        'नरखेड',
        'मौडा',
        'परसोनी',
        'सोनर',
        'हिंगणा',
        'कुही',
        'भिवापुर',
        'कपसी',
        'कोराडी'
      ]
    }
  },
  'pop-puc-services': {
    en: {
      name: 'PoP & PUC Services',
      description: 'Professional PoP (Plaster of Paris) and PUC services',
      whatWeDo: [
        'PoP ceiling work',
        'PoP wall designs',
        'PUC (Pollution Under Control) certification',
        'Vehicle emission testing',
        'PoP repair and maintenance',
        'Custom PoP designs'
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
      ]
    },
    hi: {
      name: 'PoP और PUC सेवाएं',
      description: 'पेशेवर PoP (प्लास्टर ऑफ पेरिस) और PUC सेवाएं',
      whatWeDo: [
        'PoP छत का काम',
        'PoP दीवार डिजाइन',
        'PUC (प्रदूषण नियंत्रण) प्रमाणन',
        'वाहन उत्सर्जन परीक्षण',
        'PoP मरम्मत और रखरखाव',
        'कस्टम PoP डिजाइन'
      ]
    },
    mr: {
      name: 'PoP आणि PUC सेवा',
      description: 'व्यावसायिक PoP (प्लास्टर ऑफ पॅरिस) आणि PUC सेवा',
      whatWeDo: [
        'PoP छत काम',
        'PoP भिंत डिझाइन',
        'PUC (प्रदूषण नियंत्रण) प्रमाणपत्र',
        'वाहन उत्सर्जन चाचणी',
        'PoP दुरुस्ती आणि देखभाल',
        'कस्टम PoP डिझाइन'
      ]
    }
  },
  'layout-planning': {
    en: {
      name: 'Layout Planning',
      description: 'Professional space planning and layout design services for homes and commercial spaces',
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
      ]
    },
    hi: {
      name: 'लेआउट प्लानिंग',
      description: 'घरों और वाणिज्यिक स्थानों के लिए पेशेवर स्पेस प्लानिंग और लेआउट डिजाइन सेवाएं',
      whatWeDo: [
        'स्पेस प्लानिंग और लेआउट डिजाइन',
        'फ्लोर प्लान निर्माण और अनुकूलन',
        'कमरे की व्यवस्था और फर्नीचर प्लेसमेंट',
        'वाणिज्यिक स्पेस प्लानिंग',
        'किचन और बाथरूम लेआउट डिजाइन',
        '3D विज़ुअलाइज़ेशन और रेंडरिंग',
        'बिल्डिंग कोड अनुपालन प्लानिंग',
        'पहुंच और एर्गोनोमिक डिजाइन'
      ]
    },
    mr: {
      name: 'लेआउट प्लानिंग',
      description: 'घरां आणि व्यावसायिक जागांसाठी व्यावसायिक स्पेस प्लानिंग आणि लेआउट डिझाइन सेवा',
      whatWeDo: [
        'स्पेस प्लानिंग आणि लेआउट डिझाइन',
        'फ्लोर प्लान निर्माण आणि ऑप्टिमायझेशन',
        'खोली व्यवस्था आणि फर्निचर प्लेसमेंट',
        'व्यावसायिक स्पेस प्लानिंग',
        'किचन आणि बाथरूम लेआउट डिझाइन',
        '3D व्हिज्युअलायझेशन आणि रेंडरिंग',
        'बिल्डिंग कोड अनुपालन प्लानिंग',
        'प्रवेश आणि एर्गोनोमिक डिझाइन'
      ]
    }
  },
  'painting': {
    en: {
      name: 'Painting Services',
      description: 'Professional interior and exterior painting services for homes and commercial spaces',
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
      ]
    },
    hi: {
      name: 'पेंटिंग सेवाएं',
      description: 'घरों और वाणिज्यिक स्थानों के लिए पेशेवर आंतरिक और बाहरी पेंटिंग सेवाएं',
      whatWeDo: [
        'आंतरिक पेंटिंग और दीवार उपचार',
        'बाहरी पेंटिंग और वेदरप्रूफिंग',
        'टेक्सचर पेंटिंग और सजावटी फिनिश',
        'प्राइमर और बेस कोट एप्लिकेशन',
        'रंग परामर्श और चयन',
        'दीवार तैयारी और सतह मरम्मत',
        'वाणिज्यिक पेंटिंग सेवाएं',
        'निर्माण के बाद पेंटिंग'
      ]
    },
    mr: {
      name: 'पेंटिंग सेवा',
      description: 'घरां आणि व्यावसायिक जागांसाठी व्यावसायिक आतील आणि बाहेरील पेंटिंग सेवा',
      whatWeDo: [
        'आतील पेंटिंग आणि भिंत उपचार',
        'बाहेरील पेंटिंग आणि वेदरप्रूफिंग',
        'टेक्सचर पेंटिंग आणि सजावटी फिनिश',
        'प्राइमर आणि बेस कोट अॅप्लिकेशन',
        'रंग सल्ला आणि निवड',
        'भिंत तयारी आणि पृष्ठभाग दुरुस्ती',
        'व्यावसायिक पेंटिंग सेवा',
        'बांधकामानंतर पेंटिंग'
      ]
    }
  },
  'floor-and-tiles': {
    en: {
      name: 'Floor & Tiles',
      description: 'Professional flooring and tiling solutions for homes and commercial spaces',
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
      ]
    },
    hi: {
      name: 'फ्लोर और टाइल्स',
      description: 'घरों और वाणिज्यिक स्थानों के लिए पेशेवर फ्लोरिंग और टाइलिंग समाधान',
      whatWeDo: [
        'सिरेमिक और वाइट्रिफाइड टाइल स्थापना',
        'संगमरमर और ग्रेनाइट फ्लोरिंग',
        'लकड़ी की फ्लोरिंग स्थापना',
        'विनाइल और लैमिनेट फ्लोरिंग',
        'बाथरूम और किचन टाइलिंग',
        'फ्लोर मरम्मत और प्रतिस्थापन',
        'ग्राउटिंग और सीलिंग सेवाएं',
        'पैटर्न और डिजाइन टाइल काम'
      ]
    },
    mr: {
      name: 'फ्लोर आणि टाइल्स',
      description: 'घरां आणि व्यावसायिक जागांसाठी व्यावसायिक फ्लोरिंग आणि टाइलिंग उपाय',
      whatWeDo: [
        'सिरॅमिक आणि व्हिट्रिफाइड टाइल स्थापना',
        'संगमरवरी आणि ग्रॅनाइट फ्लोरिंग',
        'लाकडी फ्लोरिंग स्थापना',
        'विनाइल आणि लॅमिनेट फ्लोरिंग',
        'बाथरूम आणि किचन टाइलिंग',
        'फ्लोर दुरुस्ती आणि बदली',
        'ग्राउटिंग आणि सीलिंग सेवा',
        'पॅटर्न आणि डिझाइन टाइल काम'
      ]
    }
  },
  'carpentry': {
    en: {
      name: 'Carpentry & Woodwork',
      description: 'Expert carpentry and woodwork services for custom furniture and home improvements',
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
      ]
    },
    hi: {
      name: 'बढ़ईगीरी और लकड़ी का काम',
      description: 'कस्टम फर्नीचर और घर सुधार के लिए विशेषज्ञ बढ़ईगीरी और लकड़ी का काम सेवाएं',
      whatWeDo: [
        'कस्टम फर्नीचर डिजाइन और निर्माण',
        'लकड़ी के दरवाजे और खिड़कियां',
        'किचन कैबिनेट और अलमारी',
        'लकड़ी की फ्लोरिंग और पैनलिंग',
        'बढ़ईगीरी मरम्मत और बहाली',
        'मॉड्यूलर फर्नीचर समाधान',
        'लकड़ी की नक्काशी और सजावटी काम',
        'लकड़ी पॉलिशिंग और फिनिशिंग'
      ]
    },
    mr: {
      name: 'सुतारकाम आणि लाकडी काम',
      description: 'कस्टम फर्निचर आणि घर सुधारणांसाठी तज्ञ सुतारकाम आणि लाकडी काम सेवा',
      whatWeDo: [
        'कस्टम फर्निचर डिझाइन आणि उत्पादन',
        'लाकडी दरवाजे आणि खिडक्या',
        'किचन कॅबिनेट आणि अलमारी',
        'लाकडी फ्लोरिंग आणि पॅनेलिंग',
        'सुतारकाम दुरुस्ती आणि पुनर्स्थापना',
        'मॉड्यूलर फर्निचर उपाय',
        'लाकडी कोरीव काम आणि सजावटी काम',
        'लाकूड पॉलिशिंग आणि फिनिशिंग'
      ]
    }
  },
  'office-setup': {
    en: {
      name: 'Office Setup',
      description: 'Complete office setup and workspace solutions for businesses',
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
      ]
    },
    hi: {
      name: 'ऑफिस सेटअप',
      description: 'व्यवसायों के लिए पूर्ण ऑफिस सेटअप और वर्कस्पेस समाधान',
      whatWeDo: [
        'ऑफिस स्पेस प्लानिंग और डिजाइन',
        'वर्कस्टेशन और फर्नीचर स्थापना',
        'क्यूबिकल और विभाजन सेटअप',
        'विद्युत और नेटवर्किंग सेटअप',
        'ऑफिस आंतरिक सजावट',
        'कॉन्फ्रेंस रूम सेटअप',
        'रिसेप्शन क्षेत्र डिजाइन',
        'पूर्ण ऑफिस नवीकरण'
      ]
    },
    mr: {
      name: 'ऑफिस सेटअप',
      description: 'व्यवसायांसाठी पूर्ण ऑफिस सेटअप आणि वर्कस्पेस उपाय',
      whatWeDo: [
        'ऑफिस स्पेस प्लानिंग आणि डिझाइन',
        'वर्कस्टेशन आणि फर्निचर स्थापना',
        'क्यूबिकल आणि विभाजन सेटअप',
        'विद्युत आणि नेटवर्किंग सेटअप',
        'ऑफिस आतील सजावट',
        'कॉन्फरन्स रूम सेटअप',
        'रिसेप्शन क्षेत्र डिझाइन',
        'पूर्ण ऑफिस नवीकरण'
      ]
    }
  },
  'gardening': {
    en: {
      name: 'Gardening & Landscaping',
      description: 'Professional gardening and landscaping services for homes and commercial spaces',
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
      ]
    },
    hi: {
      name: 'बागवानी और लैंडस्केपिंग',
      description: 'घरों और वाणिज्यिक स्थानों के लिए पेशेवर बागवानी और लैंडस्केपिंग सेवाएं',
      whatWeDo: [
        'गार्डन डिजाइन और लैंडस्केपिंग',
        'लॉन स्थापना और रखरखाव',
        'पौधे चयन और स्थापना',
        'पेड़ लगाना और देखभाल',
        'गार्डन सिंचाई प्रणाली',
        'गार्डन लाइटिंग और सजावट',
        'मौसमी पौधे देखभाल',
        'वाणिज्यिक लैंडस्केपिंग'
      ]
    },
    mr: {
      name: 'बागकाम आणि लँडस्केपिंग',
      description: 'घरां आणि व्यावसायिक जागांसाठी व्यावसायिक बागकाम आणि लँडस्केपिंग सेवा',
      whatWeDo: [
        'बाग डिझाइन आणि लँडस्केपिंग',
        'लॉन स्थापना आणि देखभाल',
        'झाड निवड आणि स्थापना',
        'झाड लागवड आणि काळजी',
        'बाग सिंचन प्रणाली',
        'बाग लाइटिंग आणि सजावट',
        'हंगामी झाड काळजी',
        'व्यावसायिक लँडस्केपिंग'
      ]
    }
  },
  'construction': {
    en: {
      name: 'Construction Services',
      description: 'Complete construction and building solutions for residential and commercial projects',
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
      ]
    },
    hi: {
      name: 'निर्माण सेवाएं',
      description: 'आवासीय और वाणिज्यिक परियोजनाओं के लिए पूर्ण निर्माण और भवन समाधान',
      whatWeDo: [
        'आवासीय निर्माण और भवन',
        'वाणिज्यिक निर्माण परियोजनाएं',
        'घर नवीकरण और पुनर्निर्माण',
        'नींव और संरचनात्मक कार्य',
        'छत और वाटरप्रूफिंग',
        'भवन विस्तार और विस्तार',
        'निर्माण परियोजना प्रबंधन',
        'गुणवत्तापूर्ण निर्माण सामग्री'
      ],
      faq: [
        {
          question: 'आप किस प्रकार की निर्माण परियोजनाएं संभालते हैं?',
          answer: 'हम सभी प्रकार की निर्माण परियोजनाएं संभालते हैं जिसमें आवासीय घर, वाणिज्यिक भवन, नवीकरण, विस्तार, और नींव से फिनिशिंग तक पूर्ण भवन निर्माण शामिल है।'
        },
        {
          question: 'क्या आप पूर्ण निर्माण सेवाएं प्रदान करते हैं या केवल विशिष्ट भाग?',
          answer: 'हम योजना, डिजाइन, सामग्री खरीद, निर्माण, और फिनिशिंग सहित पूर्ण एंड-टू-एंड निर्माण सेवाएं प्रदान करते हैं। हम आपकी आवश्यकताओं के अनुसार निर्माण के विशिष्ट भागों को भी संभाल सकते हैं।'
        },
        {
          question: 'एक सामान्य निर्माण परियोजना में कितना समय लगता है?',
          answer: 'परियोजना की अवधि दायरे और आकार पर निर्भर करती है। एक छोटा नवीकरण 2-4 सप्ताह लेता है, जबकि एक पूर्ण घर निर्माण आमतौर पर 4-8 महीने लेता है। हम परियोजना योजना के दौरान विस्तृत समयसीमा प्रदान करते हैं।'
        },
        {
          question: 'क्या आप सभी आवश्यक परमिट और अनुमोदन संभालते हैं?',
          answer: 'हां, हम सभी आवश्यक भवन परमिट, अनुमोदन, और स्थानीय भवन कोड और नियमों के अनुपालन में सहायता करते हैं ताकि आपकी परियोजना कानूनी रूप से अनुपालन करे।'
        },
        {
          question: 'निर्माण कार्य पर आप क्या वारंटी प्रदान करते हैं?',
          answer: 'हम संरचनात्मक कार्य (10 वर्ष), सामान्य निर्माण (5 वर्ष), और फिनिशिंग कार्य (2 वर्ष) को कवर करने वाली व्यापक वारंटी प्रदान करते हैं ताकि आपके निवेश की सुरक्षा सुनिश्चित हो सके।'
        }
      ]
    },
    mr: {
      name: 'बांधकाम सेवा',
      description: 'निवासी आणि व्यावसायिक प्रकल्पांसाठी पूर्ण बांधकाम आणि इमारत उपाय',
      whatWeDo: [
        'निवासी बांधकाम आणि इमारत',
        'व्यावसायिक बांधकाम प्रकल्प',
        'घर नूतनीकरण आणि पुनर्निर्माण',
        'पाया आणि संरचनात्मक काम',
        'छप्पर आणि वॉटरप्रूफिंग',
        'इमारत विस्तार आणि विस्तार',
        'बांधकाम प्रकल्प व्यवस्थापन',
        'गुणवत्तापूर्ण बांधकाम साहित्य'
      ],
      faq: [
        {
          question: 'तुम्ही कोणत्या प्रकारच्या बांधकाम प्रकल्पांना हाताळता?',
          answer: 'आम्ही सर्व प्रकारच्या बांधकाम प्रकल्पांना हाताळतो ज्यात निवासी घरे, व्यावसायिक इमारती, नूतनीकरण, विस्तार, आणि पायापासून फिनिशिंगपर्यंत पूर्ण इमारत बांधकाम समाविष्ट आहे।'
        },
        {
          question: 'तुम्ही पूर्ण बांधकाम सेवा प्रदान करता की फक्त विशिष्ट भाग?',
          answer: 'आम्ही नियोजन, डिझाइन, साहित्य खरेदी, बांधकाम, आणि फिनिशिंग यासह पूर्ण एंड-टू-एंड बांधकाम सेवा प्रदान करतो. आम्ही तुमच्या आवश्यकतांनुसार बांधकामाच्या विशिष्ट भागांना देखील हाताळू शकतो।'
        },
        {
          question: 'एका सामान्य बांधकाम प्रकल्पाला किती वेळ लागतो?',
          answer: 'प्रकल्पाची कालावधी व्याप्ती आणि आकारावर अवलंबून असते. एक लहान नूतनीकरण 2-4 आठवडे घेते, तर एक पूर्ण घर बांधकाम सामान्यत: 4-8 महिने घेते. आम्ही प्रकल्प नियोजनादरम्यान तपशीलवार वेळापत्रक प्रदान करतो।'
        },
        {
          question: 'तुम्ही सर्व आवश्यक परमिट आणि मंजुरी हाताळता का?',
          answer: 'होय, आम्ही सर्व आवश्यक इमारत परमिट, मंजुरी, आणि स्थानिक इमारत कोड आणि नियमांच्या अनुपालनात मदत करतो जेणेकरून तुमचा प्रकल्प कायदेशीररित्या अनुपालन करेल।'
        },
        {
          question: 'बांधकाम कामावर तुम्ही कोणती वारंटी प्रदान करता?',
          answer: 'आम्ही संरचनात्मक काम (10 वर्षे), सामान्य बांधकाम (5 वर्षे), आणि फिनिशिंग काम (2 वर्षे) कव्हर करणारी व्यापक वारंटी प्रदान करतो जेणेकरून तुमच्या गुंतवणुकीचे संरक्षण सुनिश्चित होईल।'
        }
      ]
    }
  }
};

export const getTranslatedService = (service: Service, language: Language): Service => {
  const translations = serviceTranslations[service.id];
  if (!translations) {
    return service; // Return original if no translation found
  }

  const translated = translations[language];

  return {
    ...service,
    name: translated.name,
    description: translated.description,
    whatWeDo: translated.whatWeDo,
    // Use translated serviceArea if available, otherwise fall back to original
    serviceArea: translated.serviceArea || service.serviceArea,
    // Use translated FAQ if available, otherwise fall back to original service FAQ
    faq: translated.faq || service.faq,
    // Use translated websites if available, otherwise fall back to original service websites
    websites: translated.websites || service.websites
  };
};

