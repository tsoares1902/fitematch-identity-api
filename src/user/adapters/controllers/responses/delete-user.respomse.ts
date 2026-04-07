import AbstractResponse from '@src/user/adapters/controllers/responses/abstract-response';
import type { ResultDeleteUserUseCaseInterface } from '@src/user/applications/contracts/result-delete-user.use-case.interface';
import { DeleteUserResponseDto } from '@src/user/adapters/dto/responses/delete-user.response.dto';

export default class DeleteUserResponse extends AbstractResponse {
  response(data: ResultDeleteUserUseCaseInterface): DeleteUserResponseDto {
    return data;
  }
}
