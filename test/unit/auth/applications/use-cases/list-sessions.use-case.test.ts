import { Test, TestingModule } from '@nestjs/testing';
import { ListSessionsUseCase } from '@src/auth/applications/use-cases/list-sessions.use-case';
import { SESSION_QUERY_REPOSITORY } from '@src/auth/domains/repositories/session-query.repository';

describe('ListSessionsUseCase', () => {
  let useCase: ListSessionsUseCase;

  const sessionQueryRepositoryMock = {
    listByUserId: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListSessionsUseCase,
        {
          provide: SESSION_QUERY_REPOSITORY,
          useValue: sessionQueryRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<ListSessionsUseCase>(ListSessionsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the sessions from the repository', async () => {
    const createdAt = new Date('2024-01-01T00:00:00.000Z');
    const updatedAt = new Date('2024-01-02T00:00:00.000Z');
    const expected = [
      {
        userId: 'user-id',
        sessionId: 'session-id',
        client: 'chrome',
        active: true,
        createdAt,
        startedAt: createdAt,
        updatedAt,
      },
    ];

    sessionQueryRepositoryMock.listByUserId.mockResolvedValue(expected);

    await expect(useCase.execute('user-id')).resolves.toEqual(expected);
    expect(sessionQueryRepositoryMock.listByUserId).toHaveBeenCalledWith(
      'user-id',
    );
  });
});
