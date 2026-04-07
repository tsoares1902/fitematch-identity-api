import { Injectable } from '@nestjs/common';
import ResultPaginationInterface from '../contracts/result-pagination.interface';

@Injectable()
export default class MetadataUtils {
  /**
   * Retorna os metadados de paginação para respostas paginadas.
   *
   * @param totalItems - Total geral de itens
   * @param itemCount - Quantidade de itens na página atual
   * @param limit - Quantidade de itens por página
   * @param currentPage - Página atual
   * @param url - URL base para montar os links
   */
  public getDadosPaginacao(
    totalItems: number,
    itemCount: number,
    limit: number,
    currentPage: number,
    url: string,
  ): ResultPaginationInterface {
    const totalPages = Math.ceil(totalItems / limit);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return {
      totalItems,
      itemCount,
      itemsPerPage: limit,
      totalPages,
      currentPage,
      hasNextPage,
      hasPreviousPage,
      links: {
        first: `${url}?limit=${limit}`,
        previous: hasPreviousPage
          ? `${url}?page=${currentPage - 1}&limit=${limit}`
          : '',
        next: hasNextPage
          ? `${url}?page=${currentPage + 1}&limit=${limit}`
          : '',
        last: `${url}?page=${totalPages}&limit=${limit}`,
      },
    };
  }
}
