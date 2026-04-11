import { ApiProperty } from '@nestjs/swagger';
import type { ResultListUserUseCaseInterface } from '@src/user/applications/contracts/result-list-user.use-case.interface';
import { userInterfaceToPublicDto } from '@src/user/adapters/mappers/user-public.mapper';
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

  static fromUseCaseResult(
    result: ResultListUserUseCaseInterface,
  ): ResponseListUsersDTO {
    const dto = new ResponseListUsersDTO();
    dto.data = result.data.map(userInterfaceToPublicDto);
    dto.pagination = {
      totalItems: result.pagination.totalItems,
      itemCount: result.data.length,
      itemsPerPage: result.pagination.itemsPerPage,
      totalPages:
        result.pagination.totalItems > 0
          ? Math.ceil(
              result.pagination.totalItems / result.pagination.itemsPerPage,
            )
          : 0,
      currentPage: result.pagination.currentPage,
    };
    return dto;
  }
}
