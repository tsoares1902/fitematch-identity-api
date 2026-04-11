import { ForgotPasswordController } from '@src/auth/adapters/controllers/forgot-password.controller';
import { ListSessionsController } from '@src/auth/adapters/controllers/list-sessions.controller';
import { LoginController } from '@src/auth/adapters/controllers/login.controller';
import { MeController } from '@src/auth/adapters/controllers/me.controller';
import { LogoutController } from '@src/auth/adapters/controllers/logout.controller';
import { ResendVerificationEmailController } from '@src/auth/adapters/controllers/resend-verification-email.controller';
import { ResetPasswordController } from '@src/auth/adapters/controllers/reset-password.controller';
import { VerifyEmailController } from '@src/auth/adapters/controllers/verify-email.controller';
import type { SessionRecordResponse } from '@src/auth/applications/contracts/session-record.interface';
import {
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

describe('Auth controllers', () => {
  const user = {
    id: 'user-id',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    status: UserStatusEnum.ACTIVE,
    productRole: ProductRoleEnum.CANDIDATE,
    isInternal: false,
  };

  it('LoginController delegates to the login use case', async () => {
    const loginUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new LoginController(loginUseCase as never);
    const data = { email: 'john@example.com', password: 'secret' };

    await expect(controller.handle(data)).resolves.toEqual({ success: true });
    expect(loginUseCase.execute.mock.calls).toEqual([[data]]);
  });

  it('LogoutController forwards the authorization header', async () => {
    const logoutUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new LogoutController(logoutUseCase as never);

    await expect(controller.handle('Bearer token')).resolves.toEqual({
      success: true,
    });
    expect(logoutUseCase.execute.mock.calls).toEqual([
      [{ authorization: 'Bearer token' }],
    ]);
  });

  it('MeController returns the authenticated user', async () => {
    const readUserUseCase = {
      execute: jest.fn().mockResolvedValue({ data: user }),
    };
    const controller = new MeController(readUserUseCase as never);

    await expect(controller.handle(user)).resolves.toEqual({
      data: expect.objectContaining({
        id: 'user-id',
        email: 'john@example.com',
      }),
    });
    expect(readUserUseCase.execute.mock.calls).toEqual([['user-id']]);
  });

  it('ListSessionsController delegates to the list sessions use case', async () => {
    const sessions: SessionRecordResponse[] = [
      {
        sessionId: 'session-id',
        active: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        startedAt: '2026-01-01T00:00:00.000Z',
      },
    ];
    const listSessionsUseCase = {
      execute: jest.fn().mockResolvedValue(sessions),
    };
    const controller = new ListSessionsController(listSessionsUseCase as never);

    await expect(controller.handle('user-id')).resolves.toEqual(sessions);
    expect(listSessionsUseCase.execute.mock.calls).toEqual([['user-id']]);
  });

  it('ForgotPasswordController delegates to the forgot password use case', async () => {
    const forgotPasswordUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new ForgotPasswordController(
      forgotPasswordUseCase as never,
    );
    const data = { email: 'john@example.com' };

    await expect(controller.handle(data)).resolves.toEqual({ success: true });
    expect(forgotPasswordUseCase.execute.mock.calls).toEqual([[data]]);
  });

  it('ResetPasswordController delegates to the reset password use case', async () => {
    const resetPasswordUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new ResetPasswordController(
      resetPasswordUseCase as never,
    );
    const data = { token: 'token', newPassword: 'secret' };

    await expect(controller.handle(data)).resolves.toEqual({ success: true });
    expect(resetPasswordUseCase.execute.mock.calls).toEqual([[data]]);
  });

  it('VerifyEmailController delegates to the verify email use case', async () => {
    const verifyEmailUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new VerifyEmailController(verifyEmailUseCase as never);
    const data = { token: 'token' };

    await expect(controller.handle(data)).resolves.toEqual({ success: true });
    expect(verifyEmailUseCase.execute.mock.calls).toEqual([[data]]);
  });

  it('ResendVerificationEmailController delegates to the resend use case', async () => {
    const resendVerificationEmailUseCase = {
      execute: jest.fn().mockResolvedValue({ success: true }),
    };
    const controller = new ResendVerificationEmailController(
      resendVerificationEmailUseCase as never,
    );
    const data = { email: 'john@example.com' };

    await expect(controller.handle(data)).resolves.toEqual({ success: true });
    expect(resendVerificationEmailUseCase.execute.mock.calls).toEqual([[data]]);
  });
});
