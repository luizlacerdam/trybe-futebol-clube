import { Request, Response } from 'express';
import LeadboardService from '../services/leaderboard.service';

export default class LeadboardController {
  constructor(private _leaderboardService = new LeadboardService()) {}

  public getTeamsPerfomance = async (req: Request, res: Response) => {
    const { status, data } = await this._leaderboardService.getTeamsPerfomance();
    return res.status(status).json(data);
  };
}
