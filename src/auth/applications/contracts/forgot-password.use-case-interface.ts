export const FORGOT_PASSWORD_USE_CASE = 'FORGOT_PASSWORD_USE_CASE';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
}

export interface ForgotPasswordUseCaseInterface {
  execute(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
}
