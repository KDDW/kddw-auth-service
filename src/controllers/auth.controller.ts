import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { GetTokenFromCodeResponse } from '../dtos/getTokenFromCode.response';
import { LoginResponse } from '../dtos/login.response';
import { GetTokenFromCodeService } from '../services/getTokenFromCode.service';
import { LoginService } from '../services/login.service';

@Controller('authorize')
export class AuthController {
  private api: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly loginService: LoginService,
    private readonly getTokenFromCodeService: GetTokenFromCodeService,
  ) {
    this.api = axios.create({
      baseURL: 'https://github.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  @Get('/login')
  @HttpCode(HttpStatus.OK)
  login(): LoginResponse {
    return this.loginService.login();
  }

  @Get('/token')
  @HttpCode(HttpStatus.OK)
  async getTokenFromCode(
    @Query('code') code: string,
  ): Promise<GetTokenFromCodeResponse> {
    return await this.getTokenFromCodeService.getTokenFromCode(code);
  }
}
