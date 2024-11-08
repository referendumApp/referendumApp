export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginSession {
  accessToken: string;
  tokenType: string;
}
