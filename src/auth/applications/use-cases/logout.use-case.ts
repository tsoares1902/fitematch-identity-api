import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  type LoginRepositoryInterface,
  LOGIN_REPOSITORY,
} from '@src/auth/applications/contracts/login.repository-interface';
import {
  type LogoutRequest,
  type LogoutResponse,
  type LogoutUseCaseInterface,
} from '@src/auth/applications/contracts/logout.use-case-interface';

interface AuthTokenPayload {
  sub: string;
  sessionId?: string;
  tokenVersion?: number;
}

@Injectable()
export class LogoutUseCase implements LogoutUseCaseInterface {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly loginRepository: LoginRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LogoutRequest): Promise<LogoutResponse> {
    const endedAt = new Date();
    const token = this.extractBearerToken(data.authorization);
    const payload = await this.verifyToken(token);
    const user = await this.loginRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('invalid token');
    }

    if (payload.tokenVersion !== user.tokenVersion) {
      throw new UnauthorizedException('token already invalidated');
    }

    if (!payload.sessionId) {
      throw new UnauthorizedException('invalid token');
    }

    const sessionWasClosed = await this.loginRepository.deactivateSession(
      user.id,
      payload.sessionId,
      endedAt,
    );

    if (!sessionWasClosed) {
      throw new UnauthorizedException('active session not found');
    }

    await this.loginRepository.incrementTokenVersion(user.id);

    return { success: true };
  }

  private extractBearerToken(authorization?: string): string {
    if (!authorization) {
      throw new UnauthorizedException('authorization header is required');
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('invalid authorization header');
    }

    return token;
  }

  private async verifyToken(token: string): Promise<AuthTokenPayload> {
    try {
      const payload: unknown = await this.jwtService.verifyAsync(token);

      if (!this.isAuthTokenPayload(payload)) {
        throw new UnauthorizedException('invalid token');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('invalid token');
    }
  }

  private isAuthTokenPayload(payload: unknown): payload is AuthTokenPayload {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const candidate = payload as Record<string, unknown>;

    return (
      typeof candidate.sub === 'string' &&
      (candidate.sessionId === undefined ||
        typeof candidate.sessionId === 'string') &&
      (candidate.tokenVersion === undefined ||
        typeof candidate.tokenVersion === 'number')
    );
  }
}
