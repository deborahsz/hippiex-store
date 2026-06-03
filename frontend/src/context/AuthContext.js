import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api, { setAuthToken } from '../services/api';

const TOKEN_KEY = '@hippiex:token';
const USER_KEY = '@hippiex:user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);

        if (storedToken) {
          setAuthToken(storedToken);
          setToken(storedToken);
          setUser(storedUser ? JSON.parse(storedUser) : null);
        }
      } catch {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]).catch(() => {});
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const persistSession = useCallback(async (nextToken, nextUser) => {
    setAuthToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
    await AsyncStorage.multiSet([
      [TOKEN_KEY, nextToken],
      [USER_KEY, JSON.stringify(nextUser)],
    ]);
  }, []);

  const signIn = useCallback(
    async ({ email, senha }) => {
      const response = await api.post('/auth/login', { email, senha });
      await persistSession(response.data.token, response.data.user);
      return response.data.user;
    },
    [persistSession]
  );

  const signUp = useCallback(
    async ({ nome, email, senha }) => {
      const response = await api.post('/auth/register', { nome, email, senha });
      await persistSession(response.data.token, response.data.user);
      return response.data.user;
    },
    [persistSession]
  );

  const signOut = useCallback(async () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      signIn,
      signUp,
      signOut,
    }),
    [user, token, loading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }

  return context;
}
