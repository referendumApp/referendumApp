import { Token } from '@/appTypes';
import { LoginCredentials } from '@/screens/Login/types';
import baseApi, {
  ApiResource,
  ErrorResponse,
  HttpMethod,
  OnQueryStarted,
  FormError,
  handleFormError,
} from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { login } from './duck';

export type LoginError = FormError<LoginCredentials>;

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
      async onQueryStarted(_, { dispatch, queryFulfilled }: OnQueryStarted<Token>) {
        const { data } = await queryFulfilled;
        dispatch(login({ ...data }));
      },
      transformErrorResponse: (response: ErrorResponse<LoginCredentials>, _, body): LoginError =>
        handleFormError<LoginCredentials>(response, body),
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetUserSessionMutation } = loginApi;
