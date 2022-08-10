import { GetTokenFromCodeResponse } from 'src/dtos/getTokenFromCode.response';

export interface GetTokenFromCodeUseCase {
  getTokenFromCode(code: string): Promise<GetTokenFromCodeResponse>;
}
