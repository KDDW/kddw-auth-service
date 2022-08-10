import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { GetTokenFromCodeResponse } from '../dtos/getTokenFromCode.response';
import { GetTokenFromCodeUseCase } from './useCases/getTokenFromCode.useCase';

@Injectable()
export class GetTokenFromCodeService implements GetTokenFromCodeUseCase {
  private api: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.api = axios.create({
      baseURL: 'https://github.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getTokenFromCode(code: string): Promise<GetTokenFromCodeResponse> {
    const clientId = this.configService.get('GITHUB_CLIENT_ID');
    const secret = this.configService.get('GITHUB_CLIENT_SECRET');

    try {
      const { data } = await this.api.post(
        '/login/oauth/access_token',
        {},
        {
          params: {
            client_id: clientId,
            client_secret: secret,
            code: code,
          },
        },
      );
      const query = data.split('=')[1];
      const [accessToken] = query.split('&');
      return { token: accessToken };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Something went wrong in github request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
