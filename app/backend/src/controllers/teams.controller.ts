import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private _teamsSevice = new TeamsService()) {}

  public getAll = async (req: Request, res: Response) => {
    const teamsArr = await this._teamsSevice.getAll();
    return res.status(200).json(teamsArr);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._teamsSevice.getById(Number(id));
    return res.status(200).json(team);
  };
}
