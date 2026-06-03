import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Loading } from '../components';
import { useAuth } from '../context/AuthContext';
import CatalogScreen from '../screens/CatalogScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import LoginScreen from '../screens/LoginScreen';
import OrderScreen from '../screens/OrderScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const appScreenOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: '#0F3D2E' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '800' },
  headerBackTitle: 'Voltar',
  contentStyle: { backgroundColor: '#FFFFFF' },
};

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Carregando sua sessão..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator screenOptions={appScreenOptions}>
          <Stack.Screen
            name="Catalog"
            component={CatalogScreen}
            options={{ title: 'Catálogo' }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: 'Detalhes' }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{ title: 'Reserva / Pedido' }}
          />
          <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{ title: 'Meus Pedidos' }}
          />
          <Stack.Screen
            name="Confirmation"
            component={ConfirmationScreen}
            options={{ title: 'Confirmação', headerBackVisible: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
