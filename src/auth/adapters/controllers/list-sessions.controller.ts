import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SessionResponseDto } from '@src/auth/adapters/dto/responses/session-response.dto';
import {
  LIST_SESSIONS_USE_CASE,
  type ListSessionsUseCaseInterface,
} from '@src/auth/applications/contracts/list-sessions.use-case-interface';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';

@ApiTags('Auth')
@Controller('auth')
export class ListSessionsController {
  constructor(
    @Inject(LIST_SESSIONS_USE_CASE)
    private readonly listSessionsUseCase: ListSessionsUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'List user sessions',
    description:
      'Returns all sessions stored for the provided user identifier.',
  })
  @ApiParam({ name: 'userId', description: 'User identifier.' })
  @ApiOkResponse({
    description: 'Sessions returned successfully.',
    type: SessionResponseDto,
    isArray: true,
  })
  @Get('sessions/:userId')
  async listByUserId(
    @Param('userId') userId: string,
  ): Promise<SessionRecordResponse[]> {
    return this.listSessionsUseCase.execute(userId);
  }
}
