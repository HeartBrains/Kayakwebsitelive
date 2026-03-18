import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getTranslation } from './translations';

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context with a default value to prevent errors during HMR
const defaultContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function - uses translation files
  const t = (key: string) => {
    return getTranslation(language, key);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}