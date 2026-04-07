import MetadataUtils from '@src/shared/applications/utils/metadata.utils';

describe('MetadataUtils', () => {
  let metadataUtils: MetadataUtils;

  beforeEach(() => {
    metadataUtils = new MetadataUtils();
  });

  it('should be defined', () => {
    expect(metadataUtils).toBeDefined();
  });

  it('should build pagination metadata for the first page', () => {
    expect(
      metadataUtils.getDadosPaginacao(
        25,
        10,
        10,
        1,
        'http://localhost:3000/user',
      ),
    ).toEqual({
      totalItems: 25,
      itemCount: 10,
      itemsPerPage: 10,
      totalPages: 3,
      currentPage: 1,
      hasNextPage: true,
      hasPreviousPage: false,
      links: {
        first: 'http://localhost:3000/user?limit=10',
        previous: '',
        next: 'http://localhost:3000/user?page=2&limit=10',
        last: 'http://localhost:3000/user?page=3&limit=10',
      },
    });
  });

  it('should build pagination metadata for a middle page', () => {
    expect(
      metadataUtils.getDadosPaginacao(
        25,
        10,
        10,
        2,
        'http://localhost:3000/user',
      ),
    ).toEqual({
      totalItems: 25,
      itemCount: 10,
      itemsPerPage: 10,
      totalPages: 3,
      currentPage: 2,
      hasNextPage: true,
      hasPreviousPage: true,
      links: {
        first: 'http://localhost:3000/user?limit=10',
        previous: 'http://localhost:3000/user?page=1&limit=10',
        next: 'http://localhost:3000/user?page=3&limit=10',
        last: 'http://localhost:3000/user?page=3&limit=10',
      },
    });
  });
});
