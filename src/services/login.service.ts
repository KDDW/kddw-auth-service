import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from '../dtos/login.response';

@Injectable()
export class LoginService {
  constructor(private readonly configService: ConfigService) {}

  login(): LoginResponse {
    const baseUrl = this.configService.get('GITHUB_BASE_URL');
    const clientId = this.configService.get('GITHUB_CLIENT_ID');
    const scopes = 'user:email read:user';
    return {
      url: `${baseUrl}/login/oauth/authorize?client_id=${clientId}&scopes=${scopes}`,
    };
  }
}
