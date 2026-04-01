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
import { UserResponseDto } from '@src/user/adapters/dto/responses/user.response.dto';
import { UpdateUserDto } from '@src/user/adapters/dto/update-user.dto';
import {
  UPDATE_USER_USE_CASE,
  type UpdateUserUseCaseInterface,
} from '@src/user/applications/contracts/update-user.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@ApiTags('User')
@Controller('user')
export class UpdateUserController {
  constructor(
    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UpdateUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user by its identifier.',
  })
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiConflictResponse({
    description: 'username or email already exists.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserRecord> {
    return this.updateUserUseCase.execute(id, data);
  }
}
