import AbstractResponse from '@src/user/adapters/controllers/responses/abstract-response';

import { ResultReadUserUseCaseInterface } from '@src/user/applications/contracts/result-read-user.use-case.interface';
import { ResponseReadUserDTO } from '@src/user/adapters/dto/responses/read-user-response.dto';

export default class ReadUserResponse extends AbstractResponse {
  response(data: ResultReadUserUseCaseInterface): ResponseReadUserDTO {
    return { data: data.data };
  }
}
