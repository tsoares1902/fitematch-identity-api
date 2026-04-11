import {
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import { Permissions } from '@src/auth/adapters/decorators/permissions.decorator';
import { Roles } from '@src/auth/adapters/decorators/roles.decorator';
import { PermissionsGuard } from '@src/auth/adapters/guards/permissions.guard';
import { RolesGuard } from '@src/auth/adapters/guards/roles.guard';
import { DeleteUserResponseDto } from '@src/user/adapters/dto/responses/delete-user.response.dto';
import {
  DELETE_USER_USE_CASE_INTERFACE,
  type DeleteUserUseCaseInterface,
} from '@src/user/applications/contracts/delete-user.use-case-interface';
import {
  AdminRoleEnum,
  PermissionEnum,
} from '@src/user/domains/entities/user.entity';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class DeleteUserController {
  constructor(
    @Inject(DELETE_USER_USE_CASE_INTERFACE)
    private readonly deleteUserUseCase: DeleteUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes an existing user by its identifier.',
  })
  @Roles(AdminRoleEnum.STAFF, AdminRoleEnum.ADMIN, AdminRoleEnum.SUPER_ADMIN)
  @Permissions(PermissionEnum.EDIT_USERS)
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
  async handle(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    return this.deleteUserUseCase.execute(id);
  }
}
