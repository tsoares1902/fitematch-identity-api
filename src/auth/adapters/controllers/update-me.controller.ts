import {
  Body,
  Controller,
  Inject,
  Patch,
  UnauthorizedException,
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
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '@src/auth/adapters/decorators/current-user.decorator';
import { ProductPermissions } from '@src/auth/adapters/decorators/product-permissions.decorator';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import { ProductPermissionsGuard } from '@src/auth/adapters/guards/product-permissions.guard';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import { UpdateMeDto } from '@src/auth/adapters/dto/update-me.dto';
import {
  UPDATE_ME_USE_CASE,
  type UpdateMeUseCaseInterface,
} from '@src/auth/applications/contracts/update-me.use-case-interface';
import { ProductPermissionEnum } from '@src/user/domains/entities/user.entity';
import { ResponseUpdateUserDTO } from '@src/user/adapters/dto/responses/update-user-response.dto';
import { userInterfaceToPublicDto } from '@src/user/adapters/mappers/user-public.mapper';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, ProductPermissionsGuard)
export class UpdateMeController {
  constructor(
    @Inject(UPDATE_ME_USE_CASE)
    private readonly updateMeUseCase: UpdateMeUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Update authenticated user',
    description:
      'Updates the authenticated user with self-service fields only.',
  })
  @ApiBody({ type: UpdateMeDto })
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
  @ProductPermissions(ProductPermissionEnum.EDIT_OWN_USER)
  @Patch('me')
  async handle(
    @CurrentUser() user?: AuthenticatedUser,
    @Body() data?: UpdateMeDto,
  ): Promise<ResponseUpdateUserDTO> {
    if (!user) {
      throw new UnauthorizedException('invalid token');
    }

    const result = await this.updateMeUseCase.execute(user.id, data ?? {});
    return { data: userInterfaceToPublicDto(result.data) };
  }
}
