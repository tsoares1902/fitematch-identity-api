import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { AuthenticatedUser } from '@src/auth/adapters/security/authenticated-user.interface';

export const CurrentUser = createParamDecorator(
  (
    _data: unknown,
    context: ExecutionContext,
  ): AuthenticatedUser | undefined => {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();

    return request.user;
  },
);
