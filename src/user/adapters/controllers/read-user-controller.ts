import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from '@src/user/adapters/dto/responses/user.response.dto';
import {
  READ_USER_USE_CASE,
  type ReadUserUseCaseInterface,
} from '@src/user/applications/contracts/read-user.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@ApiTags('User')
@Controller('user')
export class ReadUserController {
  constructor(
    @Inject(READ_USER_USE_CASE)
    private readonly getUserByIdUseCase: ReadUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Returns a user by the provided identifier.',
  })
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiOkResponse({
    description: 'User found successfully.',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserRecord> {
    return this.getUserByIdUseCase.execute(id);
  }
}
