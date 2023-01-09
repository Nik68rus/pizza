import ApiError from '../helpers/error';
import { Request, Response, NextFunction } from 'express';

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  } else if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  } else if (typeof err === 'string') {
    return res.status(500).json({ message: err });
  }

  return res.status(500).json({ message: 'Неизвестная серверная ошибка!' });
}
