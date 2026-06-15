import en from './en';
import zh from './zh';

const dictionaries = { en, zh } as const;
export type Language = keyof typeof dictionaries;
export type TranslationKey = keyof typeof en;

/** 当前语言。预留多语言扩展点：可接入系统语言检测或用户设置。 */
let current: Language = 'en';

export function setLanguage(lang: Language) {
  current = lang;
}

export function t(key: TranslationKey): string {
  return dictionaries[current][key] ?? dictionaries.en[key] ?? key;
}
