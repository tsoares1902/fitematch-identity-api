export const RESET_PASSWORD_USE_CASE = 'RESET_PASSWORD_USE_CASE';

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
}

export interface ResetPasswordUseCaseInterface {
  execute(data: ResetPasswordRequest): Promise<ResetPasswordResponse>;
}
