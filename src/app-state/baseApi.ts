import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import config from './utils';

export enum ApiResource {
  Auth = 'auth',
  Bills = 'bills',
  Follow = 'follow',
  Legislators = 'legislators',
  LegislativeBodys = 'legislative_bodys',
  Partys = 'partys',
  Roles = 'roles',
  States = 'states',
  Topics = 'topics',
  Users = 'users',
  Votes = 'votes',
}

const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.apiUrl}),
  endpoints: () => ({}),
  reducerPath: 'api',
});

export default baseApi;
