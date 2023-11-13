"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import { LANGUAGE_STORAGE_KEY } from "constants/language";
import i18n from "i18n";

interface Props {
  children: React.ReactNode;
}

const I18nProvider = ({ children }: Props) => {
  useEffect(() => {
    const languageStorageValue = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (languageStorageValue) {
      i18n.changeLanguage(languageStorageValue);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
