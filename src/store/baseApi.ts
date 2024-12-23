import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  EndpointBuilder,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { Party, Role, State, Status, Token } from '@/appTypes';
import { login } from '@/screens/Login/redux/duck';
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
  billActions = 'bill_actions',
  billVersions = 'bill_versions',
  follow = 'follow',
  legislators = 'legislators',
  legislativeBodys = 'legislative_bodys',
  partys = 'partys',
  roles = 'roles',
  states = 'states',
  statuses = 'statuses',
  topics = 'topics',
  users = 'users',
  votes = 'votes',
}

type RequestBody = Record<string, any>;

type ErrorContext = {
  error: Record<string, string>;
};

type ErrorDetail<T extends RequestBody> = {
  ctx: ErrorContext | Record<'reason', string>;
  input: T[keyof T];
  loc: ['body', string & keyof T];
  msg: string;
  type: string;
};

type ErrorDetails<T extends RequestBody> = ErrorDetail<T>[] | FormError<T> | string;

export type ErrorResponse<T extends RequestBody> = {
  status: number;
  data: Record<'detail', ErrorDetails<T>>;
};

export type FormError<T extends RequestBody> = {
  field?: string & keyof T;
  message: string;
};

export function isReason(
  ctx: ErrorContext | Record<'reason', string>,
): ctx is Record<'reason', string> {
  return 'reason' in ctx;
}

export function isErrorString<T extends RequestBody>(detail: ErrorDetails<T>): detail is string {
  return typeof detail === 'string';
}

export function isFormError<T extends RequestBody>(
  detail: ErrorDetails<T>,
): detail is FormError<T> {
  return !Array.isArray(detail) && typeof detail === 'object';
}

export function isErrorDetail<T extends RequestBody>(
  detail: ErrorDetails<T>,
  validFields: (keyof T)[],
): detail is ErrorDetail<T>[] {
  return (
    Array.isArray(detail) && detail[0].loc[0] === 'body' && validFields.includes(detail[0].loc[1])
  );
}

export const handleFormError = <T extends RequestBody>(
  response: ErrorResponse<T>,
  body?: T,
): FormError<T> => {
  const detail = response.data?.detail;
  const defaultError = { message: 'Unknown error, please contact an administrator or try again' };

  if (isErrorString<T>(detail)) {
    return defaultError;
  }

  if (body) {
    const validFields = Object.keys(body);

    if (isErrorDetail<T>(detail, validFields)) {
      return {
        field: detail[0].loc[1],
        message: isReason(detail[0].ctx) ? detail[0].ctx?.reason : detail[0].msg,
      };
    }

    if (isFormError<T>(detail)) {
      return detail.field && validFields.includes(detail.field)
        ? detail
        : { message: detail.message };
    }
  }

  return defaultError;
};

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

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers: Headers, { getState }) => {
    const state = getState() as RootState;
    const { accessToken, tokenType } = state.auth.user ?? {};
    if (accessToken) {
      headers.set('Authorization', `${tokenType} ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.user?.refreshToken;
    const refreshResult = (await baseQuery(
      { url: `${ApiResource.auth}/refresh`, method: HttpMethod.post, body: { refreshToken } },
      api,
      extraOptions,
    )) as { data?: Token };

    if (refreshResult?.data) {
      api.dispatch(login({ ...refreshResult.data }));

      // Retry original request
      const retryResult = await baseQuery(args, api, extraOptions);
      return retryResult;
    }
  }

  return result;
};

enum BaseTags {
  partys = 'partys',
  roles = 'roles',
  states = 'states',
  statuses = 'statuses',
}

const baseApi = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: [BaseTags.partys, BaseTags.roles, BaseTags.states, BaseTags.statuses],
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
    getStatuses: builder.query<Status[], void>({
      query: () => ({ url: `${ApiResource.statuses}/` }),
      providesTags: result => (result ? [BaseTags.statuses] : []),
    }),
  }),
  reducerPath: 'api',
});

export default baseApi;

export const { useGetRolesQuery, useGetPartysQuery, useGetStatesQuery, useGetStatusesQuery } =
  baseApi;
