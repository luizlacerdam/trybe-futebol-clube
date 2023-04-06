import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { IUser } from '../services/interfaces/userInterface';

const tokenSecret:Secret = process.env.JWT_SECRET || 'secret';

const config: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGen = (payload: IUser) => jwt.sign(payload, tokenSecret, config);

export default tokenGen;
