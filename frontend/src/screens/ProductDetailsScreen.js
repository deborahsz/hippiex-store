import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Header, Loading } from '../components';
import api, { getImageUrl } from '../services/api';

function formatPrice(price) {
  return Number(price || 0).toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  });
}

function formatDescription(description) {
  return description
    .split('.')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProductDetailsScreen({ navigation, route }) {
  const [product, setProduct] = useState(route.params?.product || null);
  const [loading, setLoading] = useState(!route.params?.product);
  const [error, setError] = useState('');
  const productId = route.params?.productId || route.params?.product?.id;

  useEffect(() => {
    async function loadProductDetails() {
      if (product || !productId) {
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (requestError) {
        setError('Não foi possível carregar os detalhes da camiseta.');
      } finally {
        setLoading(false);
      }
    }

    loadProductDetails();
  }, [product, productId]);

  function handleOrder() {
    navigation.navigate('Order', {
      product,
    });
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Loading message="Carregando camiseta..." />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centerContainer}>
        <Header title="Detalhes da Camiseta" />
        <Text style={styles.error}>
          {error || 'Camiseta não encontrada.'}
        </Text>
        <Button onPress={() => navigation.goBack()}>Voltar</Button>
      </View>
    );
  }

  const imageUrl = getImageUrl(product.imagem);
  const descriptionItems = formatDescription(product.descricao);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Detalhes da Camiseta" />
      <View style={styles.imageWrapper}>
        {imageUrl ? (
          <Image resizeMode="cover" source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Foto em breve</Text>
        )}
      </View>
      <Text style={styles.name}>{product.nome}</Text>
      <Text style={styles.price}>{formatPrice(product.preco)}</Text>
      <Text style={styles.sectionTitle}>Tamanhos disponíveis</Text>
      <View style={styles.sizes}>
        {product.tamanhos.map((size) => (
          <Text key={size} style={styles.size}>
            {size}
          </Text>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Descrição</Text>
      <View style={styles.descriptionList}>
        {descriptionItems.map((item) => (
          <Text key={item} style={styles.description}>
            {item}
          </Text>
        ))}
      </View>
      <View style={styles.actions}>
        <Button onPress={handleOrder}>Reservar</Button>
        <Button variant="secondary" onPress={handleOrder}>
          Comprar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
    marginTop: 20,
  },
  centerContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  descriptionList: {
    gap: 8,
  },
  description: {
    color: '#555555',
    fontSize: 16,
    lineHeight: 24,
  },
  error: {
    backgroundColor: '#FCE8E8',
    borderRadius: 12,
    color: '#B00020',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 16,
    padding: 14,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageWrapper: {
    alignItems: 'center',
    backgroundColor: '#0F3D2E',
    borderRadius: 18,
    height: 260,
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
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
  sectionTitle: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
    marginTop: 14,
  },
  size: {
    backgroundColor: '#111111',
    borderRadius: 999,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    minWidth: 44,
    paddingHorizontal: 14,
    paddingVertical: 10,
    textAlign: 'center',
  },
  sizes: {
    flexDirection: 'row',
    gap: 10,
  },
});
