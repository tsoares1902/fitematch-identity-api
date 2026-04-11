import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LogoutResponseDto } from '@src/auth/adapters/dto/logout-response.dto';
import { ResendVerificationEmailDto } from '@src/auth/adapters/dto/resend-verification-email.dto';
import {
  RESEND_VERIFICATION_EMAIL_USE_CASE,
  type ResendVerificationEmailUseCaseInterface,
} from '@src/auth/applications/contracts/resend-verification-email.use-case-interface';

@ApiTags('Auth')
@Controller('auth')
export class ResendVerificationEmailController {
  constructor(
    @Inject(RESEND_VERIFICATION_EMAIL_USE_CASE)
    private readonly resendVerificationEmailUseCase: ResendVerificationEmailUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Resend verification email',
    description: 'Resends an email verification token for a pending account.',
  })
  @ApiBody({ type: ResendVerificationEmailDto })
  @ApiOkResponse({
    description: 'Verification email flow processed successfully.',
    type: LogoutResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @Post('resend-verification-email')
  async handle(
    @Body() data: ResendVerificationEmailDto,
  ): Promise<LogoutResponseDto> {
    return this.resendVerificationEmailUseCase.execute(data);
  }
}
