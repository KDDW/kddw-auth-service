import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WhiteList } from '@prisma/client';
import { ListWhiteListRepository } from 'repositories/listWhiteList';

@Injectable()
export class ListWhiteListService {
  constructor(
    private readonly configService: ConfigService,
    private readonly listWhiteListRepository: ListWhiteListRepository,
  ) {}

  async list(): Promise<WhiteList[]> {
    return await this.listWhiteListRepository.list();
  }
}
