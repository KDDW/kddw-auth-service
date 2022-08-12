import { Prisma, User } from '@prisma/client';

export interface FindOneUserUseCase {
  findOneUser(id: Prisma.UserWhereUniqueInput): Promise<User>;
}
