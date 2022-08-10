import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { GetTokenFromCodeService } from './services/getTokenFromCode.service';
import { LoginService } from './services/login.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController],
  providers: [GetTokenFromCodeService, LoginService],
})
export class AppModule {}
