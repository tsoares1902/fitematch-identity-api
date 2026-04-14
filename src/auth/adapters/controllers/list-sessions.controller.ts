import {
  Controller,
  Get,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '@src/auth/adapters/decorators/current-user.decorator';
import { ProductPermissions } from '@src/auth/adapters/decorators/product-permissions.decorator';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import { ProductPermissionsGuard } from '@src/auth/adapters/guards/product-permissions.guard';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import { SessionResponseDto } from '@src/auth/adapters/dto/responses/session-response.dto';
import {
  LIST_SESSIONS_USE_CASE,
  type ListSessionsUseCaseInterface,
} from '@src/auth/applications/contracts/list-sessions.use-case-interface';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';
import { ProductPermissionEnum } from '@src/user/domains/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard, ProductPermissionsGuard)
export class ListSessionsController {
  constructor(
    @Inject(LIST_SESSIONS_USE_CASE)
    private readonly listSessionsUseCase: ListSessionsUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'List authenticated user sessions',
    description: 'Returns all sessions stored for the authenticated user.',
  })
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: 'Sessions returned successfully.',
    type: SessionResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Authorization token is invalid or missing.',
  })
  @ProductPermissions(ProductPermissionEnum.VIEW_OWN_SESSIONS)
  @Get('sessions/me')
  async handle(
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<SessionRecordResponse[]> {
    if (!user) {
      throw new UnauthorizedException('invalid token');
    }

    return this.listSessionsUseCase.execute(user.id);
  }
}
