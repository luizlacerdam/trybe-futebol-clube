import * as jwt from 'jsonwebtoken';
import { IUser } from '../services/interfaces/users.interfaces';

const tokenSecret:jwt.Secret = process.env.JWT_SECRET || 'vqvtrybe';

const config: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGen = (payload: IUser) => jwt.sign(payload, tokenSecret, config);

export default tokenGen;
