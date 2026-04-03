import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LOGIN_REPOSITORY,
  type LoginRepositoryInterface,
} from '@src/auth/applications/contracts/login.repository-interface';
import {
  type LoginRequest,
  type LoginResponse,
  type LoginUseCaseInterface,
} from '@src/auth/applications/contracts/login.use-case-interface';
import type { UserAgentInterface } from '@src/auth/applications/contracts/login.repository-interface';
import EncryptUtils from '@src/shared/applications/utils/encrypt.utils';

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly loginRepository: LoginRepositoryInterface,
    private readonly encryptUtils: EncryptUtils,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginRequest): Promise<LoginResponse> {
    const user = await this.loginRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const passwordMatches = await this.encryptUtils.comparePassword(
      data.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('invalid credentials');
    }

    const createdAt = new Date();
    const sessionId = `${user.id}-${Date.now()}`;
    const client = this.normalizeClient(data.client);

    await this.loginRepository.createSession({
      userId: user.id,
      sessionId,
      client,
      active: true,
      createdAt,
      startedAt: createdAt,
    });

    const payload = {
      sub: user.id,
      sessionId,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tokenVersion: user.tokenVersion,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private normalizeClient(
    client?: LoginRequest['client'],
  ): UserAgentInterface | undefined {
    if (!client) {
      return undefined;
    }

    const normalizedClient = Object.fromEntries(
      Object.entries(client).filter(([, value]) => value !== undefined),
    ) as UserAgentInterface;

    return Object.keys(normalizedClient).length > 0
      ? normalizedClient
      : undefined;
  }
}
