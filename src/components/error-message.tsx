import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

type Props = {
  message?: string | null;
};

/** 统一的错误提示条，无内容时不渲染。 */
export function ErrorMessage({ message }: Props) {
  const { colors } = useTheme();
  if (!message) return null;
  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundElement }]}>
      <Text style={[styles.text, { color: colors.danger }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 10, padding: Spacing.three },
  text: { fontSize: 14 },
});
