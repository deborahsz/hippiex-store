import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const API_PORT = 3333;

function getApiBaseUrl() {
  // 1) Explicit override always wins (e.g. a deployed API or custom LAN IP).
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, '');
  }

  // 2) Derive the dev host from the Expo manifest (works on a physical device
  //    connected over Wi-Fi).
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;
  const host = hostUri?.split(':')[0];

  if (host && host !== 'localhost' && host !== '127.0.0.1') {
    return `http://${host}:${API_PORT}`;
  }

  // 3) Emulator/simulator fallbacks where "localhost" points at the device,
  //    not the host machine.
  if (Platform.OS === 'android') {
    // Android emulator routes the host loopback through 10.0.2.2.
    return `http://10.0.2.2:${API_PORT}`;
  }

  // iOS simulator and web can reach the host via localhost.
  return `http://localhost:${API_PORT}`;
}

export const API_BASE_URL = getApiBaseUrl();

export function getImageUrl(imagePath) {
  if (!imagePath) {
    return '';
  }

  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

let authToken = null;

// Keep the bearer token in a module-level variable so every request is
// authenticated without each screen having to pass it explicitly.
export function setAuthToken(token) {
  authToken = token || null;
}

api.interceptors.request.use((requestConfig) => {
  if (authToken) {
    requestConfig.headers.Authorization = `Bearer ${authToken}`;
  }
  return requestConfig;
});

export default api;
