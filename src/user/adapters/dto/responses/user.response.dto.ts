import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: UserRoleEnum })
  role!: UserRoleEnum;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: UserStatusEnum })
  status!: UserStatusEnum;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
