import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
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
import { UpdateUserDto } from '@src/user/adapters/dto/update-user.dto';
import {
  UPDATE_USER_USE_CASE_INTERFACE,
  type UpdateUserUseCaseInterface,
} from '@src/user/applications/contracts/update-user.use-case-interface';
import { ResponseUpdateUserDTO } from '../dto/responses/update-user-response.dto';
import { userInterfaceToPublicDto } from '../mappers/user-public.mapper';
import {
  AdminRoleEnum,
  PermissionEnum,
} from '@src/user/domains/entities/user.entity';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class UpdateUserController {
  constructor(
    @Inject(UPDATE_USER_USE_CASE_INTERFACE)
    private readonly updateUserUseCase: UpdateUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user by its identifier.',
  })
  @Roles(AdminRoleEnum.ADMIN, AdminRoleEnum.SUPER_ADMIN)
  @Permissions(PermissionEnum.EDIT_USERS)
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
  async handle(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<ResponseUpdateUserDTO> {
    const result = await this.updateUserUseCase.execute(id, data);
    return { data: userInterfaceToPublicDto(result.data) };
  }
}
