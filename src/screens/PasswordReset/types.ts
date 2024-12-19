export interface PasswordResetCredentials {
  password: string;
  currentPassword: string;
}

export type PasswordResetFields = keyof PasswordResetCredentials;
