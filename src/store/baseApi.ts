import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  EndpointBuilder,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { Party, Role, State } from '@/appTypes';
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
  billVersions = 'bill_versions',
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

interface CreateGetQuery<T> {
  builder: EndpointBuilder<BaseQueryFn, string, string>;
  resource: ApiResource;
  params?: Record<string, any>;
  pathParams?: string | ApiResource;
  reducer?: ActionCreatorWithPayload<T>;
}

export const createGetQueryAndReducer = <TResponse>({
  builder,
  resource,
  params,
  pathParams,
  reducer,
}: CreateGetQuery<TResponse>) => {
  const url = pathParams ? `${resource}/${pathParams}` : `${resource}/`;

  return builder.query<TResponse, void>({
    query: () => ({ url, ...(params && { params }) }),
    ...(reducer && {
      async onQueryStarted(_: void, { dispatch, queryFulfilled }: OnQueryStarted<TResponse>) {
        const { data } = await queryFulfilled;
        dispatch(reducer(data));
      },
    }),
  });
};

enum BaseTags {
  partys = 'partys',
  roles = 'roles',
  states = 'states',
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
  tagTypes: [BaseTags.partys, BaseTags.roles, BaseTags.states],
  endpoints: builder => ({
    getPartys: builder.query<Party[], void>({
      query: () => ({ url: `${ApiResource.partys}/` }),
      providesTags: result => (result ? [BaseTags.partys] : []),
    }),
    getRoles: builder.query<Role[], void>({
      query: () => ({ url: `${ApiResource.roles}/` }),
      providesTags: result => (result ? [BaseTags.roles] : []),
    }),
    getStates: builder.query<State[], void>({
      query: () => ({ url: `${ApiResource.states}/` }),
      providesTags: result => (result ? [BaseTags.states] : []),
    }),
  }),
  reducerPath: 'api',
});

export default baseApi;

export const { useGetRolesQuery, useGetPartysQuery, useGetStatesQuery } = baseApi;
