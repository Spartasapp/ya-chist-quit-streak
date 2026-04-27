import { useIntlStore } from "./useIntlStore";
import type { TranslationKey } from "./translationKeys";

type Params = Record<string, string | number>;

export function useIntl() {
  const { lang, translations } = useIntlStore();

  return (key: TranslationKey, params?: Params): string => {
    const value = translations[lang][key] || key;
    if (!params) return value;

    return Object.entries(params).reduce(
      (text, [paramKey, paramValue]) => text.replaceAll(`{${paramKey}}`, String(paramValue)),
      value,
    );
  };
}
