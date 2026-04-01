import type { UserRoleEnum } from './user-role.enum';
import type { UserStatusEnum } from './user-status.enum';

export interface User {
  role: UserRoleEnum;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  status: UserStatusEnum;
}
