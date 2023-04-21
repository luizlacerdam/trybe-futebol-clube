import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import { IUserController } from '../interfaces/teams.interfaces';

export default class TeamsController implements IUserController {
  constructor(private _teamsSevice = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const data = await this._teamsSevice.getAll();
    return res.status(200).json(data);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this._teamsSevice.getById(Number(id));
    return res.status(201).json(data);
  };
}
