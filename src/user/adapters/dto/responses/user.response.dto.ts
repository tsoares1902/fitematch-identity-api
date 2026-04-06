import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import * as userInterface from '@src/user/applications/contracts/user.interface';

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: UserRoleEnum })
  role!: UserRoleEnum;

  @ApiProperty()
  isPaidMembership!: boolean;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  birthday!: string;

  @ApiProperty({ required: false, type: Object, example: { identityDocument: '', socialDocument: '', otherDocumentt: '' } })
  documents?: userInterface.UserDocuments;

  @ApiProperty({ required: false, type: Object })
  details?: userInterface.ContactDetails;

  @ApiProperty({ required: false, type: Object })
  social?: userInterface.SocialMedias;

  @ApiProperty({ enum: UserStatusEnum })
  status!: UserStatusEnum;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
