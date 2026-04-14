export const LOGOUT_USE_CASE_INTERFACE = 'LOGOUT_USE_CASE_INTERFACE';

export interface LogoutRequest {
  authorization?: string;
}

export interface LogoutResponse {
  success: boolean;
}

export interface LogoutUseCaseInterface {
  execute(data: LogoutRequest): Promise<LogoutResponse>;
}
