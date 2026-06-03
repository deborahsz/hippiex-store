import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Loading } from '../components';
import api from '../services/api';
import { formatDate, formatPrice } from '../utils/format';

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  async function loadOrders(isRefreshing = false) {
    try {
      setError('');
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get('/orders');
      setOrders(response.data);
    } catch {
      setError('Não foi possível carregar seus pedidos. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Fetch on mount without touching state synchronously inside the effect.
  useEffect(() => {
    let active = true;

    api
      .get('/orders')
      .then((response) => active && setOrders(response.data))
      .catch(
        () =>
          active &&
          setError('Não foi possível carregar seus pedidos. Tente novamente.')
      )
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  function renderContent() {
    if (loading) {
      return <Loading message="Carregando seus pedidos..." />;
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (orders.length === 0) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.empty}>Você ainda não fez nenhum pedido.</Text>
          <Button onPress={() => navigation.navigate('Catalog')}>
            Ver catálogo
          </Button>
        </View>
      );
    }

    return (
      <View style={styles.list}>
        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.number}>{order.numero}</Text>
              <Text
                style={[
                  styles.badge,
                  order.tipo === 'compra' ? styles.badgeBuy : styles.badgeReserve,
                ]}
              >
                {order.tipo === 'compra' ? 'Compra' : 'Reserva'}
              </Text>
            </View>
            <Text style={styles.product}>{order.produto?.nome}</Text>
            <Text style={styles.detail}>
              Tamanho {order.tamanho} · {order.pagamento}
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.price}>{formatPrice(order.produto?.preco)}</Text>
              <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
            </View>
          </View>
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
          onRefresh={() => loadOrders(true)}
          refreshing={refreshing}
        />
      }
    >
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeBuy: {
    backgroundColor: '#0F3D2E',
  },
  badgeReserve: {
    backgroundColor: '#8A6D1F',
  },
  card: {
    backgroundColor: '#F4F7F5',
    borderRadius: 16,
    gap: 6,
    padding: 16,
  },
  cardFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 24,
  },
  date: {
    color: '#777777',
    fontSize: 13,
  },
  detail: {
    color: '#555555',
    fontSize: 15,
  },
  empty: {
    color: '#555555',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyBox: {
    gap: 16,
    marginTop: 40,
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
    gap: 14,
  },
  number: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1,
  },
  price: {
    color: '#0F3D2E',
    fontSize: 16,
    fontWeight: '900',
  },
  product: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '800',
  },
});
