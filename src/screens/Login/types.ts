import { User } from '@/appTypes';

export interface LoginCredentials {
  username: string;
  password: string;
}

export type LoginFields = keyof LoginCredentials;