export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}