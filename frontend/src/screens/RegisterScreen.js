import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Header, Input } from '../components';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister() {
    setError('');

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError('Preencha nome, email e senha para criar sua conta.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      // On success the navigator swaps to the app stack automatically.
      await signUp({ nome: nome.trim(), email: email.trim(), senha });
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Não foi possível criar sua conta. Tente novamente.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Header
              title="Cadastro"
              subtitle="Crie sua conta para reservar camisetas."
            />
            <View style={styles.form}>
              <Input
                onChangeText={setNome}
                placeholder="Nome"
                value={nome}
              />
              <Input
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="Email"
                value={email}
              />
              <Input
                onChangeText={setSenha}
                placeholder="Senha (mínimo 6 caracteres)"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#0F3D2E',
    flex: 1,
  },
  flex: {
    flex: 1,
  },
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
    flexGrow: 1,
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
