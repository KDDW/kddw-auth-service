import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { WhiteList } from '@prisma/client';
import { WhiteListCreateDTO } from 'dtos/WhiteListCreateDto';
import { WhiteListRemoveDTO } from 'dtos/WhiteListRemoveDto';
import { FindEmailOnWhiteList } from 'repositories/findEmailOnWhiteList';
import { InsertOnWhiteListService } from 'services/insertInWhiteList.service';
import { ListWhiteListService } from 'services/listWhiteList.service';
import { RemoveFromWhiteListService } from 'services/removeFromWhiteList.service';

@Controller('whitelist')
export class WhiteListController {
  constructor(
    private readonly insertOnWhiteListService: InsertOnWhiteListService,
    private readonly removeFromWhiteListService: RemoveFromWhiteListService,
    private readonly findEmailOnWhiteList: FindEmailOnWhiteList,
    private readonly listWhiteListService: ListWhiteListService,
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async insertInWhiteList(
    @Body() data: WhiteListCreateDTO,
  ): Promise<WhiteList> {
    return await this.insertOnWhiteListService.insert(data);
  }

  @Delete('')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromWhiteList(@Body() data: WhiteListRemoveDTO): Promise<void> {
    await this.removeFromWhiteListService.remove(data);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async listWhiteList(): Promise<WhiteList[]> {
    return await this.listWhiteListService.list();
  }

  @Get('/:email')
  @HttpCode(HttpStatus.OK)
  async findOneInWhiteList(@Param('email') email: string): Promise<WhiteList> {
    const res = await this.findEmailOnWhiteList.findEmailOnWhiteList({ email });
    if (!res) {
      throw new HttpException({ error: 'Email not found' }, 404);
    }
    return res;
  }
}
