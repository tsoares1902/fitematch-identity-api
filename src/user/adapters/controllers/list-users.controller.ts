import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import { Permissions } from '@src/auth/adapters/decorators/permissions.decorator';
import { Roles } from '@src/auth/adapters/decorators/roles.decorator';
import { PermissionsGuard } from '@src/auth/adapters/guards/permissions.guard';
import { RolesGuard } from '@src/auth/adapters/guards/roles.guard';
import { ListUsersQueryDto } from '@src/user/adapters/dto/list-users-query.dto';
import {
  LIST_USER_USE_CASE_INTERFACE,
  type ListUserUseCaseInterface,
} from '@src/user/applications/contracts/list-user.use-case-interface';
import { ResponseListUsersDTO } from '../dto/responses/list-user-response.dto';
import {
  AdminRoleEnum,
  PermissionEnum,
} from '@src/user/domains/entities/user.entity';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class ListUsersController {
  constructor(
    @Inject(LIST_USER_USE_CASE_INTERFACE)
    private readonly listUsersUseCase: ListUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'List users',
    description: 'Returns the list of registered users.',
  })
  @Roles(AdminRoleEnum.STAFF, AdminRoleEnum.ADMIN, AdminRoleEnum.SUPER_ADMIN)
  @Permissions(PermissionEnum.VIEW_USERS)
  @ApiOkResponse({
    description: 'Users listed successfully.',
    type: ResponseListUsersDTO,
  })
  @Get()
  list(@Query() data: ListUsersQueryDto): Promise<ResponseListUsersDTO> {
    return this.listUsersUseCase.execute(data);
  }
}
