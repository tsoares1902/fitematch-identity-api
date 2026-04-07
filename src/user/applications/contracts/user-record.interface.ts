import type { User } from '@src/user/applications/contracts/user.interface';

export interface UserRecord extends Omit<User, 'password'> {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
