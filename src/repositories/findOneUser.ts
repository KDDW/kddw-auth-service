import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FindOneUserPrisma {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneUser(id: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUnique({ where: id });
  }
}
