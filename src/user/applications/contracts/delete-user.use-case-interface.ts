import type { ResultDeleteUserUseCaseInterface } from './result-delete-user.use-case.interface';

export const DELETE_USER_USE_CASE = 'DELETE_USER_USE_CASE';

export interface DeleteUserUseCaseInterface {
  execute(id: string): Promise<ResultDeleteUserUseCaseInterface>;
}
