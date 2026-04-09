import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ForgotPasswordDto } from '@src/auth/adapters/dto/forgot-password.dto';
import { LogoutResponseDto } from '@src/auth/adapters/dto/logout-response.dto';
import {
  FORGOT_PASSWORD_USE_CASE,
  type ForgotPasswordUseCaseInterface,
} from '@src/auth/applications/contracts/forgot-password.use-case-interface';

@ApiTags('Auth')
@Controller('auth')
export class ForgotPasswordController {
  constructor(
    @Inject(FORGOT_PASSWORD_USE_CASE)
    private readonly forgotPasswordUseCase: ForgotPasswordUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Forgot password',
    description: 'Creates a password reset request for the informed email.',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOkResponse({
    description: 'Password reset request processed successfully.',
    type: LogoutResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @Post('forgot-password')
  async forgotPassword(
    @Body() data: ForgotPasswordDto,
  ): Promise<LogoutResponseDto> {
    return this.forgotPasswordUseCase.execute(data);
  }
}
