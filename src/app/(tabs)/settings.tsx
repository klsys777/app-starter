import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';
import { useThemeStore, type ThemeMode } from '@/store/theme-store';

const MODES: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'system', label: '跟随系统' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>
      <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  return (
    <ScreenContainer>
      <Section title="账号">
        <Text style={[styles.row, { color: colors.text }]}>{user?.email ?? '未登录'}</Text>
      </Section>

      <Section title="主题">
        <View style={styles.modeRow}>
          {MODES.map((m) => {
            const active = mode === m.value;
            return (
              <Pressable
                key={m.value}
                onPress={() => setMode(m.value)}
                style={[
                  styles.modeButton,
                  { backgroundColor: active ? colors.primary : colors.backgroundSelected },
                ]}
              >
                <Text style={{ color: active ? colors.textOnPrimary : colors.text }}>{m.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </Section>

      <Section title="其他">
        <Pressable onPress={() => router.push('/profile')}>
          <Text style={[styles.row, { color: colors.text }]}>个人资料</Text>
        </Pressable>
        <Text style={[styles.row, { color: colors.textSecondary }]}>关于 App · v1.0.0</Text>
      </Section>

      <View style={styles.footer}>
        <Button label="退出登录" onPress={signOut} variant="secondary" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.four, gap: Spacing.two },
  sectionTitle: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  card: { borderRadius: 12, paddingHorizontal: Spacing.three },
  row: { fontSize: 16, paddingVertical: Spacing.three },
  modeRow: { flexDirection: 'row', gap: Spacing.two, paddingVertical: Spacing.three },
  modeButton: { flex: 1, alignItems: 'center', paddingVertical: Spacing.three, borderRadius: 10 },
  footer: { marginTop: 'auto' },
});
