import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '@src/user/adapters/dto/user-public.dto';

export class LoginResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty({ type: UserPublicDto })
  user!: UserPublicDto;
}
