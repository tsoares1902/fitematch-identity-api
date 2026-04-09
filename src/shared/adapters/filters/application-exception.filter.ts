import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthenticationForbiddenError } from '@src/auth/applications/errors/authentication-forbidden.error';
import { InvalidAuthorizationHeaderError } from '@src/auth/applications/errors/invalid-authorization-header.error';
import { InvalidCredentialsError } from '@src/auth/applications/errors/invalid-credentials.error';
import { InvalidEmailVerificationTokenError } from '@src/auth/applications/errors/invalid-email-verification-token.error';
import { InvalidPasswordResetTokenError } from '@src/auth/applications/errors/invalid-password-reset-token.error';
import { InvalidTokenError } from '@src/auth/applications/errors/invalid-token.error';
import { UserNotFoundError } from '@src/user/applications/errors/user-not-found.error';

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApplicationExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();

      response.status(status).json(payload);
      return;
    }

    const mappedException = this.mapException(exception);

    if (mappedException) {
      response
        .status(mappedException.getStatus())
        .json(mappedException.getResponse());
      return;
    }

    this.logger.error(
      exception instanceof Error ? exception.message : 'unexpected error',
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred!',
    });
  }

  private mapException(exception: unknown): HttpException | null {
    if (exception instanceof UserNotFoundError) {
      return new NotFoundException(exception.message);
    }

    if (
      exception instanceof InvalidCredentialsError ||
      exception instanceof InvalidAuthorizationHeaderError ||
      exception instanceof InvalidTokenError
    ) {
      return new UnauthorizedException(exception.message);
    }

    if (exception instanceof AuthenticationForbiddenError) {
      return new ForbiddenException(exception.message);
    }

    if (
      exception instanceof InvalidPasswordResetTokenError ||
      exception instanceof InvalidEmailVerificationTokenError
    ) {
      return new BadRequestException(exception.message);
    }

    return null;
  }
}
