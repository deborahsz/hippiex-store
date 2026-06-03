import { StyleSheet, Text, View } from 'react-native';

import { Button, Header } from '../components';

export default function OrderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Reserva/Pedido" subtitle="Escolha tamanho e forma de pagamento." />
      <Text style={styles.sectionTitle}>Tamanho</Text>
      <Text style={styles.placeholder}>P | M | G</Text>
      <Text style={styles.sectionTitle}>Forma de pagamento</Text>
      <Text style={styles.placeholder}>Pix | Dinheiro</Text>
      <Button onPress={() => navigation.navigate('Confirmation')}>
        Finalizar Pedido
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    gap: 16,
    padding: 24,
    paddingTop: 60,
  },
  placeholder: {
    color: '#555555',
    fontSize: 18,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '800',
  },
});
