const ENVIRONMENTS = {
  local: 'local',
  prod: 'prod',
};

type Environment = typeof ENVIRONMENTS[keyof typeof ENVIRONMENTS];

const API_ENDPOINTS: Record<Environment, string> = {
  local: 'https://localhost:80',
  prod: 'http://ec2-18-222-200-13.us-east-2.compute.amazonaws.com',
};

const isValidEnvironment = (env?: string | null): env is Environment => {
  return (
    env !== null &&
    env !== '' &&
    env !== undefined &&
    Object.values(ENVIRONMENTS).includes(env as Environment)
  );
};

const getEnvVars = () => {
  const env = process.env.EXPO_PUBLIC_RELEASE_CHANNEL;

  if (isValidEnvironment(env)) {
    return {env, apiUrl: API_ENDPOINTS[env]};
  }

  console.warn(`Invalid or missing environment: ${env}. Falling back to local.`);
  return {env: ENVIRONMENTS.local, apiUrl: API_ENDPOINTS[ENVIRONMENTS.local]};
};

const config = getEnvVars();

export default config;
