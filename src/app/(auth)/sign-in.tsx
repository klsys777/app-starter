import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { ErrorMessage } from '@/components/error-message';
import { ScreenContainer } from '@/components/screen-container';
import { TextInput } from '@/components/text-input';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

export default function SignInScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (e) {
      setError(e instanceof Error ? e.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>登录</Text>
        <ErrorMessage message={error} />
        <TextInput
          label="邮箱"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
        />
        <TextInput
          label="密码"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />
        <Button label="登录" onPress={onSubmit} loading={loading} />
        <View style={styles.links}>
          <Link href="/(auth)/forgot-password" style={{ color: colors.primary }}>
            忘记密码？
          </Link>
          <Link href="/(auth)/sign-up" style={{ color: colors.primary }}>
            没有账号？去注册
          </Link>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, justifyContent: 'center', gap: Spacing.three },
  title: { fontSize: 28, fontWeight: '700', marginBottom: Spacing.two },
  links: { marginTop: Spacing.two, gap: Spacing.two, alignItems: 'center' },
});
