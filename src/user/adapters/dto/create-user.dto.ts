import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import * as userInterface from '@src/user/applications/contracts/user.interface';

export class CreateUserDTO {
  @ApiProperty({
    example: UserRoleEnum.CANDIDATE || UserRoleEnum.RECRUITER,
    enum: UserRoleEnum,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;

  @ApiProperty({ example: false, required: false, default: false })
  @IsOptional()
  isPaidMembership?: boolean;

  @ApiProperty({ example: 'John', minLength: 2, maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(64)
  firstName!: string;

  @ApiProperty({ example: 'Doe', minLength: 2, maxLength: 64 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(64)
  lastName!: string;

  @ApiProperty({ example: 'john@example.com', maxLength: 255 })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: 'StrongPassword123', minLength: 8, maxLength: 128 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiProperty({ example: '1994-01-01' })
  @IsDateString()
  @IsNotEmpty()
  birthday!: string;

  @ApiProperty({
    example: UserStatusEnum.PENDING,
    enum: UserStatusEnum,
    required: false,
    default: UserStatusEnum.PENDING,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;
  @ApiProperty({
    required: false,
    type: Object,
    description: 'Documentos do usuário',
    example: { identityDocument: '', socialDocument: '', otherDocumentt: '' },
  })
  @IsOptional()
  @Type(() => Object)
  documents?: userInterface.UserDocuments;

  @ApiProperty({
    required: false,
    type: Object,
    description: 'Detalhes de contato',
    example: { phone: '', city: '', state: '' },
  })
  @IsOptional()
  @Type(() => Object)
  details?: userInterface.ContactDetails;

  @ApiProperty({
    required: false,
    type: Object,
    description: 'Redes sociais',
    example: { facebook: '', instagram: '' },
  })
  @IsOptional()
  @Type(() => Object)
  social?: userInterface.SocialMedias;
}
