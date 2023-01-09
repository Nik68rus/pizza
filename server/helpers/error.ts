import { NextFunction } from 'express';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static notAuthenticated(message: string) {
    return new ApiError(401, message);
  }

  static notAuthorized(message: string) {
    return new ApiError(403, message);
  }

  static notFound(message: string) {
    return new ApiError(404, message);
  }

  static validation(message: string) {
    return new ApiError(422, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}

export const handleError = (error: any, next: NextFunction) => {
  console.log(error);
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Ошибка сервера. Повторите позднее!';
  }

  return next(ApiError.internal(message));
};

export default ApiError;
