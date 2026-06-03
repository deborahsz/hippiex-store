import { ScrollView, StyleSheet, Text } from 'react-native';

import { Header, Loading } from '../components';

export default function CatalogScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header
        title="Catálogo de Camisetas"
        subtitle="Produtos serão carregados pela API nas próximas etapas."
      />
      <Loading message="Carregando produtos..." />
      <Text style={styles.empty}>Nenhum produto cadastrado ainda.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  empty: {
    color: '#555555',
    fontSize: 16,
    textAlign: 'center',
  },
});
