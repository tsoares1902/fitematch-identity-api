import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserAgentResponseDto {
  @ApiPropertyOptional()
  browser?: string;

  @ApiPropertyOptional()
  deviceType?: string;

  @ApiPropertyOptional()
  ip?: string;

  @ApiPropertyOptional()
  os?: string;

  @ApiPropertyOptional()
  timezone?: string;

  @ApiPropertyOptional()
  userAgent?: string;
}

export class SessionResponseDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  sessionId!: string;

  @ApiPropertyOptional({ type: UserAgentResponseDto })
  client?: UserAgentResponseDto;

  @ApiProperty()
  active!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  startedAt!: Date;

  @ApiPropertyOptional()
  endedAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
