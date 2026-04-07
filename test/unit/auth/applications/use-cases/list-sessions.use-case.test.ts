import { Test, TestingModule } from '@nestjs/testing';
import { LIST_SESSIONS_REPOSITORY } from '@src/auth/applications/contracts/list-sessions.repository-interface';
import { ListSessionsUseCase } from '@src/auth/applications/use-cases/list-sessions.use-case';

describe('ListSessionsUseCase', () => {
  let useCase: ListSessionsUseCase;

  const listSessionsRepositoryMock = {
    findByUserId: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListSessionsUseCase,
        {
          provide: LIST_SESSIONS_REPOSITORY,
          useValue: listSessionsRepositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<ListSessionsUseCase>(ListSessionsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the sessions from the repository', async () => {
    const expected = [
      {
        userId: 'user-id',
        sessionId: 'session-id',
        active: true,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        startedAt: new Date('2024-01-01T00:00:00.000Z'),
      },
    ];

    listSessionsRepositoryMock.findByUserId.mockResolvedValue(expected);

    await expect(useCase.execute('user-id')).resolves.toEqual(expected);
    expect(listSessionsRepositoryMock.findByUserId).toHaveBeenCalledWith(
      'user-id',
    );
  });
});
