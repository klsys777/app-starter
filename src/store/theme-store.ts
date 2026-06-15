import { create } from 'zustand';

import { storage } from '@/services/storage-service';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-mode';

type ThemeState = {
  mode: ThemeMode;
  /** 启动时读取已保存的主题偏好。 */
  hydrate: () => Promise<void>;
  setMode: (mode: ThemeMode) => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',

  hydrate: async () => {
    const saved = await storage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      set({ mode: saved });
    }
  },

  setMode: async (mode) => {
    set({ mode });
    await storage.setItem(STORAGE_KEY, mode);
  },
}));
