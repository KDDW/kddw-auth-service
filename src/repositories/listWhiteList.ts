import { Injectable } from '@nestjs/common';
import { WhiteList } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class ListWhiteListRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async list(): Promise<WhiteList[]> {
    return await this.prismaService.whiteList.findMany();
  }
}
