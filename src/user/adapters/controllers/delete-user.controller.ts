import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteUserResponseDto } from '@src/user/adapters/dto/responses/delete-user.response.dto';
import {
  DELETE_USER_USE_CASE,
  type DeleteUserUseCaseInterface,
} from '@src/user/applications/contracts/delete-user.use-case-interface';
import DeleteUserResponse from './responses/delete-user.respomse';

@ApiTags('User')
@Controller('user')
export class DeleteUserController {
  constructor(
    @Inject(DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: DeleteUserUseCaseInterface,
    private readonly deleteUserResponse: DeleteUserResponse,
  ) {}

  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes an existing user by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiOkResponse({
    description: 'User deleted successfully.',
    type: DeleteUserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    try {
      const result = await this.deleteUserUseCase.execute(id);

      return this.deleteUserResponse.response(result);
    } catch (error: unknown) {
      this.deleteUserResponse.catch(error);
    }
  }
}
