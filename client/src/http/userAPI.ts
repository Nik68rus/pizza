import { IUserData } from './../types/user';
import { api } from '.';

interface ISignupPostResponse {
  payload: string;
}

export const createUser = async (userData: IUserData) => {
  const { email, name, password, password2 } = userData;
  const { data } = await api.post<ISignupPostResponse>('/user/signup', {
    email: email.toLowerCase().trim(),
    name: name.trim(),
    password: password.trim(),
    password2: password2.trim(),
  });
  return data.payload;
};
