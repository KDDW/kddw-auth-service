import { Injectable } from '@nestjs/common';
import { Prisma, WhiteList } from '@prisma/client';
import { PrismaService } from 'src/services/database/prisma.service';
import { FindEmailOnWhiteListUseCase } from './useCases/findEmailOnWhiteList.useCase';

@Injectable()
export class FindEmailOnWhiteList implements FindEmailOnWhiteListUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async findEmailOnWhiteList(
    id: Prisma.WhiteListWhereUniqueInput,
  ): Promise<WhiteList> {
    return await this.prismaService.whiteList.findUnique({ where: id });
  }
}
