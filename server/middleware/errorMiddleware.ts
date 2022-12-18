import ApiError from '../helpers/error';
import { Request, Response, NextFunction } from 'express';

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.message);
  }

  return res.status(500).json('Неизвестная серверная ошибка!');
}
