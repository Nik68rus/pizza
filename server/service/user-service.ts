import { Token } from './../models/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { IUserAuthData } from '../../client/src/types/user';
import ApiError from '../helpers/error';
import { User } from '../models/user';
import mailService from './mail-service';
import tokenService from './token-service';

class UserService {
  async signup(email: string, password: string, name: string) {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw ApiError.badRequest(
        'Пользователь с указанным e-mail уже существует!'
      );
    }

    const hashedPswd = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await User.create({
      email,
      name,
      password: hashedPswd,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );

    const tokens = tokenService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      isActivated: user.isActivated,
    });

    await tokenService.saveTokens(user.id, tokens.refreshToken);

    const result: IUserAuthData = {
      email: user.email,
      name: user.name,
      ...tokens,
    };
    return result;
  }

  async activate(activationLink: string) {
    const user = await User.findOne({ where: { activationLink } });

    if (!user) {
      throw ApiError.notFound('Аккаунт не найден!');
    }

    if (user.isActivated) {
      return null;
    }

    user.isActivated = true;

    return await user.save();
  }

  async login(email: string, password: string) {
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      throw ApiError.notFound('Аккаунт не найден!');
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (isMatching) {
      const tokens = tokenService.generateTokens({
        id: user.id,
        email: user.email,
        name: user.name,
        isActivated: user.isActivated,
      });

      await tokenService.saveTokens(user.id, tokens.refreshToken);

      const result: IUserAuthData = {
        email: user.email,
        name: user.name,
        ...tokens,
      };
      return result;
    } else {
      throw ApiError.notAuthenticated('Неверное имя пользователя или пароль!');
    }
  }

  async logout(refreshToken: string) {
    const result = await tokenService.removeToken(refreshToken);
    return result;
  }
}

export default new UserService();
