import { Inject, Injectable } from '@nestjs/common';
import { BrazilPersonIdentityDocumentMaskInterface } from '@src/shared/applications/contracts/brazil-person-identity-document-mask.interface';
import { BrazilPersonSocialDocumentMaskInterface } from '@src/shared/applications/contracts/brazil-person-social-document-mask.interface';
import { BrazilPhoneMaskInterface } from '@src/shared/applications/contracts/brazil-phone-mask.interface';
import { BrazilZipCodeMaskInterface } from '@src/shared/applications/contracts/brazil-zip-code-mask.interface';
import ResultPaginationInterface from '@src/shared/applications/contracts/result-pagination.interface';
import MetadataUtils from '@src/shared/applications/utils/metadata.utils';
import { MASKS_UTILS } from '@src/shared/applications/utils/masks.utils';
import {
  LIST_USER_REPOSITORY_INTERFACE,
  type ListUserRepositoryInterface,
} from '@src/user/applications/contracts/list-user.repository-interface';
import type { ListUsersUseCaseInterface } from '@src/user/applications/contracts/list-users.use-case-interface';
import type { ResultListUserUseCaseInterface } from '@src/user/applications/contracts/result-list-user.use-case.interface';
import type { ListUsersQueryInterface } from '@src/user/applications/contracts/list-user-query.interface';
@Injectable()
export class ListUsersUseCase implements ListUsersUseCaseInterface {
  constructor(
    @Inject(LIST_USER_REPOSITORY_INTERFACE)
    private readonly listUserRepository: ListUserRepositoryInterface,
    @Inject(MASKS_UTILS)
    private readonly masksUtils: BrazilPersonIdentityDocumentMaskInterface &
      BrazilPersonSocialDocumentMaskInterface &
      BrazilPhoneMaskInterface &
      BrazilZipCodeMaskInterface,
    private readonly metadataUtils: MetadataUtils,
  ) {}

  async execute(
    filters: ListUsersQueryInterface,
  ): Promise<ResultListUserUseCaseInterface> {
    const {
      data: users,
      totalItems,
      currentPage,
      itemsPerPage,
    } = await this.listUserRepository.list(filters);

    if (users.length <= 0) {
      return {
        data: [],
        ...this.getEmptyMetadata(filters),
      };
    }

    const resultUSers = users.map((item) => {
      const documents = {
        ...(item.documents?.identityDocument && {
          identityDocument: this.masksUtils.brazilPersonIdentityDocumentMask(
            item.documents.identityDocument,
          ),
        }),
        ...(item.documents?.socialDocument && {
          socialDocument: this.masksUtils.brazilPersonSocialDocumentMask(
            item.documents.socialDocument,
          ),
        }),
        ...(item.documents?.otherDocumentt && {
          otherDocumentt: item.documents.otherDocumentt,
        }),
      };
      const details = {
        ...(item.details?.phone && {
          phone: this.masksUtils.brazilPhoneMask(item.details.phone),
        }),
        ...(item.details?.isWhatsapp !== undefined && {
          isWhatsapp: item.details.isWhatsapp,
        }),
        ...(item.details?.isTelegram !== undefined && {
          isTelegram: item.details.isTelegram,
        }),
        ...(item.details?.street && { street: item.details.street }),
        ...(item.details?.number && { number: item.details.number }),
        ...(item.details?.complement && {
          complement: item.details.complement,
        }),
        ...(item.details?.neighborhood && {
          neighborhood: item.details.neighborhood,
        }),
        ...(item.details?.city && { city: item.details.city }),
        ...(item.details?.state && { state: item.details.state }),
        ...(item.details?.country && { country: item.details.country }),
        ...(item.details?.zipCode && {
          zipCode: this.masksUtils.brazilZipCodeMask(item.details.zipCode),
        }),
      };
      const social = {
        ...(item.social?.facebook && { facebook: item.social.facebook }),
        ...(item.social?.x && { x: item.social.x }),
        ...(item.social?.instagram && { instagram: item.social.instagram }),
        ...(item.social?.linkedin && { linkedin: item.social.linkedin }),
        ...(item.social?.whatsapp && { whatsapp: item.social.whatsapp }),
        ...(item.social?.telegram && { telegram: item.social.telegram }),
      };

      return {
        id: item.id,
        isPaidMembership: item.isPaidMembership,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        birthday: item.birthday,
        role: item.role,
        status: item.status,
        documents,
        details,
        social,
      };
    });

    return {
      data: resultUSers,
      metadata: {
        pagination: this.metadataUtils.getDadosPaginacao(
          totalItems,
          resultUSers.length,
          itemsPerPage,
          currentPage,
          filters.route ?? '/user',
        ),
      },
    };
  }

  private getEmptyMetadata(data: ListUsersQueryInterface): {
    metadata: { pagination: ResultPaginationInterface };
  } {
    return {
      metadata: {
        pagination: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: Number(data.limit || 10),
          totalPages: 0,
          currentPage: Number(data.page || 1),
          links: {
            first: data.route ?? '/user',
            previous: '',
            next: '',
            last: '',
          },
        },
      },
    };
  }
}
