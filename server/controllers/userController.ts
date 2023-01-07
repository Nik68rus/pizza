import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { IUserData } from './../../client/src/types/user';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import ApiError from '../helpers/error';
import { isEmail } from '../helpers/validation';
import mailService from '../service/mail-service';
import tokenService from '../service/token-service';
import userService from '../service/user-service';

interface SigninRequest extends Request {
  body: IUserData;
}

class UserController {
  async postSignup(req: SigninRequest, res: Response, next: NextFunction) {
    const { email, name, password, password2 } = req.body;
    const normEmail = email.toLowerCase().trim();
    const normName = name.trim();
    const normPassword = password.trim();
    const normPassword2 = password2.trim();

    if (
      !isEmail(normEmail) ||
      normName.length < 3 ||
      normPassword.length < 5 ||
      normPassword !== normPassword2
    ) {
      return next(ApiError.validation('Введены некорректные данные!'));
    }

    try {
      const userData = await userService.signup(
        normEmail,
        normPassword,
        normName
      );
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      return next(
        ApiError.internal('Ошибка при работе с БД. Повторите позднее!')
      );
    }
  }

  async postLogin(req: Request, res: Response, next: NextFunction) {}

  async postLogout(req: Request, res: Response, next: NextFunction) {}

  async getActivate(req: Request, res: Response, next: NextFunction) {}

  async getRefresh(req: Request, res: Response, next: NextFunction) {}

  async getUsers(req: Request, res: Response, next: NextFunction) {
    res.json({ list: [1, 2, 3, 4], message: 'List of users' });
  }
}

export default new UserController();
