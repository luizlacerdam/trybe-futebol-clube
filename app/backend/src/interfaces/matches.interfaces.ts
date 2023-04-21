import Matches from '../database/models/matches.model';

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: { teamName: string };
  awayTeam?: { teamName: string };
}

export interface IMatchService {
  getAll(): Promise<Matches[]>;
  getInProgress(inProgress: boolean): Promise<Matches[]>;
  finishMatch(id: number): Promise<void>;
  matchUpdate(matcheObj: MatcheObj): Promise<void>;
  newMatch(matcheObj: NewMatchObj): Promise<NewMatchObjReturn | object>
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
