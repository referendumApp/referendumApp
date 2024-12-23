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

const getApiUrl = () => {
  const baseUrl =
    isDevEnv() && process.env.EXPO_PUBLIC_DEV_SERVER === 'true'
      ? Constants.expoConfig?.extra?.[Platform.OS].EXPO_PUBLIC_API_URL ?? 'http://localhost'
      : process.env.EXPO_PUBLIC_API_URL;

  return baseUrl;
};

const baseUrl = getApiUrl();

export default baseUrl;
