import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SessionClientDto {
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

export class CreateSessionDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  sessionId!: string;

  @ApiPropertyOptional({ type: SessionClientDto })
  client?: SessionClientDto;

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
