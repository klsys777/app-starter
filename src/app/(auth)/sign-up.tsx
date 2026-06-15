import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { ErrorMessage } from '@/components/error-message';
import { ScreenContainer } from '@/components/screen-container';
import { TextInput } from '@/components/text-input';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/auth-store';

export default function SignUpScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    if (password.length < 6) {
      setError('密码至少需要 6 位。');
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password);
      Alert.alert('注册成功', '请查收验证邮件后登录。');
      router.replace('/(auth)/sign-in');
    } catch (e) {
      setError(e instanceof Error ? e.message : '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>注册</Text>
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
          placeholder="至少 6 位"
        />
        <Button label="注册" onPress={onSubmit} loading={loading} />
        <View style={styles.links}>
          <Link href="/(auth)/sign-in" style={{ color: colors.primary }}>
            已有账号？去登录
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
