import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Header } from '../components';

export default function ConfirmationScreen({ navigation, route }) {
  const order = route.params?.order;

  function handleBackToCatalog() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Catalog' }],
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.successIcon}>
        <Text style={styles.successIconText}>OK</Text>
      </View>
      <Header
        title="Pedido realizado com sucesso"
        subtitle="Sua reserva foi registrada. O pagamento será combinado fora do app."
      />
      <View style={styles.card}>
        <Text style={styles.label}>Produto:</Text>
        <Text style={styles.value}>{order?.produto?.nome || 'A definir'}</Text>
        <Text style={styles.label}>Tamanho:</Text>
        <Text style={styles.value}>{order?.tamanho || 'A definir'}</Text>
        <Text style={styles.label}>Pagamento:</Text>
        <Text style={styles.value}>{order?.pagamento || 'A definir'}</Text>
        <Text style={styles.label}>Número do pedido:</Text>
        <Text style={styles.orderNumber}>{order?.numero || 'A definir'}</Text>
      </View>
      <Button onPress={handleBackToCatalog}>Voltar ao catálogo</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F7F5',
    borderRadius: 18,
    gap: 6,
    marginBottom: 24,
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    color: '#0F3D2E',
    fontSize: 15,
    fontWeight: '900',
  },
  orderNumber: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  successIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0F3D2E',
    borderRadius: 999,
    height: 72,
    justifyContent: 'center',
    marginBottom: 18,
    width: 72,
  },
  successIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  value: {
    color: '#111111',
    fontSize: 17,
    marginBottom: 10,
  },
});
