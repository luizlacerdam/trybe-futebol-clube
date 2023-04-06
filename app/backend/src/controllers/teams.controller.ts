import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private _teamsSevice = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { status, data } = await this._teamsSevice.getAll();
    return res.status(status).json(data);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this._teamsSevice.getById(Number(id));
    return res.status(status).json(data);
  };
}
