import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private _matchesService = new MatchesService()) {}

  public getAll = async (req: Request, res: Response) => {
    const { status, data } = await this._matchesService.getAll();
    return res.status(status).json(data);
  };

//   public getById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { status, data } = await this._matchesService.getById(Number(id));
//     return res.status(status).json(data);
//   };
}
