import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';
import * as userInterface from '@src/user/applications/contracts/user.interface';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: UserRoleEnum.CANDIDATE, enum: UserRoleEnum })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @ApiPropertyOptional({ example: 'johndoe', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  username?: string;

  @ApiPropertyOptional({ example: 'John', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @ApiPropertyOptional({ example: 'john@example.com', maxLength: 255 })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({
    example: 'StrongPassword123',
    minLength: 8,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(8, 255)
  password?: string;

  @ApiPropertyOptional({
    type: Object,
    description: 'Documentos do usuário',
    example: { identityDocument: '', socialDocument: '', otherDocumentt: '' },
  })
  @IsOptional()
  @Type(() => Object)
  documents?: userInterface.UserDocuments;

  @ApiPropertyOptional({
    type: Object,
    description: 'Detalhes de contato',
    example: { phone: '', city: '', state: '' },
  })
  @IsOptional()
  @Type(() => Object)
  details?: userInterface.ContactDetails;

  @ApiPropertyOptional({
    type: Object,
    description: 'Redes sociais',
    example: { facebook: '', instagram: '' },
  })
  @IsOptional()
  @Type(() => Object)
  social?: userInterface.SocialMedias;

  @ApiPropertyOptional({
    example: UserStatusEnum.ENABLED,
    enum: UserStatusEnum,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;
}
