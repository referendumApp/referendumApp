const ENVIRONMENTS = {
  development: 'development',
  production: 'production',
};

export const isDevEnv = () => {
  return process.env.EAS_BUILD_PROFILE === ENVIRONMENTS.development;
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
  const url = process.env.EXPO_PUBLIC_API_URL || 'http://localhost';
  const port = process.env.EXPO_PUBLIC_API_PORT || '80';
  const baseUrl = `${url}:${port}`;

  return baseUrl;
};

const baseUrl = getApiUrl();

export default baseUrl;
