import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MASKS_UTILS } from '@src/shared/applications/utils/masks.utils';
import { READ_USER_REPOSITORY_INTERFACE } from '@src/user/applications/contracts/read-user.repository-interface';
import { ReadUserUseCase } from '@src/user/applications/use-cases/read-user.use-case';

describe('ReadUserUseCase', () => {
  let useCase: ReadUserUseCase;

  const readUserRepositoryMock = {
    findById: jest.fn(),
  };

  const masksUtilsMock = {
    brazilPersonIdentityDocumentMask: jest.fn((value: string) => value),
    brazilPersonSocialDocumentMask: jest.fn((value: string) => value),
    brazilPhoneMask: jest.fn((value: string) => value),
    brazilZipCodeMask: jest.fn((value: string) => value),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadUserUseCase,
        {
          provide: READ_USER_REPOSITORY_INTERFACE,
          useValue: readUserRepositoryMock,
        },
        {
          provide: MASKS_UTILS,
          useValue: masksUtilsMock,
        },
      ],
    }).compile();

    useCase = module.get<ReadUserUseCase>(ReadUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the user when found', async () => {
    const expected = {
      id: 'user-id',
      isPaidMembership: false,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      birthday: '1990-01-01',
      role: 'candidate',
      status: 'enabled',
      documents: {},
      details: {},
      social: {},
    };

    readUserRepositoryMock.findById.mockResolvedValue(expected);

    await expect(useCase.execute('user-id')).resolves.toEqual({
      data: expected,
    });
    expect(readUserRepositoryMock.findById).toHaveBeenCalledWith('user-id');
  });

  it('should throw when the user is not found', async () => {
    readUserRepositoryMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
