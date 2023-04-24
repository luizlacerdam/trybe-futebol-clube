import { NextFunction, Request, Response } from 'express';
import { ILeaderboardController, ILeaderboardService } from '../interfaces/leaderboard.interfaces';

export default class LeadboardController implements ILeaderboardController {
  private _leaderboardService:ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public getTeamsPerfomanceHome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._leaderboardService.getTeamsPerfomanceHome();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getTeamsPerfomanceAway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._leaderboardService.getTeamsPerfomanceAway();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  public getTeamsPerfomanceGeral = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._leaderboardService.getTeamsPerfomanceGeral();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
