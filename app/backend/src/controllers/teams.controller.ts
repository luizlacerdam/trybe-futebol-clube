import { NextFunction, Request, Response } from 'express';
import { IUserController, ITeamsService } from '../interfaces/teams.interfaces';

export default class TeamsController implements IUserController {
  private _teamsService: ITeamsService;

  constructor(teamsService: ITeamsService) {
    this._teamsService = teamsService;
  }

  public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const data = await this._teamsService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const data = await this._teamsService.getById(Number(id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
