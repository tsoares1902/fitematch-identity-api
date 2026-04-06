import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import { UserRepository } from '@src/user/adapters/repositories/user.repository';
import { ListUsersUseCase } from '@src/user/applications/use-cases/list-users.use-case';
import { CreateUserUseCase } from '@src/user/applications/use-cases/create-user.use-case';
import { ReadUserUseCase } from '@src/user/applications/use-cases/read-user.use-case';
import { UpdateUserUseCase } from '@src/user/applications/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@src/user/applications/use-cases/delete-user.use-case';
import { LIST_USER_REPOSITORY } from '@src/user/applications/contracts/list-user.repository-interface';
import { CREATE_USER_REPOSITORY } from '@src/user/applications/contracts/create-user.repository-interface';
import { READ_USER_REPOSITORY } from '@src/user/applications/contracts/read-user.repository-interface';
import { UPDATE_USER_REPOSITORY } from '@src/user/applications/contracts/update-user.repository-interface';
import { DELETE_USER_REPOSITORY } from '@src/user/applications/contracts/delete-user.repository-interface';
import { LIST_USERS_USE_CASE } from '@src/user/applications/contracts/list-users.use-case-interface';
import { CREATE_USER_USE_CASE } from '@src/user/applications/contracts/create-user.use-case-interface';
import { READ_USER_USE_CASE } from '@src/user/applications/contracts/read-user.use-case-interface';
import { UPDATE_USER_USE_CASE } from '@src/user/applications/contracts/update-user.use-case-interface';
import { DELETE_USER_USE_CASE } from '@src/user/applications/contracts/delete-user.use-case-interface';

export const userProviders = [
  EncryptUtils,
  {
    provide: LIST_USERS_USE_CASE,
    useClass: ListUsersUseCase,
  },
  {
    provide: CREATE_USER_USE_CASE,
    useClass: CreateUserUseCase,
  },
  {
    provide: READ_USER_USE_CASE,
    useClass: ReadUserUseCase,
  },
  {
    provide: UPDATE_USER_USE_CASE,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DELETE_USER_USE_CASE,
    useClass: DeleteUserUseCase,
  },
  {
    provide: LIST_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: CREATE_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: READ_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: UPDATE_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: DELETE_USER_REPOSITORY,
    useClass: UserRepository,
  },
];
