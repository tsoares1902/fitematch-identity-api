import { Body, Controller, Inject, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from '@src/user/adapters/dto/update-user.dto';
import {
  UPDATE_USER_USE_CASE,
  type UpdateUserUseCaseInterface,
} from '@src/user/applications/contracts/update-user.use-case-interface';
import { ResponseUpdateUserDTO } from '../dto/responses/update-user-response.dto';
import UpdateUserResponse from './responses/update-user.respomse';

@ApiTags('User')
@Controller('user')
export class UpdateUserController {
  constructor(
    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UpdateUserUseCaseInterface,
    private readonly updateUserResponse: UpdateUserResponse,
  ) {}

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully.',
    type: ResponseUpdateUserDTO,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiConflictResponse({
    description: 'email already exists.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<ResponseUpdateUserDTO> {
    try {
      const result = await this.updateUserUseCase.execute(id, data);

      return this.updateUserResponse.response(result);
    } catch (error: unknown) {
      this.updateUserResponse.catch(error);
    }
  }
}
