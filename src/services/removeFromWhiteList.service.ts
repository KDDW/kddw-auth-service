import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, WhiteList } from '@prisma/client';
import { RemoveFromWhiteListRepository } from 'repositories/removeFromWhiteList';

@Injectable()
export class RemoveFromWhiteListService {
  constructor(
    private readonly configService: ConfigService,
    private readonly removeFromWhiteListRepository: RemoveFromWhiteListRepository,
  ) {}

  async remove({
    email,
  }: Prisma.WhiteListWhereUniqueInput): Promise<WhiteList> {
    try {
      return await this.removeFromWhiteListRepository.remove({
        email,
      });
    } catch (e) {
      throw new HttpException({ error: 'Email not found' }, 404);
    }
  }
}
