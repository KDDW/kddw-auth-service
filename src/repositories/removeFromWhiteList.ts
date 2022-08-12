import { Injectable } from '@nestjs/common';
import { Prisma, WhiteList } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class RemoveFromWhiteListRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async remove(data: Prisma.WhiteListWhereUniqueInput): Promise<WhiteList> {
    return await this.prismaService.whiteList.delete({
      where: data,
    });
  }
}
