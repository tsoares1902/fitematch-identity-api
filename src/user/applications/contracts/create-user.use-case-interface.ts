import type { CreateUserDTO } from '@src/user/adapters/dto/create-user.dto';
import type { ResultCreateUserUseCaseInterface } from '@src/user/applications/contracts//result-create-user.use-case.interface';

export const CREATE_USER_USE_CASE_INTERFACE = 'CREATE_USER_USE_CASE_INTERFACE';

export type CreateUserDataUseCaseInterface = CreateUserDTO;

export interface CreateUserUseCaseInterface {
  execute(
    data: CreateUserDataUseCaseInterface,
  ): Promise<ResultCreateUserUseCaseInterface>;
}
