import { Token } from './../models/user';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { IUserAuthData } from '../../client/src/types/user';
import ApiError from '../helpers/error';
import { User, IUser } from '../models/user';
import mailService from './mail-service';
import tokenService from './token-service';

class UserService {
  async generateUserData(user: IUser) {
    const tokens = tokenService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isActivated: user.isActivated,
    });

    await tokenService.saveTokens(user.id, tokens.refreshToken);

    const result: IUserAuthData = {
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isActivated: user.isActivated,
      ...tokens,
    };
    return result;
  }

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

    return this.generateUserData(user);
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
      return this.generateUserData(user);
    } else {
      throw ApiError.notAuthenticated('Неверное имя пользователя или пароль!');
    }
  }

  async logout(refreshToken: string) {
    const result = await tokenService.removeToken(refreshToken);
    return result;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.notAuthenticated('Пользователь не авторизован!');
    }

    const userData = await tokenService.validateRefereshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.notAuthenticated('Пользователь не авторизован');
    }

    const user = await User.findByPk(userData.id);
    if (user) {
      return this.generateUserData(user);
    } else {
      throw ApiError.notFound('Пользователь не найден!');
    }
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
}

export default new UserService();
