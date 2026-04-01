export const DELETE_USER_USE_CASE = 'DELETE_USER_USE_CASE';

export interface DeleteUserUseCaseInterface {
  execute(id: string): Promise<boolean>;
}
