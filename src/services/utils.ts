import { HttpException, HttpStatus } from '@nestjs/common';
import { WhiteList } from '@prisma/client';
import { AxiosInstance } from 'axios';
import { GithubUserData } from '../dtos/githubUserData';
import { WhiteListStatus } from '../utils/whiteList.utils';

export const getTokenFromTokenString = (tokenString: string): string => {
  const query = tokenString.split('=')[1];
  const [accessToken] = query.split('&');
  return accessToken;
};

export const getUserDataFromToken = async (
  api: AxiosInstance,
  token: string,
  githubApiUrl: string,
): Promise<GithubUserData> => {
  const { data } = await api.get(`${githubApiUrl}/user`, {
    headers: { Authorization: `token ${token}` },
  });
  return data;
};

export const checkIfUserCanAccess = (whiteListData: WhiteList) => {
  if (!whiteListData) {
    throw new HttpException(
      { error: 'User not found in white list.' },
      HttpStatus.UNAUTHORIZED,
    );
  }
  if (whiteListData.status === WhiteListStatus.BLOCKED) {
    throw new HttpException(
      { error: 'User is blocked.' },
      HttpStatus.UNAUTHORIZED,
    );
  }
};
