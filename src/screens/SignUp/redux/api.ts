import { User } from '@/appTypes';
import { SignUpCredentials } from '@/screens/SignUp/types';
import baseApi, {
  ApiResource,
  ErrorResponse,
  HttpMethod,
  FormError,
  handleFormError,
} from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

export type SignUpError = FormError<SignUpCredentials>;

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUpUser: builder.mutation<User, SignUpCredentials>({
      query: body => ({
        url: `${ApiResource.auth}/signup`,
        method: HttpMethod.post,
        body,
      }),
      transformErrorResponse: (response: ErrorResponse<SignUpCredentials>, _, body): SignUpError =>
        handleFormError<SignUpCredentials>(response, body),
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useSignUpUserMutation } = authApi;
