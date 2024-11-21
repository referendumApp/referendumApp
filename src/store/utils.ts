import Constants from 'expo-constants';
import { Platform } from 'react-native';

const ENVIRONMENTS = {
  development: 'development',
  test: 'test',
  production: 'production',
};

export const isDevEnv = () => {
  return process.env.NODE_ENV === ENVIRONMENTS.development;
};

export const getMiddlewareOptions = () => {
  if (isDevEnv()) {
    return {
      serializableCheck: false, // Avoid issues with non-serializable payloads
      immutableCheck: false, // Disable checks for immutability
    };
  }

  return {};
};

const getDevUrl = () => {
  return Constants.expoConfig?.extra?.[Platform.OS].EXPO_PUBLIC_API_URL ?? 'http://localhost';
};

const getApiUrl = () => {
  const url = isDevEnv() ? getDevUrl() : process.env.EXPO_PUBLIC_API_URL;
  const port = process.env.EXPO_PUBLIC_API_PORT || '80';
  const baseUrl = `${url}:${port}`;

  return baseUrl;
};

const baseUrl = getApiUrl();

export default baseUrl;
