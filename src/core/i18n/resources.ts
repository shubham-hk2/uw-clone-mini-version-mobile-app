import en from '@/translations/en.json';
import si from '@/translations/si.json';
import ta from '@/translations/ta.json';

export const resources = {
  en: {
    translation: en,
  },
  si: {
    translation: si,
  },
  ta: {
    translation: ta,
  },
};

export type Language = keyof typeof resources;
