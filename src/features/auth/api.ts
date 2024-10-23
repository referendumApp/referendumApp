import baseApi, {ApiResource, HttpMethod, OnQueryStarted} from '@store/baseApi';
import {login} from './duck';
import {LoginCredentials, LoginSession} from './types';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserSession: builder.mutation({
      query: (creds: LoginCredentials) => {
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
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          url: `${ApiResource.auth}/login`,
        };
      },
      async onQueryStarted(
        args: LoginCredentials,
        {dispatch, queryFulfilled}: OnQueryStarted<LoginSession>,
      ) {
        const {username} = args;
        try {
          const {data} = await queryFulfilled;
          dispatch(login({ ...data, username}));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {useGetUserSessionMutation} = authApi;
