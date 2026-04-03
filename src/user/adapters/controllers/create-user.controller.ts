import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '@src/user/adapters/dto/create-user.dto';
import { UserResponseDto } from '@src/user/adapters/dto/responses/user.response.dto';
import {
  CREATE_USER_USE_CASE,
  type CreateUserUseCaseInterface,
} from '@src/user/applications/contracts/create-user.use-case-interface';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import type { UserRecord } from '@src/user/applications/contracts/user-record.interface';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiConflictResponse({
    description: 'username or email already exists.',
  })
  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserRecord> {
    return this.createUserUseCase.execute({
      role: data.role ?? UserRoleEnum.CANDIDATE,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birthday: data.birthday,
      status: data.status ?? UserStatusEnum.PENDING,
    });
  }
}
