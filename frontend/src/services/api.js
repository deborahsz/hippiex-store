import axios from 'axios';
import Constants from 'expo-constants';

function getApiBaseUrl() {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost;
  const host = hostUri?.split(':')[0];

  if (host) {
    return `http://${host}:3333`;
  }

  return 'http://localhost:3333';
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

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export default api;
