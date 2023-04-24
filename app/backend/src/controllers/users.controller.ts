import { NextFunction, Request, Response } from 'express';
import { IUsersService } from '../interfaces/users.interfaces';

export default class UsersController {
  private _usersService: IUsersService;
  constructor(userService: IUsersService) {
    this._usersService = userService;
  }

  public userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginObj = req.body;
      const data = await this._usersService.userLogin(loginObj);
      return res.status(200).json({ token: data });
    } catch (error) {
      next(error);
    }
  };

  public userRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { user } = req.body;
      if (authorization) {
        return res.status(200).json({ role: user.role });
      }
    } catch (error) {
      next(error);
    }
  };
}
