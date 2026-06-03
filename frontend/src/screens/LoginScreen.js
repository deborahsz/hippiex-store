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

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');

    if (!email.trim() || !senha.trim()) {
      setError('Informe email e senha para entrar.');
      return;
    }

    try {
      setLoading(true);
      // On success the navigator swaps to the app stack automatically.
      await signIn({ email: email.trim(), senha });
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        'Não foi possível entrar. Verifique seus dados e tente novamente.';
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
              title="Entrar"
              subtitle="Acesse sua conta para reservar camisetas da Hippiex."
            />
            <View style={styles.form}>
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
                placeholder="Senha"
                secureTextEntry
                value={senha}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Button loading={loading} onPress={handleLogin}>
                Entrar
              </Button>
              <Button
                disabled={loading}
                variant="secondary"
                onPress={() => navigation.navigate('Register')}
              >
                Ir para Cadastro
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
