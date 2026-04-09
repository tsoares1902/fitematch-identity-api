import { ApiProperty } from '@nestjs/swagger';
import { UserPublicDto } from '../user-public.dto';

export class ResponsePaginationDTO {
  @ApiProperty()
  totalItems!: number;

  @ApiProperty()
  itemCount!: number;

  @ApiProperty()
  itemsPerPage!: number;

  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  currentPage!: number;
}

export class ResponseListUsersDTO {
  @ApiProperty({ type: [UserPublicDto] })
  data!: UserPublicDto[];

  @ApiProperty({ type: ResponsePaginationDTO })
  pagination!: ResponsePaginationDTO;
}
