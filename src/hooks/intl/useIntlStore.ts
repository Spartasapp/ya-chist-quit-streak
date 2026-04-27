import { create } from "zustand";
import { TRANSLATION_KEY, type TranslationKey } from "./translationKeys";

export type Locale = "en" | "ru";

type TranslationMap = Record<TranslationKey, string>;
type Translations = Record<Locale, TranslationMap>;

type StoreState = {
  lang: Locale;
  translations: Translations;
  setLang: (lang: Locale) => void;
};

const readInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("app_lang");
  return saved === "ru" ? "ru" : "en";
};

export const useIntlStore = create<StoreState>((set) => ({
  lang: readInitialLocale(),
  translations: {
    en: {
      [TRANSLATION_KEY.APP_BADGE]: "BadHabits PWA",
      [TRANSLATION_KEY.APP_TITLE]: "Abstinence tracker",
      [TRANSLATION_KEY.TODAY]: "Today",
      [TRANSLATION_KEY.DAY_ENDS_IN]: "Day ends in",
      [TRANSLATION_KEY.DASHBOARD]: "Dashboard",
      [TRANSLATION_KEY.STATS]: "Stats",
      [TRANSLATION_KEY.HISTORY]: "History",
      [TRANSLATION_KEY.ALCOHOL]: "Alcohol",
      [TRANSLATION_KEY.CIGARETTES]: "Cigarettes",
      [TRANSLATION_KEY.CURRENT_STREAK]: "Current streak: {days} days",
      [TRANSLATION_KEY.DAILY_CHECKMARK]: "Mark today",
      [TRANSLATION_KEY.CHECKED_TODAY]: "Checked today",
      [TRANSLATION_KEY.PROGRESS_MILESTONE]: "Progress to 30-day milestone",
      [TRANSLATION_KEY.MAX_STREAK]: "Max streak: {days}",
      [TRANSLATION_KEY.MARK_RELAPSE]: "Mark relapse",
      [TRANSLATION_KEY.TOTAL_ENTRIES]: "Total Entries",
      [TRANSLATION_KEY.MISSED_DAYS]: "Missed Days",
      [TRANSLATION_KEY.ALCOHOL_RELAPSES]: "Alcohol Relapses",
      [TRANSLATION_KEY.CIGARETTES_RELAPSES]: "Cigarettes Relapses",
      [TRANSLATION_KEY.HEATMAP]: "{habit} heatmap",
      [TRANSLATION_KEY.ALCOHOL_SOBER_DAYS]: "Days without alcohol",
      [TRANSLATION_KEY.CIGARETTES_SOBER_DAYS]: "Days without cigarettes",
      [TRANSLATION_KEY.WEEKLY_CONSISTENCY]: "{habit} weekly consistency",
      [TRANSLATION_KEY.CUMULATIVE_SCORE]: "Cumulative score",
      [TRANSLATION_KEY.HISTORY_LIST]: "History list",
      [TRANSLATION_KEY.EXPORT_JSON]: "Export JSON",
      [TRANSLATION_KEY.NO_DATA_YET]: "No data yet. Start with daily checkmarks.",
      [TRANSLATION_KEY.ABSTINENT]: "Abstinent",
      [TRANSLATION_KEY.MISSED]: "Missed",
      [TRANSLATION_KEY.RELAPSES]: "Relapses",
      [TRANSLATION_KEY.RELAPSE_AT]: "at {time}",
      [TRANSLATION_KEY.NO_RELAPSES]: "No relapses recorded.",
      [TRANSLATION_KEY.ADSENSE_BANNER_TITLE]: "AdSense Banner",
      [TRANSLATION_KEY.ADSENSE_NOT_CONFIGURED]:
        "Set VITE_ADSENSE_CLIENT_ID and VITE_ADSENSE_SLOT_ID to enable ads.",
      [TRANSLATION_KEY.LANGUAGE]: "Language",
    },
    ru: {
      [TRANSLATION_KEY.APP_BADGE]: "BadHabits PWA",
      [TRANSLATION_KEY.APP_TITLE]: "Трекер воздержания",
      [TRANSLATION_KEY.TODAY]: "Сегодня",
      [TRANSLATION_KEY.DAY_ENDS_IN]: "До конца дня",
      [TRANSLATION_KEY.DASHBOARD]: "Главная",
      [TRANSLATION_KEY.STATS]: "Статистика",
      [TRANSLATION_KEY.HISTORY]: "История",
      [TRANSLATION_KEY.ALCOHOL]: "Алкоголь",
      [TRANSLATION_KEY.CIGARETTES]: "Сигареты",
      [TRANSLATION_KEY.CURRENT_STREAK]: "Текущий стрик: {days} дн.",
      [TRANSLATION_KEY.DAILY_CHECKMARK]: "Отметить день",
      [TRANSLATION_KEY.CHECKED_TODAY]: "Отмечено сегодня",
      [TRANSLATION_KEY.PROGRESS_MILESTONE]: "Прогресс до 30 дней",
      [TRANSLATION_KEY.MAX_STREAK]: "Макс. стрик: {days}",
      [TRANSLATION_KEY.MARK_RELAPSE]: "Отметить срыв",
      [TRANSLATION_KEY.TOTAL_ENTRIES]: "Всего записей",
      [TRANSLATION_KEY.MISSED_DAYS]: "Пропущенных дней",
      [TRANSLATION_KEY.ALCOHOL_RELAPSES]: "Срывы по алкоголю",
      [TRANSLATION_KEY.CIGARETTES_RELAPSES]: "Срывы по сигаретам",
      [TRANSLATION_KEY.HEATMAP]: "Heatmap: {habit}",
      [TRANSLATION_KEY.ALCOHOL_SOBER_DAYS]: "Дни без алкоголя",
      [TRANSLATION_KEY.CIGARETTES_SOBER_DAYS]: "Дни без сигарет",
      [TRANSLATION_KEY.WEEKLY_CONSISTENCY]: "Недельная стабильность: {habit}",
      [TRANSLATION_KEY.CUMULATIVE_SCORE]: "Накопительный счет",
      [TRANSLATION_KEY.HISTORY_LIST]: "Список истории",
      [TRANSLATION_KEY.EXPORT_JSON]: "Экспорт JSON",
      [TRANSLATION_KEY.NO_DATA_YET]: "Пока нет данных. Начни с ежедневных отметок.",
      [TRANSLATION_KEY.ABSTINENT]: "Воздержание",
      [TRANSLATION_KEY.MISSED]: "Пропуск",
      [TRANSLATION_KEY.RELAPSES]: "Срывы",
      [TRANSLATION_KEY.RELAPSE_AT]: "в {time}",
      [TRANSLATION_KEY.NO_RELAPSES]: "Срывы не зафиксированы.",
      [TRANSLATION_KEY.ADSENSE_BANNER_TITLE]: "Баннер AdSense",
      [TRANSLATION_KEY.ADSENSE_NOT_CONFIGURED]:
        "Укажи VITE_ADSENSE_CLIENT_ID и VITE_ADSENSE_SLOT_ID, чтобы включить рекламу.",
      [TRANSLATION_KEY.LANGUAGE]: "Язык",
    },
  },
  setLang: (lang) =>
    set(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("app_lang", lang);
      }
      return { lang };
    }),
}));
