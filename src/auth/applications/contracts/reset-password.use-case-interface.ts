export const RESET_PASSWORD_USE_CASE_INTERFACE =
  'RESET_PASSWORD_USE_CASE_INTERFACE';

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
