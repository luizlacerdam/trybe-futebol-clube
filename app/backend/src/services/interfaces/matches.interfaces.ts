import Matches from '../../database/models/matches.model';
import { IService } from './service.interfaces';

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}

export interface IMatchService {
  getAll(): Promise<IService<Matches[]>>;
  getById(id: number): Promise<IService<Matches | null>>;
  getInProgress(inProgress: boolean): Promise<IService<Matches[]>>;
  finishMatch(id: number): Promise<IService<object>>;
}

export interface MatcheObj {
  id: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface NewMatchObj {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface NewMatchObjReturn extends NewMatchObj {
  id: number;
  inProgress: boolean;
}
