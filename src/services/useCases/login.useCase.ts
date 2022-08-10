import { LoginResponse } from 'src/dtos/login.response';

export interface LoginUseCase {
  login(): LoginResponse;
}
