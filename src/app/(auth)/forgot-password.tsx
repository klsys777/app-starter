import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { ErrorMessage } from '@/components/error-message';
import { ScreenContainer } from '@/components/screen-container';
import { TextInput } from '@/components/text-input';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { authService } from '@/services/auth-service';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await authService.resetPassword(email.trim());
      Alert.alert('已发送', '重置密码邮件已发送，请查收。');
      router.back();
    } catch (e) {
      setError(e instanceof Error ? e.message : '发送失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>找回密码</Text>
        <Text style={[styles.hint, { color: colors.textSecondary }]}>
          输入注册邮箱，我们会发送重置链接。
        </Text>
        <ErrorMessage message={error} />
        <TextInput
          label="邮箱"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
        />
        <Button label="发送重置邮件" onPress={onSubmit} loading={loading} />
        <Button label="返回" onPress={() => router.back()} variant="secondary" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, justifyContent: 'center', gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '700' },
  hint: { fontSize: 14, marginBottom: Spacing.two },
});
