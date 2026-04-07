import AbstractResponse from '@src/user/adapters/controllers/responses/abstract-response';
import { ResultListUserUseCaseInterface } from '@src/user/applications/contracts/result-list-user.use-case.interface';
import { ResponseListUsersDTO } from '@src/user/adapters/dto/responses/list-user-response.dto';

export default class ListUserResponse extends AbstractResponse {
  response(data: ResultListUserUseCaseInterface): ResponseListUsersDTO {
    return { data: data.data, metadata: data.metadata };
  }
}
