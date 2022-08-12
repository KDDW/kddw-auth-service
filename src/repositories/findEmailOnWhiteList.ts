import { Injectable } from '@nestjs/common';
import { Prisma, WhiteList } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FindEmailOnWhiteList {
  constructor(private readonly prismaService: PrismaService) {}

  async findEmailOnWhiteList(
    id: Prisma.WhiteListWhereUniqueInput,
  ): Promise<WhiteList> {
    return await this.prismaService.whiteList.findUnique({ where: id });
  }
}
