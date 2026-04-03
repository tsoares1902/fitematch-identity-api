export const LOGOUT_USE_CASE = 'LOGOUT_USE_CASE';

export interface LogoutRequest {
  authorization?: string;
}

export interface LogoutResponse {
  success: boolean;
}

export interface LogoutUseCaseInterface {
  execute(data: LogoutRequest): Promise<LogoutResponse>;
}
