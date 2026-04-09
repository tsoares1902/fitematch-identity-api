import type { User } from '@src/user/domains/entities/user.entity';

export const USER_COMMAND_REPOSITORY = 'USER_COMMAND_REPOSITORY';

export interface CreateUserCommand {
  user: User;
  passwordHash: string;
  tokenVersion?: number;
}

export interface UpdateUserCommand {
  user: Partial<User>;
}

export interface UserCommandRepository {
  create(command: CreateUserCommand): Promise<User>;
  update(id: string, command: UpdateUserCommand): Promise<User | null>;
  deactivate(id: string): Promise<boolean>;
}
