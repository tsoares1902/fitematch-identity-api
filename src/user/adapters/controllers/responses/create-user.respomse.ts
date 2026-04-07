import AbstractResponse from '@src/user/adapters/controllers/responses/abstract-response';
import { ResultCreateUserUseCaseInterface } from '@src/user/applications/contracts/result-create-user.use-case.interface';
import { ResponseCreateUsersDTO } from '@src/user/adapters/dto/responses/create-user-response.dto';

export default class CreateUserResponse extends AbstractResponse {
  response(data: ResultCreateUserUseCaseInterface): ResponseCreateUsersDTO {
    return { data: data.data };
  }
}
