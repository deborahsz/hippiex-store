import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Header } from '../components';
import api from '../services/api';

const PAYMENT_OPTIONS = ['Pix', 'Dinheiro'];

export default function OrderScreen({ navigation, route }) {
  const product = route.params?.product;
  const sizes = product?.tamanhos || ['P', 'M', 'G'];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!product?.id) {
      setError('Produto não encontrado para finalizar o pedido.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/orders', {
        pagamento: selectedPayment,
        produtoId: product.id,
        tamanho: selectedSize,
      });

      navigation.navigate('Confirmation', {
        order: response.data.order,
      });
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Não foi possível finalizar o pedido. Tente novamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Reserva/Pedido" subtitle="Escolha tamanho e forma de pagamento." />
      {product ? (
        <View style={styles.productCard}>
          <Text style={styles.productLabel}>Produto</Text>
          <Text style={styles.productName}>{product.nome}</Text>
        </View>
      ) : null}
      <Text style={styles.sectionTitle}>Tamanho</Text>
      <View style={styles.options}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            disabled={loading}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.option,
              selectedSize === size && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedSize === size && styles.selectedOptionText,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Forma de pagamento</Text>
      <View style={styles.options}>
        {PAYMENT_OPTIONS.map((payment) => (
          <Pressable
            key={payment}
            disabled={loading}
            onPress={() => setSelectedPayment(payment)}
            style={[
              styles.paymentOption,
              selectedPayment === payment && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedPayment === payment && styles.selectedOptionText,
              ]}
            >
              {payment}
            </Text>
          </Pressable>
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button loading={loading} onPress={handleSubmit}>
        Finalizar Pedido
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
  },
  error: {
    backgroundColor: '#FCE8E8',
    borderRadius: 12,
    color: '#B00020',
    fontSize: 14,
    fontWeight: '700',
    padding: 12,
    textAlign: 'center',
  },
  option: {
    alignItems: 'center',
    borderColor: '#0F3D2E',
    borderRadius: 999,
    borderWidth: 1,
    minWidth: 52,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionText: {
    color: '#0F3D2E',
    fontSize: 16,
    fontWeight: '900',
  },
  paymentOption: {
    alignItems: 'center',
    borderColor: '#0F3D2E',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  productCard: {
    backgroundColor: '#F4F7F5',
    borderRadius: 16,
    padding: 16,
  },
  productLabel: {
    color: '#0F3D2E',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  productName: {
    color: '#111111',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '800',
  },
  selectedOption: {
    backgroundColor: '#0F3D2E',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
});
