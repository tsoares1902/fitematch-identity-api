import type { LoginDto } from '@src/auth/adapters/dto/login.dto';

export const LOGIN_USE_CASE = 'LOGIN_USE_CASE';

export type LoginRequest = Pick<LoginDto, 'client' | 'email' | 'password'>;

export interface LoginResponse {
  access_token: string;
}

export interface LoginUseCaseInterface {
  execute(data: LoginRequest): Promise<LoginResponse>;
}
