import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import { UserCommandRepositoryAdapter } from '@src/user/adapters/persistence/repositories/user-command.repository';
import { UserQueryRepositoryAdapter } from '@src/user/adapters/persistence/repositories/user-query.repository';
import { ListUsersUseCase } from '@src/user/applications/use-cases/list-users.use-case';
import { CreateUserUseCase } from '@src/user/applications/use-cases/create-user.use-case';
import { ReadUserUseCase } from '@src/user/applications/use-cases/read-user.use-case';
import { UpdateUserUseCase } from '@src/user/applications/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@src/user/applications/use-cases/delete-user.use-case';
import { CREATE_USER_REPOSITORY_INTERFACE } from '@src/user/applications/contracts/create-user.repository-interface';
import { LIST_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/list-user.use-case-interface';
import { CREATE_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/create-user.use-case-interface';
import { READ_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/read-user.use-case-interface';
import { UPDATE_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/update-user.use-case-interface';
import { DELETE_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/delete-user.use-case-interface';
import { UPDATE_USER_REPOSITORY } from '@src/user/applications/contracts/update-user.repository-interface';
import { USER_COMMAND_REPOSITORY } from '@src/user/domains/repositories/user-command.repository';
import { USER_QUERY_REPOSITORY } from '@src/user/domains/repositories/user-query.repository';

export const userProviders = [
  EncryptUtils,
  UserQueryRepositoryAdapter,
  UserCommandRepositoryAdapter,
  {
    provide: LIST_USER_USE_CASE_INTERFACE,
    useClass: ListUsersUseCase,
  },
  {
    provide: CREATE_USER_USE_CASE_INTERFACE,
    useClass: CreateUserUseCase,
  },
  {
    provide: READ_USER_USE_CASE_INTERFACE,
    useClass: ReadUserUseCase,
  },
  {
    provide: UPDATE_USER_USE_CASE_INTERFACE,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DELETE_USER_USE_CASE_INTERFACE,
    useClass: DeleteUserUseCase,
  },
  {
    provide: CREATE_USER_REPOSITORY_INTERFACE,
    useExisting: UserCommandRepositoryAdapter,
  },
  {
    provide: UPDATE_USER_REPOSITORY,
    useExisting: UserCommandRepositoryAdapter,
  },
  {
    provide: USER_QUERY_REPOSITORY,
    useExisting: UserQueryRepositoryAdapter,
  },
  {
    provide: USER_COMMAND_REPOSITORY,
    useExisting: UserCommandRepositoryAdapter,
  },
];
