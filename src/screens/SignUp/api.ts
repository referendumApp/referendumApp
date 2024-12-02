import { User } from '@/appTypes';
import baseApi, {
  ApiResource,
  ErrorResponse,
  HttpMethod,
  TransformedError,
  handleErrorDetails,
} from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { SignUpCredentials } from './types';

export type SignUpError = TransformedError<SignUpCredentials>;

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUpUser: builder.mutation<User, SignUpCredentials>({
      query: body => ({
        url: `${ApiResource.auth}/signup`,
        method: HttpMethod.post,
        body,
      }),
      transformErrorResponse: (response: ErrorResponse<SignUpCredentials>, _, body): SignUpError =>
        handleErrorDetails<SignUpCredentials>(response, body),
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useSignUpUserMutation } = authApi;
