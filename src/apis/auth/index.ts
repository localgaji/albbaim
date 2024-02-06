import instance from 'apis/instance';
import { UserType } from 'types/user';

export const postsignup = (userInfo: SignupRequest): Promise<LoginResponse> => {
  return instance.post(`/auth/signUp/kakao`, userInfo);
};

export const postLogin = (body: LoginRequest): Promise<LoginResponse> => {
  return instance.post(`/auth/login/kakao`, body);
};

export interface SignupRequest {
  code: string;
  userName: string;
  isAdmin: boolean;
}

interface LoginRequest {
  code: string;
}

interface LoginResponse {
  token: string;
  isAdmin: boolean;
}

export const getMyInfo = (): Promise<GetMyInfoResponse> => {
  return instance.get(`/user`);
};
export interface GetMyInfoResponse {
  userName: string;
  userType: UserType;
}
