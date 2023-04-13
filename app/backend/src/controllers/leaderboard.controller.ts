import { Request, Response } from 'express';
import LeadboardService from '../services/leaderboard.service';

export default class LeadboardController {
  constructor(private _leaderboardService = new LeadboardService()) {}

  public getTeamsPerfomanceHome = async (req: Request, res: Response) => {
    const { status, data } = await this._leaderboardService.getTeamsPerfomanceHome();
    return res.status(status).json(data);
  };

  public getTeamsPerfomanceAway = async (req: Request, res: Response) => {
    const { status, data } = await this._leaderboardService.getTeamsPerfomanceAway();
    return res.status(status).json(data);
  };

  public getTeamsPerfomanceGeral = async (req: Request, res: Response) => {
    const { status, data } = await this._leaderboardService.getTeamsPerfomanceGeral();
    return res.status(status).json(data);
  };
}
