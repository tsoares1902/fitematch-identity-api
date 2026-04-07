import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UserDocumentsDTO {
  @ApiPropertyOptional()
  identityDocument?: string;

  @ApiPropertyOptional()
  socialDocument?: string;
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

class LinksDTO {
  @ApiProperty()
  first!: string;

  @ApiProperty()
  previous!: string;

  @ApiProperty()
  next!: string;

  @ApiProperty()
  last!: string;
}

export class ResponsePaginationDTO {
  @ApiProperty({ type: Number })
  totalItems!: number;

  @ApiProperty({ type: Number })
  itemCount!: number;

  @ApiProperty({ type: Number })
  itemsPerPage!: number;

  @ApiProperty({ type: Number })
  totalPages!: number;

  @ApiProperty({ type: Number })
  currentPage!: number;

  @ApiPropertyOptional({ type: Boolean })
  hasNextPage?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  hasPreviousPage?: boolean;

  @ApiProperty({ type: LinksDTO })
  links!: LinksDTO;
}

export class ResponseMetadataDTO {
  @ApiPropertyOptional({ type: ResponsePaginationDTO, nullable: true })
  pagination?: ResponsePaginationDTO | null;
}

export class ResponseListUsersDTO {
  @ApiProperty({
    type: [UserDTO],
  })
  data!: UserDTO[];

  @ApiProperty({ type: ResponseMetadataDTO })
  metadata!: ResponseMetadataDTO;
}
