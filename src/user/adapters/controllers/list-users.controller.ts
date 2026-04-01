import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListUsersQueryDto } from '@src/user/adapters/dto/list-users-query.dto';
import { UserResponseDto } from '@src/user/adapters/dto/responses/user.response.dto';
import {
  LIST_USERS_USE_CASE,
  type ListUsersUseCaseInterface,
} from '@src/user/applications/contracts/list-users.use-case-interface';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';

@ApiTags('User')
@Controller('user')
export class ListUsersController {
  constructor(
    @Inject(LIST_USERS_USE_CASE)
    private readonly listUsersUseCase: ListUsersUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'List users',
    description: 'Returns the list of registered users.',
  })
  @ApiOkResponse({
    description: 'Users listed successfully.',
    type: UserResponseDto,
    isArray: true,
  })
  @Get()
  async list(@Query() query: ListUsersQueryDto): Promise<UserRecord[]> {
    return this.listUsersUseCase.execute(query);
  }
}
