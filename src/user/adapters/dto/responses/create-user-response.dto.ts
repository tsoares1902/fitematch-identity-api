import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '../user-public.dto';

export class ResponseCreateUsersDTO {
  @ApiProperty({ type: UserPublicDto })
  data!: UserPublicDto;
}
