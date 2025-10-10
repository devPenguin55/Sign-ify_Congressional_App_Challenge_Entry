import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UILanguage = "en" | "es" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ko" | "ar";

interface SettingsContextType {
  uiLanguage: UILanguage;
  setUILanguage: (lang: UILanguage) => void;
  autoPlayTranslation: boolean;
  setAutoPlayTranslation: (value: boolean) => void;
  saveVideoHistory: boolean;
  setSaveVideoHistory: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [uiLanguage, setUILanguage] = useState<UILanguage>(() => {
    const saved = localStorage.getItem("uiLanguage");
    return (saved as UILanguage) || "en";
  });

  const [autoPlayTranslation, setAutoPlayTranslation] = useState(() => {
    const saved = localStorage.getItem("autoPlayTranslation");
    return saved === "true";
  });

  const [saveVideoHistory, setSaveVideoHistory] = useState(() => {
    const saved = localStorage.getItem("saveVideoHistory");
    return saved !== "false";
  });

  useEffect(() => {
    localStorage.setItem("uiLanguage", uiLanguage);
  }, [uiLanguage]);

  useEffect(() => {
    localStorage.setItem("autoPlayTranslation", autoPlayTranslation.toString());
  }, [autoPlayTranslation]);

  useEffect(() => {
    localStorage.setItem("saveVideoHistory", saveVideoHistory.toString());
  }, [saveVideoHistory]);

  return (
    <SettingsContext.Provider
      value={{
        uiLanguage,
        setUILanguage,
        autoPlayTranslation,
        setAutoPlayTranslation,
        saveVideoHistory,
        setSaveVideoHistory,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
