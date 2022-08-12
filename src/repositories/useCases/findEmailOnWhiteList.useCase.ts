import { Prisma, WhiteList } from '@prisma/client';

export interface FindEmailOnWhiteListUseCase {
  findEmailOnWhiteList(
    id: Prisma.WhiteListWhereUniqueInput,
  ): Promise<WhiteList>;
}
