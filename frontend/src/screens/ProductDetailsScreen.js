import { StyleSheet, Text, View } from 'react-native';

import { Button, Header } from '../components';

export default function ProductDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Detalhes da Camiseta" />
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Foto grande em breve</Text>
      </View>
      <Text style={styles.name}>Produto será carregado pela API</Text>
      <Text style={styles.price}>R$ 79,90</Text>
      <Text style={styles.description}>
        Descrição, tamanhos disponíveis e informações do produto serão exibidos aqui.
      </Text>
      <View style={styles.actions}>
        <Button onPress={() => navigation.navigate('Order')}>Reservar</Button>
        <Button variant="secondary" onPress={() => navigation.navigate('Order')}>
          Comprar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
    marginTop: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  description: {
    color: '#555555',
    fontSize: 16,
    lineHeight: 24,
  },
  imagePlaceholder: {
    alignItems: 'center',
    backgroundColor: '#0F3D2E',
    borderRadius: 18,
    height: 260,
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  name: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '900',
  },
  price: {
    color: '#0F3D2E',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 6,
  },
});
