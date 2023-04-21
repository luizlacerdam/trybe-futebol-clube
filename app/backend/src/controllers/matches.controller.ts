import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../interfaces/matches.interfaces';

export default class MatchesController {
  private _matchesService: IMatchService;
  constructor(matchesService: IMatchService) {
    this._matchesService = matchesService;
  }

  public async getMatches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { inProgress } = req.query;

      if (inProgress === undefined) {
        const data = await this._matchesService.getAll();
        return res.status(200).json(data);
      }
      const data = await this._matchesService.getInProgress(inProgress === 'true');
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async finishMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const data = await this._matchesService.finishMatch(Number(id));
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async matcheUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const data = await this._matchesService.matchUpdate(
        { id: +id, homeTeamGoals, awayTeamGoals },
      );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async newMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const NewMatchObj = req.body;
      const data = await this._matchesService.newMatch(NewMatchObj);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
