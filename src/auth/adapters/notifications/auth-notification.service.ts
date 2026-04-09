import { Injectable, Logger } from '@nestjs/common';
import type { AuthNotificationService } from '@src/auth/domains/services/auth-notification.service';

@Injectable()
export class LoggerAuthNotificationService implements AuthNotificationService {
  private readonly logger = new Logger(LoggerAuthNotificationService.name);

  sendPasswordResetEmail(input: {
    email: string;
    firstName: string;
    token: string;
  }): Promise<void> {
    this.logger.log(
      `password reset requested for ${input.email} token=${input.token}`,
    );

    return Promise.resolve();
  }

  sendEmailVerification(input: {
    email: string;
    firstName: string;
    token: string;
  }): Promise<void> {
    this.logger.log(
      `email verification requested for ${input.email} token=${input.token}`,
    );

    return Promise.resolve();
  }
}
