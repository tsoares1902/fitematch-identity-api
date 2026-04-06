import type { User } from './user.interface';

export interface ListUserResponseInterface {
  data: {
    id: string;
    role: User['role'];
    isPaidMembership: User['isPaidMembership'];
    username: User['username'];
    firstName: User['firstName'];
    lastName: User['lastName'];
    email: User['email'];
    status: User['status'];
    birthday: User['birthday'];
    documents?: User['documents'];
    details?: User['details'];
    social?: User['social'];
    createdAt?: Date;
    updatedAt?: Date;
  };
}
