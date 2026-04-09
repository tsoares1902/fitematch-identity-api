import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LogoutResponseDto } from '@src/auth/adapters/dto/logout-response.dto';
import { ResetPasswordDto } from '@src/auth/adapters/dto/reset-password.dto';
import {
  RESET_PASSWORD_USE_CASE,
  type ResetPasswordUseCaseInterface,
} from '@src/auth/applications/contracts/reset-password.use-case-interface';

@ApiTags('Auth')
@Controller('auth')
export class ResetPasswordController {
  constructor(
    @Inject(RESET_PASSWORD_USE_CASE)
    private readonly resetPasswordUseCase: ResetPasswordUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Reset password',
    description: 'Resets the password using a valid reset token.',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({
    description: 'Password reset successfully.',
    type: LogoutResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid or expired reset token.',
  })
  @Post('reset-password')
  async resetPassword(
    @Body() data: ResetPasswordDto,
  ): Promise<LogoutResponseDto> {
    return this.resetPasswordUseCase.execute(data);
  }
}
