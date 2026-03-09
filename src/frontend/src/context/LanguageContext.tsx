import { type ReactNode, createContext, useContext, useState } from "react";

export interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  selectedLanguage: "en",
  setSelectedLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
