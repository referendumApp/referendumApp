export interface SignUpCredentials {
  email: string;
  name: string;
  password: string;
}

export type SignUpFields = keyof SignUpCredentials;
