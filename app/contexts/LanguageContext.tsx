"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "fr";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type TranslationsType = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: TranslationsType = {
  en: {
    copyRightFirst: "Copyright © 2023 Paynah. All rights reserved",
    copyRightSecond: "Privacy Policy",
    greeting: "Hello,",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    resetPasswordText: "I lost my password",
    submitButtonText: "Unlock",
    loadingText: "Loading...",
    openAccountText: "Open my account",
    invalidCredentials: "Invalid email or password, please try again!",
    // Zod error messages
    emailRequired: "📧 Please provide your email!",
    emailInvalid: "🚫 Oops! That's not a valid email.",
    passwordRequired: "🔒 Password, please!",
    passwordMinLength:
      "🔑 Password should be at least {length} characters long!",

    support_title: "Serenity space",
    support_placeholder: "Do you have any concerns?",
    support_message_placeholder: "Write your message",
    support_send: "Send",
    support_expand: "Show more options",
  },
  fr: {
    copyRightFirst: "Copyright © 2023 Paynah. Tous droits réservés",
    copyRightSecond: "Politique de confidentialité",
    greeting: "Bonjour,",
    emailPlaceholder: "Identifiant",
    passwordPlaceholder: "Clé d'accès",
    resetPasswordText: "J'ai perdu ma clé",
    submitButtonText: "Deverrouiller",
    loadingText: "Chargement...",
    openAccountText: "Ouvrir mon compte",
    invalidCredentials: "Identifiant ou clé d'accès incorrect, réessayez !",
    // Zod error messages
    emailRequired: "📧 Veuillez renseigner votre email!",
    emailInvalid: "🚫 Oops! Ce n'est pas un email valide.",
    passwordRequired: "🔒 Veuillez renseigner votre mot de passe!",
    passwordMinLength:
      "🔑 Votre mot de passe doit contenir au moins {length} caractères!",

    // Support/Serenity
    support_title: "Serenity space",
    support_placeholder: "Avez-vous des préoccupations ?",
    support_message_placeholder: "Écrivez votre message",
    support_send: "Envoyer",
    support_expand: "Afficher plus d'options",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
