import { StyleSheet, TextInput } from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      placeholderTextColor="#777777"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
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
});
