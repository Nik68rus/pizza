import bcrypt from 'bcrypt';
import uuid from 'uuid';
import { User } from '../models/user';
import mailService from './mail-service';
import tokenService from './token-service';

class UserService {
  async signup(email: string, password: string, name: string) {
    console.log('signup');

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('Пользователь с указанным e-mail уже существует!');
    }

    const hashedPswd = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      email,
      name,
      password: hashedPswd,
      activationLink,
    });

    await mailService.sendActivationMail(email, activationLink);

    const tokens = tokenService.generateTokens({
      email: user.email,
      name: user.name,
    });

    await tokenService.saveTokens(user.id, tokens.refreshToken);

    return { email: user.email, name: user.name, ...tokens };
  }
}

export default new UserService();
