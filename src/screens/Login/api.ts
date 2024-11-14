import { User } from '@/appTypes';
import baseApi, { ApiResource, HttpMethod, OnQueryStarted } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { login } from './duck';
import { LoginCredentials, LoginSession } from './types';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserSession: builder.mutation<User, LoginCredentials>({
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
      async onQueryStarted(
        args: LoginCredentials,
        { dispatch, queryFulfilled }: OnQueryStarted<LoginSession>,
      ) {
        const { username } = args;
        try {
          const { data } = await queryFulfilled;
          dispatch(login({ ...data, username }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetUserSessionMutation } = authApi;
