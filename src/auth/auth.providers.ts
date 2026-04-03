import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import { AuthRepository } from '@src/auth/adapters/repositories/auth.repository';
import { LIST_SESSIONS_REPOSITORY } from '@src/auth/applications/contracts/list-sessions.repository-interface';
import { LIST_SESSIONS_USE_CASE } from '@src/auth/applications/contracts/list-sessions.use-case-interface';
import { LOGIN_REPOSITORY } from '@src/auth/applications/contracts/login.repository-interface';
import { LOGIN_USE_CASE } from '@src/auth/applications/contracts/login.use-case-interface';
import { LoginUseCase } from '@src/auth/applications/use-cases/login.use-case';
import { ListSessionsUseCase } from '@src/auth/applications/use-cases/list-sessions.use-case';
import { LOGOUT_USE_CASE } from '@src/auth/applications/contracts/logout.use-case-interface';
import { LogoutUseCase } from '@src/auth/applications/use-cases/logout.use-case';

export const authProviders = [
  EncryptUtils,
  {
    provide: LIST_SESSIONS_REPOSITORY,
    useClass: AuthRepository,
  },
  {
    provide: LOGIN_REPOSITORY,
    useClass: AuthRepository,
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
    provide: LOGOUT_USE_CASE,
    useClass: LogoutUseCase,
  },
];
