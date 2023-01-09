export interface IUserRegData {
  email: string;
  name: string;
  password: string;
  password2: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserAuthData {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
