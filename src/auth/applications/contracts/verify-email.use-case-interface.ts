export const VERIFY_EMAIL_USE_CASE_INTERFACE =
  'VERIFY_EMAIL_USE_CASE_INTERFACE';

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
}

export interface VerifyEmailUseCaseInterface {
  execute(data: VerifyEmailRequest): Promise<VerifyEmailResponse>;
}
