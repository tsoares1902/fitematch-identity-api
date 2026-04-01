export const DELETE_USER_REPOSITORY = 'DELETE_USER_REPOSITORY';

export interface DeleteUserRepositoryInterface {
  delete(id: string): Promise<boolean>;
}
