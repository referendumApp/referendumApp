export interface PasswordResetCredentials {
  email: string;
  name: string;
  password: string;
  currentPassword: string;
}

export type PasswordResetFields = keyof PasswordResetCredentials;
