import { Controller, Delete, HttpCode, Inject, Param } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  DELETE_USER_USE_CASE,
  type DeleteUserUseCaseInterface,
} from '@src/user/applications/contracts/delete-user.use-case-interface';

@ApiTags('User')
@Controller('user')
export class DeleteUserController {
  constructor(
    @Inject(DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: DeleteUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes an existing user by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiNoContentResponse({
    description: 'User deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
