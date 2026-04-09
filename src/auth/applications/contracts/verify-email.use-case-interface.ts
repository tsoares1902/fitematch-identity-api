export const VERIFY_EMAIL_USE_CASE = 'VERIFY_EMAIL_USE_CASE';

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
}

export interface VerifyEmailUseCaseInterface {
  execute(data: VerifyEmailRequest): Promise<VerifyEmailResponse>;
}
