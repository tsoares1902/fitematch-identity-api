import { Inject, Injectable } from '@nestjs/common';
import {
  LIST_SESSIONS_REPOSITORY,
  type ListSessionsRepositoryInterface,
} from '@src/auth/applications/contracts/list-sessions.repository-interface';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';
import type { ListSessionsUseCaseInterface } from '@src/auth/applications/contracts/list-sessions.use-case-interface';

@Injectable()
export class ListSessionsUseCase implements ListSessionsUseCaseInterface {
  constructor(
    @Inject(LIST_SESSIONS_REPOSITORY)
    private readonly listSessionsRepository: ListSessionsRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<SessionRecordResponse[]> {
    return this.listSessionsRepository.findByUserId(userId);
  }
}
