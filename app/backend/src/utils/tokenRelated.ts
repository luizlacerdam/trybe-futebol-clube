import * as jwt from 'jsonwebtoken';
import { IUser } from '../services/interfaces/users.interfaces';

const tokenSecret:jwt.Secret = process.env.JWT_SECRET || 'vqvtrybe';

const config: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGen = (payload: Omit<IUser, 'password'>) => jwt.sign(payload, tokenSecret, config);

const tokenValidation = (token: string) => jwt.verify(token, tokenSecret);

export { tokenGen, tokenValidation };
