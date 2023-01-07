import jwt from 'jsonwebtoken';
import { Token } from '../models/user';

interface TokenPayload {
  email: string;
  name: string;
}

class TokenService {
  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '30m',
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: '30d',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokens(userId: number, refreshToken: string) {
    const existingToken = await Token.findOne({ where: { userId } });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      return existingToken.save();
    }

    const token = await Token.create({ userId, refreshToken });
    return token;
  }
}

export default new TokenService();
