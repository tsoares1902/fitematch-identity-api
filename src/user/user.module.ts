import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserController } from '@src/user/adapters/controllers/create-user.controller';
import { DeleteUserController } from '@src/user/adapters/controllers/delete-user.controller';
import { ReadUserController } from '@src/user/adapters/controllers/read-user-controller';
import { ListUsersController } from '@src/user/adapters/controllers/list-users.controller';
import { UpdateUserController } from '@src/user/adapters/controllers/update-user.controller';
import {
  UserPersistenceModel,
  UserPersistenceSchema,
} from '@src/user/adapters/persistence/mongoose/user.persistence';
import { userProviders } from '@src/user/user.providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPersistenceModel.name,
        schema: UserPersistenceSchema,
      },
    ]),
  ],
  controllers: [
    ListUsersController,
    CreateUserController,
    ReadUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [...userProviders],
  exports: [...userProviders, MongooseModule],
})
export class UserModule {}
