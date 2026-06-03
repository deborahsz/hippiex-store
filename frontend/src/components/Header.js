import { StyleSheet, Text, View } from 'react-native';

export default function Header({ title = 'Hippiex Store', subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HIPPIEX</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 24,
  },
  logo: {
    color: '#0F3D2E',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#555555',
    fontSize: 15,
  },
});
