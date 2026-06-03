import { Pressable, StyleSheet, Text } from 'react-native';

export default function Button({ children, variant = 'primary', style, ...props }) {
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      style={[styles.button, isSecondary && styles.secondaryButton, style]}
      {...props}
    >
      <Text style={[styles.text, isSecondary && styles.secondaryText]}>
        {children}
      </Text>
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
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
});
