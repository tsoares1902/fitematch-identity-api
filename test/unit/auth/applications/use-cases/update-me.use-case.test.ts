import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMeUseCase } from '@src/auth/applications/use-cases/update-me.use-case';
import { UPDATE_USER_USE_CASE_INTERFACE } from '@src/user/applications/contracts/update-user.use-case-interface';

describe('UpdateMeUseCase', () => {
  let useCase: UpdateMeUseCase;

  const updateUserUseCaseMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMeUseCase,
        {
          provide: UPDATE_USER_USE_CASE_INTERFACE,
          useValue: updateUserUseCaseMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateMeUseCase>(UpdateMeUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delegate the self update to UpdateUserUseCase', async () => {
    const data = { firstName: 'Jane' };
    const expected = {
      data: {
        id: 'user-id',
        firstName: 'Jane',
      },
    };

    updateUserUseCaseMock.execute.mockResolvedValue(expected);

    await expect(useCase.execute('user-id', data)).resolves.toEqual(expected);
    expect(updateUserUseCaseMock.execute).toHaveBeenCalledWith('user-id', data);
  });
});
