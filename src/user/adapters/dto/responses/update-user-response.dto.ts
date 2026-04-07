import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UserDocumentsDTO {
  @ApiPropertyOptional()
  identityDocument?: string;

  @ApiPropertyOptional()
  socialDocument?: string;

  @ApiPropertyOptional()
  otherDocumentt?: string;
}

class UserDetailsDTO {
  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  isWhatsapp?: boolean;

  @ApiPropertyOptional()
  isTelegram?: boolean;

  @ApiPropertyOptional()
  street?: string;

  @ApiPropertyOptional()
  number?: string;

  @ApiPropertyOptional()
  complement?: string;

  @ApiPropertyOptional()
  neighborhood?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  zipCode?: string;
}

class UserSocialDTO {
  @ApiPropertyOptional()
  facebook?: string;

  @ApiPropertyOptional()
  x?: string;

  @ApiPropertyOptional()
  instagram?: string;

  @ApiPropertyOptional()
  linkedin?: string;

  @ApiPropertyOptional()
  whatsapp?: string;

  @ApiPropertyOptional()
  telegram?: string;
}

class UserDTO {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  isPaidMembership!: boolean;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  birthday!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional({ type: UserDocumentsDTO })
  documents?: UserDocumentsDTO;

  @ApiPropertyOptional({ type: UserDetailsDTO })
  details?: UserDetailsDTO;

  @ApiPropertyOptional({ type: UserSocialDTO })
  social?: UserSocialDTO;
}

export class ResponseUpdateUserDTO {
  @ApiProperty({ type: UserDTO })
  data!: UserDTO;
}
