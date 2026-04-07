import AbstractResponse from '@src/user/adapters/controllers/responses/abstract-response';
import type { ResultUpdateUserUseCaseInterface } from '@src/user/applications/contracts/result-update-user.use-case.interface';
import { ResponseUpdateUserDTO } from '@src/user/adapters/dto/responses/update-user-response.dto';

export default class UpdateUserResponse extends AbstractResponse {
  response(data: ResultUpdateUserUseCaseInterface): ResponseUpdateUserDTO {
    return { data: data.data };
  }
}
