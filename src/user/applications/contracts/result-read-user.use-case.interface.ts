import type { UserInterface } from '@src/user/applications/contracts/user.interface';

export type ReadUserOutputDto = UserInterface;

export interface ResultReadUserUseCaseInterface {
  data: ReadUserOutputDto;
}
