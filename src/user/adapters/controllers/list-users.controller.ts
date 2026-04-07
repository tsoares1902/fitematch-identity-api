import { ConfigService } from '@nestjs/config';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListUsersQueryDto } from '@src/user/adapters/dto/list-users-query.dto';
import {
  LIST_USERS_USE_CASE_INTERFACE,
  type ListUsersUseCaseInterface,
} from '@src/user/applications/contracts/list-users.use-case-interface';
import { ResponseListUsersDTO } from '../dto/responses/list-user-response.dto';
import ListUserResponse from './responses/list-user.respomse';

@ApiTags('User')
@Controller('user')
export class ListUsersController {
  constructor(
    @Inject(LIST_USERS_USE_CASE_INTERFACE)
    private readonly listUsersUseCase: ListUsersUseCaseInterface,
    private readonly listUserResponse: ListUserResponse,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'List users',
    description: 'Returns the list of registered users.',
  })
  @ApiOkResponse({
    description: 'Users listed successfully.',
    type: ResponseListUsersDTO,
  })
  @Get()
  async handler(
    @Query() data: ListUsersQueryDto,
  ): Promise<ResponseListUsersDTO> {
    try {
      const result = await this.listUsersUseCase.execute({
        ...data,
        route: `${this.configService.get('IDENTITY_API_URL')}/user`,
      });

      return this.listUserResponse.response(result);
    } catch (error: unknown) {
      this.listUserResponse.catch(error);
    }
  }
}
