import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { IUserRegData } from './../../client/src/types/user';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import ApiError from '../helpers/error';
import { isEmail } from '../helpers/validation';
import mailService from '../service/mail-service';
import tokenService from '../service/token-service';
import userService from '../service/user-service';

interface SignupRequest extends Request {
  body: IUserRegData;
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface ExtendedRequest extends Request {
  cookies: {
    refreshToken: string;
  };
}

class UserController {
  async postSignup(req: SignupRequest, res: Response, next: NextFunction) {
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
      next(error);
    }
  }

  async postLogin(req: LoginRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async postLogout(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const success = await userService.logout(refreshToken);
      if (success) {
        res.clearCookie('refreshToken');
        return res.status(200).json('Logout success!');
      } else {
        return next(ApiError.internal('Что-то пошло не так!'));
      }
    } catch (error) {
      next(error);
    }
  }

  async getActivate(req: Request, res: Response, next: NextFunction) {
    try {
      const { link } = req.params;
      const user = await userService.activate(link);
      if (user) {
        res.redirect(
          `${process.env.APP_URL as string}/activation?success=${
            user.isActivated
          }&mail=${user.email}`
        );
      } else {
        res.redirect(
          `${process.env.APP_URL as string}/activation?success=false`
        );
      }
    } catch (error) {
      next(error);
    }
  }

  async getRefresh(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
