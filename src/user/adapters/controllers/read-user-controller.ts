import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  READ_USER_USE_CASE_INTERFACE,
  type ReadUserUseCaseInterface,
} from '@src/user/applications/contracts/read-user.use-case-interface';
import { ResponseReadUserDTO } from '../dto/responses/read-user-response.dto';
import ReadUserResponse from './responses/read-user.respomse';

@ApiTags('User')
@Controller('user')
export class ReadUserController {
  constructor(
    @Inject(READ_USER_USE_CASE_INTERFACE)
    private readonly readUserUseCase: ReadUserUseCaseInterface,
    private readonly readUserResponse: ReadUserResponse,
  ) {}

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Returns a user by the provided identifier.',
  })
  @ApiParam({ name: 'id', description: 'User identifier.' })
  @ApiOkResponse({
    description: 'User found successfully.',
    type: ResponseReadUserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found!',
  })
  @Get(':id')
  async handler(@Param('id') id: string): Promise<ResponseReadUserDTO> {
    try {
      const result = await this.readUserUseCase.execute(id);

      return this.readUserResponse.response(result);
    } catch (error: unknown) {
      this.readUserResponse.catch(error);
    }
  }
}
