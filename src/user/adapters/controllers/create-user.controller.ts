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
import CreateUserResponse from './responses/create-user.respomse';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE_INTERFACE)
    private readonly createUserUseCase: CreateUserUseCaseInterface,
    private readonly createUserResponse: CreateUserResponse,
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
  async handler(@Body() data: CreateUserDTO): Promise<ResponseCreateUsersDTO> {
    try {
      const result = await this.createUserUseCase.execute(data);

      return this.createUserResponse.response(result);
    } catch (error: unknown) {
      this.createUserResponse.catch(error);
    }
  }
}
