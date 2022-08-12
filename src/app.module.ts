import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { FindEmailOnWhiteList } from './repositories/findEmailOnWhiteList';
import { FindOneUserPrisma } from './repositories/findOneUser';
import { InsertOnWhiteListRepository } from './repositories/insertInWhiteList';
import { PrismaService } from './database/prisma.service';
import { GetTokenFromCodeService } from './services/getTokenFromCode.service';
import { LoginService } from './services/login.service';
import { InsertOnWhiteListService } from './services/insertInWhiteList.service';
import { WhiteListController } from './controllers/whitelist.controller';
import { RemoveFromWhiteListRepository } from './repositories/removeFromWhiteList';
import { RemoveFromWhiteListService } from './services/removeFromWhiteList.service';
import { ListWhiteListRepository } from './repositories/listWhiteList';
import { ListWhiteListService } from './services/listWhiteList.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController, WhiteListController],
  providers: [
    PrismaService,
    GetTokenFromCodeService,
    LoginService,
    FindOneUserPrisma,
    FindEmailOnWhiteList,
    InsertOnWhiteListRepository,
    InsertOnWhiteListService,
    RemoveFromWhiteListRepository,
    RemoveFromWhiteListService,
    ListWhiteListRepository,
    ListWhiteListService,
  ],
})
export class AppModule {}
