import { Request, Response } from 'express';
import UsersService from '../services/users.service';

export default class UsersController {
  constructor(private _usersService = new UsersService()) {}
  public userLogin = async (req: Request, res: Response) => {
    const loginObj = req.body;
    const { status, data } = await this._usersService.userLogin(loginObj);
    return res.status(status).json({ token: data });
  };
}