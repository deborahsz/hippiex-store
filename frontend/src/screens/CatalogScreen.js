import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Loading, ProductCard } from '../components';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function CatalogScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable hitSlop={8} onPress={signOut}>
          <Text style={styles.headerButton}>Sair</Text>
        </Pressable>
      ),
    });
  }, [navigation, signOut]);

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
    } catch {
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    let active = true;

    api
      .get('/products')
      .then((response) => active && setProducts(response.data))
      .catch(
        () =>
          active &&
          setError('Não foi possível carregar os produtos. Tente novamente.')
      )
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  function handleDetails(product) {
    navigation.navigate('ProductDetails', {
      product,
      productId: product.id,
    });
  }

  function renderContent() {
    if (loading) {
      return <Loading message="Carregando produtos..." />;
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (products.length === 0) {
      return <Text style={styles.empty}>Nenhum produto cadastrado ainda.</Text>;
    }

    return (
      <View style={styles.list}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetails={() => handleDetails(product)}
          />
        ))}
      </View>
    );
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
      <View style={styles.intro}>
        <Text style={styles.greeting}>
          Olá{user?.nome ? `, ${user.nome}` : ''}!
        </Text>
        <Text style={styles.subtitle}>Escolha sua camiseta Hippiex favorita.</Text>
        <Pressable
          style={styles.ordersLink}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.ordersLinkText}>Ver meus pedidos →</Text>
        </Pressable>
      </View>
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7F5',
    flexGrow: 1,
    padding: 24,
  },
  empty: {
    color: '#555555',
    fontSize: 16,
    marginTop: 24,
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
  greeting: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '900',
  },
  headerButton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  intro: {
    gap: 6,
    marginBottom: 20,
  },
  list: {
    gap: 2,
  },
  ordersLink: {
    marginTop: 6,
  },
  ordersLinkText: {
    color: '#0F3D2E',
    fontSize: 15,
    fontWeight: '800',
  },
  subtitle: {
    color: '#555555',
    fontSize: 15,
    lineHeight: 22,
  },
});
