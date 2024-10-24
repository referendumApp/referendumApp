import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AppDispatch, RootState } from '@/store';

import baseUrl from './utils';

export enum HttpMethod {
  delete = 'DELETE',
  get = 'GET',
  patch = 'PATCH',
  post = 'POST',
  put = 'PUT',
}

export enum ApiResource {
  auth = 'auth',
  bills = 'bills',
  follow = 'follow',
  legislators = 'legislators',
  legislativeBodys = 'legislative_bodys',
  partys = 'partys',
  roles = 'roles',
  states = 'states',
  topics = 'topics',
  users = 'users',
  votes = 'votes',
}

export interface OnQueryStarted<T> {
  dispatch: AppDispatch;
  queryFulfilled: Promise<{ data: T }>;
}

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers, { getState }) => {
      const state = getState() as RootState;
      const { accessToken, tokenType } = state.auth.user ?? {};
      if (accessToken) {
        headers.set('Authorization', `${tokenType} ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'api',
});

export default baseApi;
