import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, WhiteList } from '@prisma/client';
import { FindEmailOnWhiteList } from 'repositories/findEmailOnWhiteList';
import { InsertOnWhiteListRepository } from 'repositories/insertInWhiteList';

@Injectable()
export class InsertOnWhiteListService {
  constructor(
    private readonly configService: ConfigService,
    private readonly findEmailOnWhiteList: FindEmailOnWhiteList,
    private readonly insertOnWhiteListRepository: InsertOnWhiteListRepository,
  ) {}

  async insert({ email }: Prisma.WhiteListCreateInput): Promise<WhiteList> {
    const emailExists = await this.findEmailOnWhiteList.findEmailOnWhiteList({
      email,
    });
    if (!emailExists)
      return await this.insertOnWhiteListRepository.insert({
        email,
        invitedBy: 'system',
      });
    throw new HttpException({ error: 'Email already in whitelist' }, 409);
  }
}
