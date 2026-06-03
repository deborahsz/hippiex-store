import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input({ error, style, ...props }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#777777"
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  error: {
    color: '#B00020',
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderRadius: 12,
    borderWidth: 1,
    color: '#111111',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  inputError: {
    borderColor: '#B00020',
  },
});
