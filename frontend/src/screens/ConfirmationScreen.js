import { StyleSheet, Text, View } from 'react-native';

import { Button, Header } from '../components';

export default function ConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Pedido realizado com sucesso" />
      <View style={styles.card}>
        <Text style={styles.label}>Produto:</Text>
        <Text style={styles.value}>A definir</Text>
        <Text style={styles.label}>Tamanho:</Text>
        <Text style={styles.value}>A definir</Text>
        <Text style={styles.label}>Pagamento:</Text>
        <Text style={styles.value}>A definir</Text>
        <Text style={styles.label}>Número do pedido:</Text>
        <Text style={styles.value}>A definir</Text>
      </View>
      <Button onPress={() => navigation.navigate('Catalog')}>Voltar ao catálogo</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    gap: 6,
    marginBottom: 24,
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    color: '#0F3D2E',
    fontSize: 15,
    fontWeight: '900',
  },
  value: {
    color: '#111111',
    fontSize: 17,
    marginBottom: 10,
  },
});
