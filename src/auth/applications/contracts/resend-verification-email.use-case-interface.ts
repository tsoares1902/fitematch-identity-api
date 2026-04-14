export const RESEND_VERIFICATION_EMAIL_USE_CASE_INTERFACE =
  'RESEND_VERIFICATION_EMAIL_USE_CASE_INTERFACE';

export interface ResendVerificationEmailRequest {
  email: string;
}

export interface ResendVerificationEmailResponse {
  success: boolean;
}

export interface ResendVerificationEmailUseCaseInterface {
  execute(
    data: ResendVerificationEmailRequest,
  ): Promise<ResendVerificationEmailResponse>;
}
