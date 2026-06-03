import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export default function Button({
  children,
  loading = false,
  variant = 'primary',
  style,
  disabled,
  ...props
}) {
  const isSecondary = variant === 'secondary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      style={[
        styles.button,
        isSecondary && styles.secondaryButton,
        isDisabled && styles.disabledButton,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[styles.text, isSecondary && styles.secondaryText]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#0F3D2E',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#111111',
  },
  disabledButton: {
    opacity: 0.65,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
});
