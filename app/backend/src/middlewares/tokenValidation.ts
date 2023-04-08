import { NextFunction, Request, Response } from 'express';
import { tokenValidation } from '../utils/tokenRelated';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = tokenValidation(token);
    console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
