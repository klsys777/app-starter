import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

function Field({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <ScreenContainer>
      <Field label="邮箱" value={user?.email ?? '—'} />
      <Field label="用户 ID" value={user?.id ?? '—'} />
      <Field
        label="注册时间"
        value={user?.created_at ? new Date(user.created_at).toLocaleString() : '—'}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  field: { gap: Spacing.one, marginBottom: Spacing.four },
  label: { fontSize: 13, fontWeight: '500' },
  value: { fontSize: 16 },
});
