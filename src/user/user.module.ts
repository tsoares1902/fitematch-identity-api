import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserController } from '@src/user/adapters/controllers/create-user.controller';
import { DeleteUserController } from '@src/user/adapters/controllers/delete-user.controller';
import { GetUserByIdController } from '@src/user/adapters/controllers/get-user-by-id.controller';
import { ListUsersController } from '@src/user/adapters/controllers/list-users.controller';
import { UpdateUserController } from '@src/user/adapters/controllers/update-user.controller';
import { UserEntity, UserSchema } from '@src/user/domains/schemas/user.schema';
import { userProviders } from '@src/user/user.providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    ListUsersController,
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [...userProviders],
  exports: [...userProviders, MongooseModule],
})
export class UserModule {}
