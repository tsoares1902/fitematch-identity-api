import type { ResultReadUserUseCaseInterface } from './result-read-user.use-case.interface';

export const READ_USER_USE_CASE_INTERFACE = 'READ_USER_USE_CASE_INTERFACE';

export interface ReadUserUseCaseInterface {
  execute(id: string): Promise<ResultReadUserUseCaseInterface>;
}
