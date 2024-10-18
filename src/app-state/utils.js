const ENVIRONMENTS = {
  local: 'local',
  prod: 'prod',
};

const API_ENDPOINTS = {
  [ENVIRONMENTS.local]: 'https://localhost:80',
  [ENVIRONMENTS.prod]: 'http://ec2-18-222-200-13.us-east-2.compute.amazonaws.com',
};

const getEnvVars = () => {
  const env = process.env.EXPO_PUBLIC_RELEASE_CHANNEL;

  // For bare workflow
  if (env === undefined || env === null || env === '') {
    return { env: ENVIRONMENTS.local, apiUrl: API_ENDPOINTS[ENVIRONMENTS.local] };
  }

  return { env, apiUrl: API_ENDPOINTS[env]};
};

const config = getEnvVars();

export default config;
