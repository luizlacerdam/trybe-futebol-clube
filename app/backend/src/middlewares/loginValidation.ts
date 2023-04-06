import { NextFunction, Request, Response } from 'express';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const emailValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const regex = /^\S+@\S+\.\S+$/;

  if (!email.match(regex) || !email) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }
  next();
};
export { loginValidation, emailValidation };
