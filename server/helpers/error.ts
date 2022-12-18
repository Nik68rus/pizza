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

export default ApiError;