// useLocale.ts — Locale & i18n Hook
// ONEartHeaven™ Phase 13 — Area 2

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_MAP,
  LOCALE_STORAGE_KEY,
  type LocaleConfig,
  RTL_LOCALES,
  SUPPORTED_LOCALES,
  type SupportedLocale,
  type TranslationKey,
} from "../data/i18nTypes";

// Lazy import to avoid circular — data file is large
let _translations: Record<
  SupportedLocale,
  Record<TranslationKey, string>
> | null = null;
async function loadTranslations() {
  if (!_translations) {
    const mod = await import("../data/i18nData");
    _translations = mod.TRANSLATIONS;
  }
  return _translations;
}

// Sync fallback map for SSR/initial render
const FALLBACK: Record<TranslationKey, string> = {} as Record<
  TranslationKey,
  string
>;

function getT(locale: SupportedLocale, key: TranslationKey): string {
  if (_translations) {
    return _translations[locale]?.[key] ?? _translations.en?.[key] ?? key;
  }
  return FALLBACK[key] ?? key;
}

function detectBrowserLocale(): SupportedLocale {
  const supported = SUPPORTED_LOCALES.map((l) => l.locale);
  const nav = (navigator.language ?? "").split("-")[0] as SupportedLocale;
  return supported.includes(nav) ? nav : DEFAULT_LOCALE;
}

function applyLocaleToDOM(locale: SupportedLocale) {
  const config = LOCALE_MAP[locale];
  document.documentElement.lang = locale;
  document.documentElement.dir = config.direction;
}

export function useLocale() {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    try {
      const stored = localStorage.getItem(
        LOCALE_STORAGE_KEY,
      ) as SupportedLocale | null;
      const supported = SUPPORTED_LOCALES.map((l) => l.locale);
      if (stored && supported.includes(stored)) return stored;
    } catch {}
    return detectBrowserLocale();
  });

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    applyLocaleToDOM(locale);
    loadTranslations().then(() => forceUpdate((n) => n + 1));
  }, [locale]);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch {}
    setLocaleState(newLocale);
    applyLocaleToDOM(newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => getT(locale, key),
    [locale],
  );

  const config: LocaleConfig = LOCALE_MAP[locale];
  const isRTL = RTL_LOCALES.includes(locale);

  const formatDate = useCallback(
    (date: Date | string): string => {
      const d = typeof date === "string" ? new Date(date) : date;
      try {
        return new Intl.DateTimeFormat(config.numberFormat, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(d);
      } catch {
        return d.toLocaleDateString();
      }
    },
    [config],
  );

  const formatNumber = useCallback(
    (num: number): string => {
      try {
        return new Intl.NumberFormat(config.numberFormat).format(num);
      } catch {
        return num.toString();
      }
    },
    [config],
  );

  const formatCurrency = useCallback(
    (amount: number): string => {
      try {
        return new Intl.NumberFormat(config.numberFormat, {
          style: "currency",
          currency: config.currencyCode,
          maximumFractionDigits: 0,
        }).format(amount);
      } catch {
        return `${config.currencyCode} ${amount}`;
      }
    },
    [config],
  );

  return {
    locale,
    setLocale,
    t,
    config,
    isRTL,
    direction: config.direction,
    flag: config.flag,
    nativeName: config.nativeName,
    formatDate,
    formatNumber,
    formatCurrency,
    supportedLocales: SUPPORTED_LOCALES,
  };
}

export function useRTL() {
  const { isRTL, direction } = useLocale();
  return { isRTL, direction };
}
