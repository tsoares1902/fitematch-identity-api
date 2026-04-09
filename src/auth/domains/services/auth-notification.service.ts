export const AUTH_NOTIFICATION_SERVICE = 'AUTH_NOTIFICATION_SERVICE';

export interface AuthNotificationService {
  sendPasswordResetEmail(input: {
    email: string;
    firstName: string;
    token: string;
  }): Promise<void>;
  sendEmailVerification(input: {
    email: string;
    firstName: string;
    token: string;
  }): Promise<void>;
}
