import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from '@src/user/adapters/dto/create-user.dto';
import { ResponseCreateUsersDTO } from '@src/user/adapters/dto/responses/create-user-response.dto';
import {
  CREATE_USER_USE_CASE_INTERFACE,
  type CreateUserUseCaseInterface,
} from '@src/user/applications/contracts/create-user.use-case-interface';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE_INTERFACE)
    private readonly createUserUseCase: CreateUserUseCaseInterface,
  ) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user.',
  })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: ResponseCreateUsersDTO,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in the submitted data.',
  })
  @ApiConflictResponse({
    description: 'email already exists.',
  })
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<ResponseCreateUsersDTO> {
    return this.createUserUseCase.execute(data);
  }
}
