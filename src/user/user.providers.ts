import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';
import MasksUtils, {
  MASKS_UTILS,
} from '@src/shared/applications/utils/masks.utils';
import MetadataUtils from '@src/shared/applications/utils/metadata.utils';
import CreateUserResponse from '@src/user/adapters/controllers/responses/create-user.respomse';
import DeleteUserResponse from '@src/user/adapters/controllers/responses/delete-user.respomse';
import { UserRepository } from '@src/user/adapters/repositories/user.repository';
import ListUserResponse from '@src/user/adapters/controllers/responses/list-user.respomse';
import ReadUserResponse from '@src/user/adapters/controllers/responses/read-user.respomse';
import UpdateUserResponse from '@src/user/adapters/controllers/responses/update-user.respomse';
import { ListUsersUseCase } from '@src/user/applications/use-cases/list-users.use-case';
import { CreateUserUseCase } from '@src/user/applications/use-cases/create-user.use-case';
import { ReadUserUseCase } from '@src/user/applications/use-cases/read-user.use-case';
import { UpdateUserUseCase } from '@src/user/applications/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@src/user/applications/use-cases/delete-user.use-case';
import { LIST_USER_REPOSITORY_INTERFACE } from '@src/user/applications/contracts/list-user.repository-interface';
import { CREATE_USER_REPOSITORY } from '@src/user/applications/contracts/create-user.repository-interface';
import { READ_USER_REPOSITORY_INTERFACE } from '@src/user/applications/contracts/read-user.repository-interface';
import { UPDATE_USER_REPOSITORY } from '@src/user/applications/contracts/update-user.repository-interface';
import { DELETE_USER_REPOSITORY } from '@src/user/applications/contracts/delete-user.repository-interface';
import { LIST_USERS_USE_CASE_INTERFACE } from '@src/user/applications/contracts/list-users.use-case-interface';
import { CREATE_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/create-user.use-case-interface';
import { READ_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/read-user.use-case-interface';
import { UPDATE_USER_USE_CASE } from '@src/user/applications/contracts/update-user.use-case-interface';
import { DELETE_USER_USE_CASE } from '@src/user/applications/contracts/delete-user.use-case-interface';

export const userProviders = [
  EncryptUtils,
  MetadataUtils,
  CreateUserResponse,
  ReadUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  ListUserResponse,
  {
    provide: MASKS_UTILS,
    useClass: MasksUtils,
  },
  {
    provide: LIST_USERS_USE_CASE_INTERFACE,
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
    provide: UPDATE_USER_USE_CASE,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DELETE_USER_USE_CASE,
    useClass: DeleteUserUseCase,
  },
  {
    provide: LIST_USER_REPOSITORY_INTERFACE,
    useClass: UserRepository,
  },
  {
    provide: CREATE_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: READ_USER_REPOSITORY_INTERFACE,
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
