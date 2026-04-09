import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LogoutResponseDto } from '@src/auth/adapters/dto/logout-response.dto';
import { VerifyEmailDto } from '@src/auth/adapters/dto/verify-email.dto';
import {
  VERIFY_EMAIL_USE_CASE,
  type VerifyEmailUseCaseInterface,
} from '@src/auth/applications/contracts/verify-email.use-case-interface';

@ApiTags('Auth')
@Controller('auth')
export class VerifyEmailController {
  constructor(
    @Inject(VERIFY_EMAIL_USE_CASE)
    private readonly verifyEmailUseCase: VerifyEmailUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Verify email',
    description: 'Verifies the user email using a valid verification token.',
  })
  @ApiBody({ type: VerifyEmailDto })
  @ApiOkResponse({
    description: 'Email verified successfully.',
    type: LogoutResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid or expired verification token.',
  })
  @Post('verify-email')
  async verifyEmail(@Body() data: VerifyEmailDto): Promise<LogoutResponseDto> {
    return this.verifyEmailUseCase.execute(data);
  }
}
