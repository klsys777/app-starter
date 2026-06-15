import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { ScreenContainer } from '@/components/screen-container';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

/** 业务入口占位：以后在这里加各类功能卡片。 */
const FEATURES = ['功能 A', '功能 B', '功能 C'];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  return (
    <ScreenContainer>
      <Text style={[styles.greeting, { color: colors.text }]}>欢迎回来 👋</Text>
      <Text style={[styles.email, { color: colors.textSecondary }]}>
        {user?.email ?? '游客'}
      </Text>

      <View style={styles.grid}>
        {FEATURES.map((name) => (
          <View
            key={name}
            style={[styles.card, { backgroundColor: colors.backgroundElement }]}
          >
            <Text style={[styles.cardText, { color: colors.text }]}>{name}</Text>
          </View>
        ))}
      </View>

      <Button label="查看个人资料" onPress={() => router.push('/profile')} variant="secondary" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greeting: { fontSize: 26, fontWeight: '700' },
  email: { fontSize: 15, marginTop: Spacing.one, marginBottom: Spacing.four },
  grid: { flex: 1, gap: Spacing.three },
  card: { borderRadius: 14, padding: Spacing.four },
  cardText: { fontSize: 16, fontWeight: '600' },
});
