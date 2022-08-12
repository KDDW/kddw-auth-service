import { Injectable } from '@nestjs/common';
import { Prisma, WhiteList } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class InsertOnWhiteListRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async insert(data: Prisma.WhiteListCreateInput): Promise<WhiteList> {
    return await this.prismaService.whiteList.create({ data });
  }
}
