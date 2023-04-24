import { NextFunction, Request, Response } from 'express';

export interface ITeamObj {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}
export interface ILeader extends ITeamObj {
  goalsBalance: number;
  efficiency: string;
}

export interface ILeaderboardService {
  // teamObjFunc(): ITeamObj;
  // homeTeamCounter(team: ITeam, matchesArr: IMatch[]): ILeader;
  // teamEfficiency(points: number, matches: number): string;
  // ArrSorting(arr: ILeader[]): ILeader[];
  // awayTeamCounter(team: ITeam, matchesArr: IMatch[]): ILeader;
  getTeamsPerfomanceHome(): Promise<ILeader[]>;
  getTeamsPerfomanceAway(): Promise<ILeader[]>;
  getTeamsPerfomanceGeral(): Promise<ILeader[]>;
  // geralTeamCounter(): ILeader;

}

export interface ILeaderboardController {
  getTeamsPerfomanceHome(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getTeamsPerfomanceAway(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getTeamsPerfomanceGeral(req:
  Request, res: Response, next: NextFunction): Promise<Response | void>;
}
