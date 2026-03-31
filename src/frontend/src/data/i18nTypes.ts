// i18nTypes.ts — Multi-Language & Localization Type System
// ONEartHeaven™ Phase 13 — Area 2

export type SupportedLocale =
  | "en"
  | "es"
  | "fr"
  | "ar"
  | "zh"
  | "hi"
  | "pt"
  | "sw"
  | "ru"
  | "de";
export type LocaleDirection = "ltr" | "rtl";

export type TranslationKey =
  | "nav.home"
  | "nav.about"
  | "nav.governance"
  | "nav.assembly"
  | "nav.councils"
  | "nav.resolutions"
  | "nav.policyAdvisor"
  | "nav.delegates"
  | "nav.solutions"
  | "nav.portals"
  | "nav.transparency"
  | "nav.community"
  | "nav.finance"
  | "nav.sustainability"
  | "nav.academy"
  | "nav.campaigns"
  | "nav.docs"
  | "nav.pricing"
  | "nav.launch"
  | "nav.marketplace"
  | "nav.login"
  | "nav.logout"
  | "nav.register"
  | "nav.dashboard"
  | "nav.admin"
  | "nav.settings"
  | "auth.login"
  | "auth.logout"
  | "auth.register"
  | "auth.profile"
  | "auth.role"
  | "auth.wallet"
  | "auth.connected"
  | "auth.notConnected"
  | "action.submit"
  | "action.cancel"
  | "action.save"
  | "action.delete"
  | "action.edit"
  | "action.view"
  | "action.search"
  | "action.filter"
  | "action.copy"
  | "action.share"
  | "action.download"
  | "action.upload"
  | "action.apply"
  | "action.join"
  | "action.leave"
  | "action.approve"
  | "action.reject"
  | "action.next"
  | "action.back"
  | "action.skip"
  | "action.close"
  | "action.open"
  | "action.refresh"
  | "action.loadMore"
  | "action.getStarted"
  | "status.active"
  | "status.inactive"
  | "status.pending"
  | "status.approved"
  | "status.rejected"
  | "status.completed"
  | "status.inProgress"
  | "status.draft"
  | "status.published"
  | "status.archived"
  | "status.open"
  | "status.closed"
  | "hero.tagline"
  | "hero.subtitle"
  | "hero.cta"
  | "hero.learnMore"
  | "form.name"
  | "form.email"
  | "form.organization"
  | "form.role"
  | "form.description"
  | "form.title"
  | "form.category"
  | "form.region"
  | "form.language"
  | "form.required"
  | "form.optional"
  | "form.placeholder.search"
  | "form.placeholder.name"
  | "form.placeholder.email"
  | "form.placeholder.description"
  | "gov.resolution"
  | "gov.resolutions"
  | "gov.council"
  | "gov.councils"
  | "gov.delegate"
  | "gov.delegates"
  | "gov.vote"
  | "gov.voting"
  | "gov.passed"
  | "gov.failed"
  | "gov.quorum"
  | "gov.proposal"
  | "gov.assembly"
  | "eco.franchise"
  | "eco.fractionalize"
  | "eco.revenue"
  | "eco.investment"
  | "eco.wallet"
  | "eco.treasury"
  | "eco.earnings"
  | "eco.payout"
  | "time.today"
  | "time.yesterday"
  | "time.daysAgo"
  | "time.weeksAgo"
  | "time.monthsAgo"
  | "time.justNow"
  | "time.updatedAt"
  | "time.createdAt"
  | "error.generic"
  | "error.notFound"
  | "error.unauthorized"
  | "error.network"
  | "error.required"
  | "error.invalid";

export interface LocaleConfig {
  locale: SupportedLocale;
  name: string;
  nativeName: string;
  direction: LocaleDirection;
  flag: string;
  dateFormat: string;
  numberFormat: string;
  currencyCode: string;
}

export type TranslationMap = Record<TranslationKey, string>;
export type LocaleTranslations = Record<SupportedLocale, TranslationMap>;

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  {
    locale: "en",
    name: "English",
    nativeName: "English",
    direction: "ltr",
    flag: "🇺🇸",
    dateFormat: "MM/DD/YYYY",
    numberFormat: "en-US",
    currencyCode: "USD",
  },
  {
    locale: "es",
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    flag: "🇪🇸",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "es-ES",
    currencyCode: "EUR",
  },
  {
    locale: "fr",
    name: "French",
    nativeName: "Français",
    direction: "ltr",
    flag: "🇫🇷",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "fr-FR",
    currencyCode: "EUR",
  },
  {
    locale: "ar",
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flag: "🇸🇦",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "ar-SA",
    currencyCode: "SAR",
  },
  {
    locale: "zh",
    name: "Chinese",
    nativeName: "中文",
    direction: "ltr",
    flag: "🇨🇳",
    dateFormat: "YYYY/MM/DD",
    numberFormat: "zh-CN",
    currencyCode: "CNY",
  },
  {
    locale: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    direction: "ltr",
    flag: "🇮🇳",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "hi-IN",
    currencyCode: "INR",
  },
  {
    locale: "pt",
    name: "Portuguese",
    nativeName: "Português",
    direction: "ltr",
    flag: "🇧🇷",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "pt-BR",
    currencyCode: "BRL",
  },
  {
    locale: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    direction: "ltr",
    flag: "🇰🇪",
    dateFormat: "DD/MM/YYYY",
    numberFormat: "sw-KE",
    currencyCode: "KES",
  },
  {
    locale: "ru",
    name: "Russian",
    nativeName: "Русский",
    direction: "ltr",
    flag: "🇷🇺",
    dateFormat: "DD.MM.YYYY",
    numberFormat: "ru-RU",
    currencyCode: "RUB",
  },
  {
    locale: "de",
    name: "German",
    nativeName: "Deutsch",
    direction: "ltr",
    flag: "🇩🇪",
    dateFormat: "DD.MM.YYYY",
    numberFormat: "de-DE",
    currencyCode: "EUR",
  },
];

export const LOCALE_MAP: Record<SupportedLocale, LocaleConfig> =
  Object.fromEntries(SUPPORTED_LOCALES.map((l) => [l.locale, l])) as Record<
    SupportedLocale,
    LocaleConfig
  >;

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const RTL_LOCALES: SupportedLocale[] = ["ar"];
export const LOCALE_STORAGE_KEY = "oeh_locale";
