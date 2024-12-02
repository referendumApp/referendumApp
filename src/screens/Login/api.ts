import { Token } from '@/appTypes';
import baseApi, {
  ApiResource,
  ErrorResponse,
  HttpMethod,
  OnQueryStarted,
  TransformedError,
  handleErrorDetails,
} from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { login } from './duck';
import { LoginCredentials, LoginSession } from './types';

export type LoginError = TransformedError<LoginCredentials>;

const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserSession: builder.mutation<Token, LoginCredentials>({
      query: creds => {
        const formData = new URLSearchParams({
          grant_type: 'password',
          username: creds.username,
          password: creds.password,
          scope: '',
          client_id: '',
          client_secret: '',
        }).toString();

        return {
          body: formData,
          method: HttpMethod.post,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          url: `${ApiResource.auth}/login`,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }: OnQueryStarted<LoginSession>) {
        const { data } = await queryFulfilled;
        dispatch(login({ ...data }));
      },
      transformErrorResponse: (response: ErrorResponse<LoginCredentials>, _, body): LoginError =>
        handleErrorDetails<LoginCredentials>(response, body),
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetUserSessionMutation } = loginApi;
