const ENVIRONMENTS = {
  development: 'development',
  production: 'production',
};

type Environment = typeof ENVIRONMENTS[keyof typeof ENVIRONMENTS];

// const API_ENDPOINTS: Record<Environment, string> = {
//   local: 'http://localhost:80',
//   prod: 'http://ec2-18-222-200-13.us-east-2.compute.amazonaws.com',
// };

// const isValidEnvironment = (env?: string | null): env is Environment => {
//   return (
//     env !== null &&
//     env !== '' &&
//     env !== undefined &&
//     Object.values(ENVIRONMENTS).includes(env as Environment)
//   );
// };

const getApiUrl = () => {
  // const env = process.env.EAS_BUILD_PROFILE;
  const url = process.env.EXPO_PUBLIC_API_URL || 'http://localhost';
  const port = process.env.EXPO_PUBLIC_API_PORT || '80';
  const baseUrl = `${url}:${port}`;

  return baseUrl;

  // if (isValidEnvironment(env)) {
  //   return {env, apiUrl: API_ENDPOINTS[env]};
  // }
  //
  // console.warn(`Invalid or missing environment: ${env}. Falling back to local.`);
  // return {env: ENVIRONMENTS.local, apiUrl: API_ENDPOINTS[ENVIRONMENTS.local]};
};

const config = getApiUrl();

export default config;
