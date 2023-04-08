import { NextFunction, Request, Response } from 'express';
import { tokenValidation } from '../utils/tokenRelated';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = tokenValidation(token);
    // const user = await UserService.getById(decoded.data.userId);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
