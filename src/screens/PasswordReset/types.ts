export interface PasswordResetCredentials {
  newPassword: string;
  currentPassword: string;
}

export type PasswordResetFields = keyof PasswordResetCredentials;
