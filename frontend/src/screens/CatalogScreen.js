import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header, Loading, ProductCard } from '../components';
import api from '../services/api';

export default function CatalogScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  async function loadProducts(isRefreshing = false) {
    try {
      setError('');

      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get('/products');
      setProducts(response.data);
    } catch (requestError) {
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleDetails(product) {
    navigation.navigate('ProductDetails', {
      product,
      productId: product.id,
    });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          colors={['#0F3D2E']}
          onRefresh={() => loadProducts(true)}
          refreshing={refreshing}
        />
      }
    >
      <Header
        title="Catálogo de Camisetas"
        subtitle="Escolha sua camiseta Hippiex favorita."
      />
      {loading ? <Loading message="Carregando produtos..." /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!loading && !error ? (
        <View style={styles.list}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetails={() => handleDetails(product)}
            />
          ))}
        </View>
      ) : null}
      {!loading && !error && products.length === 0 ? (
        <Text style={styles.empty}>Nenhum produto cadastrado ainda.</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7F5',
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  empty: {
    color: '#555555',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#FCE8E8',
    borderRadius: 12,
    color: '#B00020',
    fontSize: 15,
    fontWeight: '700',
    padding: 14,
    textAlign: 'center',
  },
  list: {
    gap: 2,
  },
});
