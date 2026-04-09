import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import { AuthRepository } from '@src/auth/adapters/repositories/auth.repository';
import { LIST_SESSIONS_REPOSITORY } from '@src/auth/applications/contracts/list-sessions.repository-interface';
import { LIST_SESSIONS_USE_CASE } from '@src/auth/applications/contracts/list-sessions.use-case-interface';
import { LOGIN_REPOSITORY } from '@src/auth/applications/contracts/login.repository-interface';
import { LOGIN_USE_CASE } from '@src/auth/applications/contracts/login.use-case-interface';
import { AUTHENTICATION_REPOSITORY } from '@src/auth/domains/repositories/authentication.repository';
import { AUTHENTICATION_SESSION_REPOSITORY } from '@src/auth/domains/repositories/authentication-session.repository';
import { ACCOUNT_RECOVERY_REPOSITORY } from '@src/auth/domains/repositories/account-recovery.repository';
import { SESSION_QUERY_REPOSITORY } from '@src/auth/domains/repositories/session-query.repository';
import { AUTH_NOTIFICATION_SERVICE } from '@src/auth/domains/services/auth-notification.service';
import { ACCESS_TOKEN_ISSUER } from '@src/auth/domains/services/access-token-issuer';
import { ACCESS_TOKEN_VERIFIER } from '@src/auth/domains/services/access-token-verifier';
import { ONE_TIME_TOKEN_SERVICE } from '@src/auth/domains/services/one-time-token.service';
import { PASSWORD_VERIFIER } from '@src/auth/domains/services/password-verifier';
import { JwtAccessTokenIssuer } from '@src/auth/adapters/security/jwt-access-token-issuer';
import { JwtAccessTokenVerifier } from '@src/auth/adapters/security/jwt-access-token-verifier';
import { BcryptPasswordVerifier } from '@src/auth/adapters/security/bcrypt-password-verifier';
import { CryptoOneTimeTokenService } from '@src/auth/adapters/security/one-time-token.service';
import { LoggerAuthNotificationService } from '@src/auth/adapters/notifications/auth-notification.service';
import { JwtStrategy } from '@src/auth/adapters/security/jwt.strategy';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import { RolesGuard } from '@src/auth/adapters/guards/roles.guard';
import { PermissionsGuard } from '@src/auth/adapters/guards/permissions.guard';
import { ForgotPasswordUseCase } from '@src/auth/applications/use-cases/forgot-password.use-case';
import { LoginUseCase } from '@src/auth/applications/use-cases/login.use-case';
import { ListSessionsUseCase } from '@src/auth/applications/use-cases/list-sessions.use-case';
import { LOGOUT_USE_CASE } from '@src/auth/applications/contracts/logout.use-case-interface';
import { LogoutUseCase } from '@src/auth/applications/use-cases/logout.use-case';
import { FORGOT_PASSWORD_USE_CASE } from '@src/auth/applications/contracts/forgot-password.use-case-interface';
import { RESET_PASSWORD_USE_CASE } from '@src/auth/applications/contracts/reset-password.use-case-interface';
import { VERIFY_EMAIL_USE_CASE } from '@src/auth/applications/contracts/verify-email.use-case-interface';
import { RESEND_VERIFICATION_EMAIL_USE_CASE } from '@src/auth/applications/contracts/resend-verification-email.use-case-interface';
import { ResetPasswordUseCase } from '@src/auth/applications/use-cases/reset-password.use-case';
import { VerifyEmailUseCase } from '@src/auth/applications/use-cases/verify-email.use-case';
import { ResendVerificationEmailUseCase } from '@src/auth/applications/use-cases/resend-verification-email.use-case';

export const authProviders = [
  EncryptUtils,
  AuthRepository,
  JwtAccessTokenIssuer,
  JwtAccessTokenVerifier,
  CryptoOneTimeTokenService,
  LoggerAuthNotificationService,
  JwtStrategy,
  JwtAuthGuard,
  RolesGuard,
  PermissionsGuard,
  BcryptPasswordVerifier,
  {
    provide: LIST_SESSIONS_REPOSITORY,
    useExisting: AuthRepository,
  },
  {
    provide: SESSION_QUERY_REPOSITORY,
    useExisting: AuthRepository,
  },
  {
    provide: LOGIN_REPOSITORY,
    useExisting: AuthRepository,
  },
  {
    provide: AUTHENTICATION_REPOSITORY,
    useExisting: AuthRepository,
  },
  {
    provide: AUTHENTICATION_SESSION_REPOSITORY,
    useExisting: AuthRepository,
  },
  {
    provide: ACCOUNT_RECOVERY_REPOSITORY,
    useExisting: AuthRepository,
  },
  {
    provide: ACCESS_TOKEN_ISSUER,
    useExisting: JwtAccessTokenIssuer,
  },
  {
    provide: ACCESS_TOKEN_VERIFIER,
    useExisting: JwtAccessTokenVerifier,
  },
  {
    provide: ONE_TIME_TOKEN_SERVICE,
    useExisting: CryptoOneTimeTokenService,
  },
  {
    provide: AUTH_NOTIFICATION_SERVICE,
    useExisting: LoggerAuthNotificationService,
  },
  {
    provide: PASSWORD_VERIFIER,
    useExisting: BcryptPasswordVerifier,
  },
  {
    provide: LIST_SESSIONS_USE_CASE,
    useClass: ListSessionsUseCase,
  },
  {
    provide: LOGIN_USE_CASE,
    useClass: LoginUseCase,
  },
  {
    provide: FORGOT_PASSWORD_USE_CASE,
    useClass: ForgotPasswordUseCase,
  },
  {
    provide: RESET_PASSWORD_USE_CASE,
    useClass: ResetPasswordUseCase,
  },
  {
    provide: VERIFY_EMAIL_USE_CASE,
    useClass: VerifyEmailUseCase,
  },
  {
    provide: RESEND_VERIFICATION_EMAIL_USE_CASE,
    useClass: ResendVerificationEmailUseCase,
  },
  {
    provide: LOGOUT_USE_CASE,
    useClass: LogoutUseCase,
  },
];
