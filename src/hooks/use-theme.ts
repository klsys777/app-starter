import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { useThemeStore } from '@/store/theme-store';

/** 根据主题偏好（亮/暗/跟随系统）解析出当前配色。 */
export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const systemScheme = useColorScheme();
  const resolved = mode === 'system' ? systemScheme : mode;
  const scheme: 'light' | 'dark' = resolved === 'dark' ? 'dark' : 'light';
  return {
    scheme,
    colors: Colors[scheme],
  };
}
