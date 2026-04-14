import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  CandidateProfileInputDto,
  RecruiterProfileInputDto,
} from '@src/user/adapters/dto/create-user.dto';

export class UpdateMeDto {
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

  @ApiPropertyOptional({ example: '1994-01-01' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({ type: CandidateProfileInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CandidateProfileInputDto)
  candidateProfile?: CandidateProfileInputDto;

  @ApiPropertyOptional({ type: RecruiterProfileInputDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RecruiterProfileInputDto)
  recruiterProfile?: RecruiterProfileInputDto;
}
