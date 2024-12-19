import { User } from '@/appTypes';
import baseApi, {
  ApiResource,
  ErrorResponse,
  HttpMethod,
  FormError,
  handleFormError,
} from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { PasswordResetCredentials } from './types';

export type PasswordResetError = FormError<PasswordResetCredentials>;

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    passwordReset: builder.mutation<User, Partial<User> & PasswordResetCredentials>({
      query: body => ({
        url: `${ApiResource.users}/password_reset`,
        method: HttpMethod.patch,
        body,
      }),
      transformErrorResponse: (response: ErrorResponse<PasswordResetCredentials>, _, body): PasswordResetError =>
        handleFormError<PasswordResetCredentials>(response, body),
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { usePasswordResetMutation } = userApi;