import { User } from '@/appTypes';
import baseApi, { ApiResource, HttpMethod } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { SignUpCredentials } from './types';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUpUser: builder.mutation<User, SignUpCredentials>({
      query: body => ({
        url: `${ApiResource.auth}/signup`,
        method: HttpMethod.post,
        body,
      }),
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useSignUpUserMutation } = authApi;
