import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading({ message = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#0F3D2E" size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },
});
