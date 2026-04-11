import { CreateUserController } from '@src/user/adapters/controllers/create-user.controller';
import { DeleteUserController } from '@src/user/adapters/controllers/delete-user.controller';
import { ListUsersController } from '@src/user/adapters/controllers/list-users.controller';
import { ReadUserController } from '@src/user/adapters/controllers/read-user-controller';
import { UpdateUserController } from '@src/user/adapters/controllers/update-user.controller';
import {
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

describe('User controllers', () => {
  const user = {
    id: 'user-id',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    status: UserStatusEnum.ACTIVE,
    productRole: ProductRoleEnum.CANDIDATE,
    isInternal: false,
  };

  it('CreateUserController maps the created user to the public response', async () => {
    const createUserUseCase = {
      execute: jest.fn().mockResolvedValue({ data: user }),
    };
    const controller = new CreateUserController(createUserUseCase as never);

    await expect(
      controller.handle({ ...user, password: 'secret' }),
    ).resolves.toEqual({
      data: expect.objectContaining({
        id: 'user-id',
        email: 'john@example.com',
      }),
    });
  });

  it('ReadUserController maps the loaded user to the public response', async () => {
    const readUserUseCase = {
      execute: jest.fn().mockResolvedValue({ data: user }),
    };
    const controller = new ReadUserController(readUserUseCase as never);

    await expect(controller.handle('user-id')).resolves.toEqual({
      data: expect.objectContaining({
        id: 'user-id',
        email: 'john@example.com',
      }),
    });
    expect(readUserUseCase.execute.mock.calls).toEqual([['user-id']]);
  });

  it('UpdateUserController maps the updated user to the public response', async () => {
    const updateUserUseCase = {
      execute: jest.fn().mockResolvedValue({ data: user }),
    };
    const controller = new UpdateUserController(updateUserUseCase as never);
    const data = { firstName: 'Johnny' };

    await expect(controller.handle('user-id', data)).resolves.toEqual({
      data: expect.objectContaining({
        id: 'user-id',
        email: 'john@example.com',
      }),
    });
    expect(updateUserUseCase.execute.mock.calls).toEqual([['user-id', data]]);
  });

  it('DeleteUserController delegates to the delete use case', async () => {
    const deleteUserUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new DeleteUserController(deleteUserUseCase as never);

    await expect(controller.handle('user-id')).resolves.toEqual({
      success: true,
    });
    expect(deleteUserUseCase.execute.mock.calls).toEqual([['user-id']]);
  });

  it('ListUsersController maps the paginated result to the response dto', async () => {
    const listUsersUseCase = {
      execute: jest.fn().mockResolvedValue({
        data: [user],
        pagination: {
          totalItems: 1,
          currentPage: 1,
          itemsPerPage: 10,
        },
      }),
    };
    const controller = new ListUsersController(listUsersUseCase as never);
    const filters = { page: 1, limit: 10 };

    await expect(controller.handle(filters)).resolves.toEqual({
      data: [
        expect.objectContaining({ id: 'user-id', email: 'john@example.com' }),
      ],
      pagination: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    });
    expect(listUsersUseCase.execute.mock.calls).toEqual([[filters]]);
  });
});
