import type { User } from './user.interface';

export interface UserRecord extends Omit<User, 'password'> {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
