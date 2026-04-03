import { Controller, Headers, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LogoutResponseDto } from '@src/auth/adapters/dto/logout-response.dto';
import {
  LOGOUT_USE_CASE,
  type LogoutResponse,
  type LogoutUseCaseInterface,
} from '@src/auth/applications/contracts/logout.use-case-interface';

@ApiTags('Auth')
@Controller('auth')
export class LogoutController {
  constructor(
    @Inject(LOGOUT_USE_CASE)
    private readonly logoutUseCase: LogoutUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Logout',
    description:
      'Invalidates the current access token using the Authorization header.',
  })
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: 'User logged out successfully.',
    type: LogoutResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Authorization token is invalid or missing.',
  })
  @Post('logout')
  async logout(
    @Headers('authorization') authorization?: string,
  ): Promise<LogoutResponse> {
    return this.logoutUseCase.execute({ authorization });
  }
}
