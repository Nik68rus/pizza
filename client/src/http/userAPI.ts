import { IUser } from './../../../server/models/user';
import { IUserRegData, IUserAuthData, IUserLoginData } from './../types/user';
import { api } from '.';

export const createUser = async (userData: IUserRegData) => {
  const { email, name, password, password2 } = userData;
  const { data } = await api.post<IUserAuthData>('/user/signup', {
    email: email.toLowerCase().trim(),
    name: name.trim(),
    password: password.trim(),
    password2: password2.trim(),
  });
  return data;
};

export const loginUser = async (userData: IUserLoginData) => {
  const { email, password } = userData;
  const response = await api.post<IUserAuthData>('/user/login', {
    email: email.toLowerCase().trim(),
    password: password.trim(),
  });
  console.log(response);

  return response;
};

export const logoutUser = async () => {
  const { data } = await api.post<string>('/user/logout', null, {
    withCredentials: true,
  });
  return data;
};

export const fetchUsers = async () => {
  const { data } = await api.get<IUser[]>('/user/list');
  return data;
};
