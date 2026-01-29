import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageService, StorageKeys } from '../services/storage';
import { translations, Language, TranslationKey } from './translations';
import { DEFAULT_LANGUAGE } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  // Load saved language from storage
  useEffect(() => {
    try {
      if (StorageService && StorageService.getString) {
        const savedLanguage = StorageService.getString(StorageKeys.LANGUAGE) as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'mr')) {
          setLanguageState(savedLanguage);
        }
      }
    } catch (error) {
      console.warn('Error loading language from storage:', error);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (StorageService && StorageService.setString) {
        StorageService.setString(StorageKeys.LANGUAGE, lang);
      }
    } catch (error) {
      console.warn('Error saving language to storage:', error);
    }
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = translations[language][key];

    if (!translation) {
      // Fallback to English if translation is missing
      translation = translations.en[key];
      if (!translation) {
        console.warn(`Missing translation for key: "${key}"`);
        return key;
      }
    }

    // Support interpolation with {{paramName}} syntax
    if (params) {
      Object.keys(params).forEach((paramKey) => {
        const value = String(params[paramKey]);
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), value);
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

