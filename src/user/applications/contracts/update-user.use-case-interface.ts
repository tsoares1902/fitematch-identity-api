import type { User } from './user.interface';
import type { ResultUpdateUserUseCaseInterface } from './result-update-user.use-case.interface';

export const UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE';

export type UpdateUserDataUseCaseInterface = Partial<User>;

export interface UpdateUserUseCaseInterface {
  execute(
    id: string,
    data: UpdateUserDataUseCaseInterface,
  ): Promise<ResultUpdateUserUseCaseInterface>;
}
