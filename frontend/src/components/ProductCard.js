import { Image, StyleSheet, Text, View } from 'react-native';

import Button from './Button';
import { getImageUrl } from '../services/api';
import { formatPrice } from '../utils/format';

export default function ProductCard({ product, onDetails }) {
  const imageUrl = getImageUrl(product?.imagem);
  const formattedPrice = formatPrice(product?.preco);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {imageUrl ? (
          <Image resizeMode="contain" source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Imagem em breve</Text>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{product?.nome || 'Camiseta Hippiex'}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <Button onPress={onDetails}>Ver Detalhes</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    elevation: 3,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  content: {
    gap: 10,
    padding: 16,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imagePlaceholder: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  imageWrapper: {
    alignItems: 'center',
    backgroundColor: '#111111',
    height: 210,
    justifyContent: 'center',
  },
  name: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '800',
  },
  price: {
    color: '#0F3D2E',
    fontSize: 17,
    fontWeight: '900',
  },
});
