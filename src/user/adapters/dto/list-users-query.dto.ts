import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  type ListUsersSortField,
  type ListUsersSortOrder,
} from '@src/user/applications/contracts/list-users-filters.interface';
import { UserRoleEnum } from '@src/user/applications/contracts/user-role.enum';
import { UserStatusEnum } from '@src/user/applications/contracts/user-status.enum';

enum ListUsersSortFieldEnum {
  USERNAME = 'username',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

enum ListUsersSortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class ListUsersQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

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
    example: UserStatusEnum.ENABLED,
    enum: UserStatusEnum,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @ApiPropertyOptional({
    example: ListUsersSortFieldEnum.CREATED_AT,
    enum: ListUsersSortFieldEnum,
  })
  @IsOptional()
  @IsEnum(ListUsersSortFieldEnum)
  sortBy?: ListUsersSortField;

  @ApiPropertyOptional({
    example: ListUsersSortOrderEnum.DESC,
    enum: ListUsersSortOrderEnum,
  })
  @IsOptional()
  @IsEnum(ListUsersSortOrderEnum)
  sortOrder?: ListUsersSortOrder;
}
