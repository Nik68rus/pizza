import { TokenPayload } from './../service/token-service';
import { Request } from 'express';

export type TBaseType = 'традиционное' | 'тонкое';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ExtendedRequest extends Request {
  user?: TokenPayload;
}
