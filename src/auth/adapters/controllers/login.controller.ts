import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '@src/auth/adapters/dto/login.dto';
import {
  type LoginResponse,
  LOGIN_USE_CASE,
  type LoginUseCaseInterface,
} from '@src/auth/applications/contracts/login.use-case-interface';
import { LoginResponseDto } from '@src/auth/adapters/dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
  constructor(
    @Inject(LOGIN_USE_CASE)
    private readonly loginUseCase: LoginUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Login',
    description: 'Authenticates a user using email and password.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User authenticated successfully.',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials.',
  })
  @ApiForbiddenResponse({
    description: 'User account cannot authenticate in its current status.',
  })
  @Post('login')
  async handle(@Body() data: LoginDto): Promise<LoginResponse> {
    return this.loginUseCase.execute(data);
  }
}
