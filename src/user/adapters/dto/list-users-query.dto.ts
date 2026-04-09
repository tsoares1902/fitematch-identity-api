import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  type ListUserSortField,
  type ListUserSortOrder,
} from '@src/user/applications/contracts/list-user-query.interface';
import {
  AdminRoleEnum,
  ProductRoleEnum,
  UserStatusEnum,
} from '@src/user/domains/entities/user.entity';

enum ListUsersSortFieldEnum {
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
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({
    example: ProductRoleEnum.CANDIDATE,
    enum: ProductRoleEnum,
  })
  @IsOptional()
  @IsEnum(ProductRoleEnum)
  productRole?: ProductRoleEnum;

  @ApiPropertyOptional({
    example: AdminRoleEnum.ADMIN,
    enum: AdminRoleEnum,
  })
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  adminRole?: AdminRoleEnum;

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
    example: UserStatusEnum.ACTIVE,
    enum: UserStatusEnum,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;

  @ApiPropertyOptional({
    example: ListUsersSortFieldEnum.CREATED_AT,
    enum: ListUsersSortFieldEnum,
  })
  @IsOptional()
  @IsEnum(ListUsersSortFieldEnum)
  sortBy?: ListUserSortField;

  @ApiPropertyOptional({
    example: ListUsersSortOrderEnum.DESC,
    enum: ListUsersSortOrderEnum,
  })
  @IsOptional()
  @IsEnum(ListUsersSortOrderEnum)
  sortOrder?: ListUserSortOrder;
}
