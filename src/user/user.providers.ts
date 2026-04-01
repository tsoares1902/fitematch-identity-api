import { UserRepository } from '@src/user/adapters/repositories/user.repository';
import { CreateUserUseCase } from '@src/user/applications/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '@src/user/applications/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from '@src/user/applications/use-cases/get-user-by-id.use-case';
import { ListUsersUseCase } from '@src/user/applications/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '@src/user/applications/use-cases/update-user.use-case';
import { CREATE_USER_REPOSITORY } from '@src/user/applications/contracts/create-user.repository-interface';
import { DELETE_USER_REPOSITORY } from '@src/user/applications/contracts/delete-user.repository-interface';
import { GET_USER_BY_ID_REPOSITORY } from '@src/user/applications/contracts/get-user-by-id.repository-interface';
import { LIST_USERS_REPOSITORY } from '@src/user/applications/contracts/list-users.repository-interface';
import { UPDATE_USER_REPOSITORY } from '@src/user/applications/contracts/update-user.repository-interface';
import { CREATE_USER_USE_CASE } from '@src/user/applications/contracts/create-user.use-case-interface';
import { DELETE_USER_USE_CASE } from '@src/user/applications/contracts/delete-user.use-case-interface';
import { GET_USER_BY_ID_USE_CASE } from '@src/user/applications/contracts/get-user-by-id.use-case-interface';
import { LIST_USERS_USE_CASE } from '@src/user/applications/contracts/list-users.use-case-interface';
import { UPDATE_USER_USE_CASE } from '@src/user/applications/contracts/update-user.use-case-interface';

export const userProviders = [
  {
    provide: LIST_USERS_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: CREATE_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: GET_USER_BY_ID_REPOSITORY,
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
  {
    provide: LIST_USERS_USE_CASE,
    useClass: ListUsersUseCase,
  },
  {
    provide: CREATE_USER_USE_CASE,
    useClass: CreateUserUseCase,
  },
  {
    provide: GET_USER_BY_ID_USE_CASE,
    useClass: GetUserByIdUseCase,
  },
  {
    provide: UPDATE_USER_USE_CASE,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DELETE_USER_USE_CASE,
    useClass: DeleteUserUseCase,
  },
];
