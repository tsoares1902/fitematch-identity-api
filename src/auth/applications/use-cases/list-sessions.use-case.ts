import { Inject, Injectable } from '@nestjs/common';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';
import type { ListSessionsUseCaseInterface } from '@src/auth/applications/contracts/list-sessions.use-case-interface';
import {
  SESSION_QUERY_REPOSITORY,
  type SessionQueryRepository,
} from '@src/auth/domains/repositories/session-query.repository';
import type { UserSession } from '@src/auth/domains/repositories/session-query.repository';

@Injectable()
export class ListSessionsUseCase implements ListSessionsUseCaseInterface {
  constructor(
    @Inject(SESSION_QUERY_REPOSITORY)
    private readonly sessionQueryRepository: SessionQueryRepository,
  ) {}

  async execute(userId: string): Promise<SessionRecordResponse[]> {
    const sessions = await this.sessionQueryRepository.listByUserId(userId);
    return sessions.map((session) => this.toOutput(session));
  }

  private toOutput(session: UserSession): SessionRecordResponse {
    return {
      userId: session.userId,
      sessionId: session.sessionId,
      client: session.client,
      active: session.active,
      createdAt: session.createdAt,
      startedAt: session.startedAt,
      updatedAt: session.updatedAt,
    };
  }
}
