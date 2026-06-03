import { StyleSheet, View } from 'react-native';

import { Button, Header, Input } from '../components';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Cadastro" subtitle="Crie sua conta para reservar camisetas." />
      <View style={styles.form}>
        <Input placeholder="Nome" />
        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Senha" secureTextEntry />
        <Button onPress={() => navigation.navigate('Catalog')}>Criar Conta</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  form: {
    gap: 14,
  },
});
