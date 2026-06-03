import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Header, Input } from '../components';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleRegister() {
    setError('');

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError('Preencha nome, email e senha para criar sua conta.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Catalog');
    }, 600);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Header title="Cadastro" subtitle="Crie sua conta para reservar camisetas." />
        <View style={styles.form}>
          <Input onChangeText={setNome} placeholder="Nome" value={nome} />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
          />
          <Input
            onChangeText={setSenha}
            placeholder="Senha"
            secureTextEntry
            value={senha}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button loading={loading} onPress={handleRegister}>
            Criar Conta
          </Button>
          <Button
            disabled={loading}
            variant="secondary"
            onPress={() => navigation.goBack()}
          >
            Voltar para Login
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    elevation: 4,
    padding: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  container: {
    backgroundColor: '#0F3D2E',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  error: {
    color: '#B00020',
    fontSize: 14,
    fontWeight: '700',
  },
  form: {
    gap: 14,
  },
});
