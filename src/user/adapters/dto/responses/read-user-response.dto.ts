import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '../user-public.dto';

export class ResponseReadUserDTO {
  @ApiProperty({ type: UserPublicDto })
  data!: UserPublicDto;
}
