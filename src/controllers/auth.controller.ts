import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, WhiteList } from '@prisma/client';
import axios, { AxiosInstance } from 'axios';
import { InsertOnWhiteListService } from 'services/insertInWhiteList.service';
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
    private readonly insertOnWhiteListService: InsertOnWhiteListService,
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

  @Post('/whitelist')
  @HttpCode(HttpStatus.CREATED)
  async insertInWhiteList(
    @Body() data: Prisma.WhiteListCreateInput,
  ): Promise<WhiteList> {
    return await this.insertOnWhiteListService.insert(data);
  }
}
