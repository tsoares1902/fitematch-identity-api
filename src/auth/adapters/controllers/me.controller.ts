import {
  Controller,
  Get,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '@src/auth/adapters/decorators/current-user.decorator';
import { JwtAuthGuard } from '@src/auth/adapters/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';
import {
  READ_USER_USE_CASE_INTERFACE,
  type ReadUserUseCaseInterface,
} from '@src/user/applications/contracts/read-user.use-case-interface';
import { ResponseReadUserDTO } from '@src/user/adapters/dto/responses/read-user-response.dto';
import { userInterfaceToPublicDto } from '@src/user/adapters/mappers/user-public.mapper';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(
    @Inject(READ_USER_USE_CASE_INTERFACE)
    private readonly readUserUseCase: ReadUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Get authenticated user',
    description: 'Returns the authenticated user based on the access token.',
  })
  @ApiOkResponse({
    description: 'User found successfully.',
    type: ResponseReadUserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found!',
  })
  @Get('me')
  async handle(
    @CurrentUser() user?: AuthenticatedUser,
  ): Promise<ResponseReadUserDTO> {
    if (!user) {
      throw new UnauthorizedException('invalid token');
    }

    const result = await this.readUserUseCase.execute(user.id);
    return { data: userInterfaceToPublicDto(result.data) };
  }
}
