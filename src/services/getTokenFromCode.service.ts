import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { FindEmailOnWhiteList } from '../repositories/findEmailOnWhiteList';
import { FindOneUserPrisma } from '../repositories/findOneUser';
import { GetTokenFromCodeResponse } from '../dtos/getTokenFromCode.response';
import {
  getTokenFromTokenString,
  getUserDataFromToken,
  checkIfUserCanAccess,
} from './utils';

@Injectable()
export class GetTokenFromCodeService {
  private api: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private githubBaseUrl = 'https://github.com';
  private githubApiUrl = 'https://api.github.com';

  constructor(
    private readonly configService: ConfigService,
    private readonly findOneUserPrisma: FindOneUserPrisma,
    private readonly findEmailOnWhiteList: FindEmailOnWhiteList,
  ) {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.clientId = this.configService.get('GITHUB_CLIENT_ID');
    this.clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');
    this.redirectUri = this.configService.get('GITHUB_REDIRECT_URI');
  }

  async getTokenFromCode(code: string): Promise<GetTokenFromCodeResponse> {
    try {
      const { data: tokenString } = await this.api.post<string>(
        `${this.githubBaseUrl}/login/oauth/access_token`,
        {},
        {
          params: {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            code: code,
            scopes: ['user:email', 'read:user'].join(' '),
          },
        },
      );
      const token = getTokenFromTokenString(tokenString);
      const user = await getUserDataFromToken(
        this.api,
        token,
        this.githubApiUrl,
      );
      const { email } = user;
      const whiteListData =
        await this.findEmailOnWhiteList.findEmailOnWhiteList({
          email,
        });

      checkIfUserCanAccess(whiteListData);
      return { token, user };
    } catch (e) {
      if (e.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException(e.response, e.status);
      }
      throw new HttpException(
        { error: 'Something went wrong in github request' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
