import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { LoginResponse } from '../dtos/login.response';
import { GetTokenFromCodeService } from '../services/getTokenFromCode.service';
import { LoginService } from '../services/login.service';

describe('AuthController', () => {
  let controller: AuthController;
  let loginService: LoginService;
  let getTokenFromCodeService: GetTokenFromCodeService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AuthController],
      providers: [LoginService, GetTokenFromCodeService],
    }).compile();

    loginService = moduleRef.get<LoginService>(LoginService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    getTokenFromCodeService = moduleRef.get<GetTokenFromCodeService>(
      GetTokenFromCodeService,
    );
    controller = moduleRef.get<AuthController>(AuthController);
  });

  describe('/authorize/login', () => {
    it('Must return the github URL when GET', async () => {
      const result: LoginResponse = {
        url: `https://github.com/login/oauth/authorize?client_id=${configService.get(
          'GITHUB_CLIENT_ID',
        )}`,
      };

      expect(await controller.login()).toMatchObject(result);
    });
  });
});
