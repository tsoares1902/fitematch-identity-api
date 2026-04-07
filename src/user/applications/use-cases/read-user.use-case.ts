import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  READ_USER_REPOSITORY_INTERFACE,
  type ReadUserRepositoryInterface,
} from '@src/user/applications/contracts/read-user.repository-interface';
import type { ReadUserUseCaseInterface } from '@src/user/applications/contracts/read-user.use-case-interface';
import { ResultReadUserUseCaseInterface } from '../contracts/result-read-user.use-case.interface';
import { BrazilPersonIdentityDocumentMaskInterface } from '@src/shared/applications/contracts/brazil-person-identity-document-mask.interface';
import { MASKS_UTILS } from '@src/shared/applications/utils/masks.utils';
import { BrazilPersonSocialDocumentMaskInterface } from '@src/shared/applications/contracts/brazil-person-social-document-mask.interface';
import { BrazilPhoneMaskInterface } from '@src/shared/applications/contracts/brazil-phone-mask.interface';
import { BrazilZipCodeMaskInterface } from '@src/shared/applications/contracts/brazil-zip-code-mask.interface';

@Injectable()
export class ReadUserUseCase implements ReadUserUseCaseInterface {
  constructor(
    @Inject(READ_USER_REPOSITORY_INTERFACE)
    private readonly readUserRepository: ReadUserRepositoryInterface,
    @Inject(MASKS_UTILS)
    private readonly masksUtils: BrazilPersonIdentityDocumentMaskInterface &
      BrazilPersonSocialDocumentMaskInterface &
      BrazilPhoneMaskInterface &
      BrazilZipCodeMaskInterface,
  ) {}

  async execute(id: string): Promise<ResultReadUserUseCaseInterface> {
    const user = await this.readUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return {
      data: {
        id: user.id,
        isPaidMembership: user.isPaidMembership,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        role: user.role,
        status: user.status,
        documents: {
          ...(user.documents?.identityDocument && {
            identityDocument: this.masksUtils.brazilPersonIdentityDocumentMask(
              user.documents.identityDocument,
            ),
          }),
          ...(user.documents?.socialDocument && {
            socialDocument: this.masksUtils.brazilPersonSocialDocumentMask(
              user.documents.socialDocument,
            ),
          }),
          ...(user.documents?.otherDocumentt && {
            otherDocumentt: user.documents.otherDocumentt,
          }),
        },
        details: {
          ...(user.details?.phone && {
            phone: this.masksUtils.brazilPhoneMask(user.details.phone),
          }),
          ...(user.details?.isWhatsapp !== undefined && {
            isWhatsapp: user.details.isWhatsapp,
          }),
          ...(user.details?.isTelegram !== undefined && {
            isTelegram: user.details.isTelegram,
          }),
          ...(user.details?.street && { street: user.details.street }),
          ...(user.details?.number && { number: user.details.number }),
          ...(user.details?.complement && {
            complement: user.details.complement,
          }),
          ...(user.details?.neighborhood && {
            neighborhood: user.details.neighborhood,
          }),
          ...(user.details?.city && { city: user.details.city }),
          ...(user.details?.state && { state: user.details.state }),
          ...(user.details?.country && { country: user.details.country }),
          ...(user.details?.zipCode && {
            zipCode: this.masksUtils.brazilZipCodeMask(user.details.zipCode),
          }),
        },
        social: {
          ...(user.social?.facebook && { facebook: user.social.facebook }),
          ...(user.social?.x && { x: user.social.x }),
          ...(user.social?.instagram && { instagram: user.social.instagram }),
          ...(user.social?.linkedin && { linkedin: user.social.linkedin }),
          ...(user.social?.whatsapp && { whatsapp: user.social.whatsapp }),
          ...(user.social?.telegram && { telegram: user.social.telegram }),
        },
      },
    };
  }
}
