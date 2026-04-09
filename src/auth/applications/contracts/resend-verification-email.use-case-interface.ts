export const RESEND_VERIFICATION_EMAIL_USE_CASE =
  'RESEND_VERIFICATION_EMAIL_USE_CASE';

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
