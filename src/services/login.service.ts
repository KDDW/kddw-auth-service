import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from 'src/dtos/login.response';
import { LoginUseCase } from './useCases/login.useCase';

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(private readonly configService: ConfigService) {}

  login(): LoginResponse {
    const baseUrl = this.configService.get('GITHUB_BASE_URL');
    const clientId = this.configService.get('GITHUB_CLIENT_ID');
    return { url: `${baseUrl}/login/oauth/authorize?client_id=${clientId}` };
  }
}
