import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { FindEmailOnWhiteList } from './repositories/findEmailOnWhiteList';
import { FindOneUserPrisma } from './repositories/findOneUser';
import { PrismaService } from './services/database/prisma.service';
import { GetTokenFromCodeService } from './services/getTokenFromCode.service';
import { LoginService } from './services/login.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController],
  providers: [
    PrismaService,
    GetTokenFromCodeService,
    LoginService,
    FindOneUserPrisma,
    FindEmailOnWhiteList,
  ],
})
export class AppModule {}
