export const FORGOT_PASSWORD_USE_CASE_INTERFACE =
  'FORGOT_PASSWORD_USE_CASE_INTERFACE';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
}

export interface ForgotPasswordUseCaseInterface {
  execute(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
}
