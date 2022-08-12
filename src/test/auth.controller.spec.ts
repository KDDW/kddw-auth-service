import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { FindEmailOnWhiteList } from '../repositories/findEmailOnWhiteList';
import { AuthController } from '../controllers/auth.controller';
import { LoginResponse } from '../dtos/login.response';
import { GetTokenFromCodeService } from '../services/getTokenFromCode.service';
import { LoginService } from '../services/login.service';
import { FindOneUserPrisma } from '../repositories/findOneUser';
import { PrismaService } from '../database/prisma.service';
import { InsertOnWhiteListRepository } from 'repositories/insertInWhiteList';
import { InsertOnWhiteListService } from 'services/insertInWhiteList.service';
import { RemoveFromWhiteListRepository } from 'repositories/removeFromWhiteList';
import { RemoveFromWhiteListService } from 'services/removeFromWhiteList.service';
import { ListWhiteListRepository } from 'repositories/listWhiteList';
import { ListWhiteListService } from 'services/listWhiteList.service';

describe('AuthController', () => {
  let controller: AuthController;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AuthController],
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
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
    controller = moduleRef.get<AuthController>(AuthController);
  });

  describe('/authorize/login', () => {
    it('Must return the github URL when GET', async () => {
      const result: LoginResponse = {
        url: `https://github.com/login/oauth/authorize?client_id=${configService.get(
          'GITHUB_CLIENT_ID',
        )}&scopes=${['user:email', 'read:user'].join(' ')}`,
      };

      expect(await controller.login()).toMatchObject(result);
    });
  });
});
