import { Inject, Injectable } from '@nestjs/common';
import type {
  UpdateMeData,
  UpdateMeUseCaseInterface,
} from '@src/auth/applications/contracts/update-me.use-case-interface';
import {
  UPDATE_USER_USE_CASE_INTERFACE,
  type UpdateUserUseCaseInterface,
} from '@src/user/applications/contracts/update-user.use-case-interface';
import type { ResultUpdateUserUseCaseInterface } from '@src/user/applications/contracts/result-update-user.use-case.interface';

@Injectable()
export class UpdateMeUseCase implements UpdateMeUseCaseInterface {
  constructor(
    @Inject(UPDATE_USER_USE_CASE_INTERFACE)
    private readonly updateUserUseCase: UpdateUserUseCaseInterface,
  ) {}

  execute(
    userId: string,
    data: UpdateMeData,
  ): Promise<ResultUpdateUserUseCaseInterface> {
    return this.updateUserUseCase.execute(userId, data);
  }
}
