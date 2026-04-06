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
  type ResultCreateUserUseCaseInterface,
} from '@src/user/applications/contracts/create-user.use-case-interface';

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
  async create(
    @Body() data: CreateUserDto,
  ): Promise<ResultCreateUserUseCaseInterface> {
    return this.createUserUseCase.execute(data);
  }
}
