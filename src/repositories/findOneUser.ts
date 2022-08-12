import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../services/database/prisma.service';
import { FindOneUserUseCase } from './useCases/findOneUser.useCase';

@Injectable()
export class FindOneUserPrisma implements FindOneUserUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneUser(id: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUnique({ where: id });
  }
}
