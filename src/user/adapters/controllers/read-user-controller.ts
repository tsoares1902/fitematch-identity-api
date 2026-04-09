import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import { Permissions } from '@src/auth/adapters/decorators/permissions.decorator';
import { Roles } from '@src/auth/adapters/decorators/roles.decorator';
import { PermissionsGuard } from '@src/auth/adapters/guards/permissions.guard';
import { RolesGuard } from '@src/auth/adapters/guards/roles.guard';
import {
  READ_USER_USE_CASE_INTERFACE,
  type ReadUserUseCaseInterface,
} from '@src/user/applications/contracts/read-user.use-case-interface';
import { ResponseReadUserDTO } from '../dto/responses/read-user-response.dto';
import {
  AdminRoleEnum,
  PermissionEnum,
} from '@src/user/domains/entities/user.entity';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class ReadUserController {
  constructor(
    @Inject(READ_USER_USE_CASE_INTERFACE)
    private readonly readUserUseCase: ReadUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Returns a user by the provided identifier.',
  })
  @Roles(AdminRoleEnum.STAFF, AdminRoleEnum.ADMIN, AdminRoleEnum.SUPER_ADMIN)
  @Permissions(PermissionEnum.VIEW_USERS)
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiOkResponse({
    description: 'User found successfully.',
    type: ResponseReadUserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found!',
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseReadUserDTO> {
    return this.readUserUseCase.execute(id);
  }
}
