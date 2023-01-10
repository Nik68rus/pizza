import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/error';
import tokenService from '../service/token-service';
import { ExtendedRequest } from '../types';

export default async function (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.notAuthenticated('Пользователь не авторизован!'));
    }

    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.notAuthenticated('Пользователь не авторизован!'));
    }

    const userData = await tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.notAuthenticated('Пользователь не авторизован!'));
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.notAuthenticated('Пользователь не авторизован!'));
  }
}
