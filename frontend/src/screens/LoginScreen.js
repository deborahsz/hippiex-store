import { StyleSheet, View } from 'react-native';

import { Button, Header, Input } from '../components';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Entrar" subtitle="Acesse sua conta Hippiex." />
      <View style={styles.form}>
        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Senha" secureTextEntry />
        <Button onPress={() => navigation.navigate('Catalog')}>Entrar</Button>
        <Button variant="secondary" onPress={() => navigation.navigate('Register')}>
          Ir para Cadastro
        </Button>
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
