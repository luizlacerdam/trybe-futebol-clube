import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import { ILeader, ILeaderboardService, ITeamObj } from '../interfaces/leaderboard.interfaces';
import { ITeam } from '../interfaces/teams.interfaces';
import { IMatch } from '../interfaces/matches.interfaces';

export default class LeadboardService implements ILeaderboardService {
  private _matchesModel: ModelStatic<MatchesModel>;
  private _teamsModel: ModelStatic<TeamsModel>;

  constructor(matchesModel: ModelStatic<MatchesModel>, teamsModel: ModelStatic<TeamsModel>) {
    this._matchesModel = matchesModel;
    this._teamsModel = teamsModel;
  }

  static teamObjFunc(): ITeamObj {
    const teamObj = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };
    return teamObj;
  }

  static homeTeamCounter(team: ITeam, matchesArr: IMatch[]): ILeader {
    const teamObj = LeadboardService.teamObjFunc() as ILeader;
    teamObj.name = team.teamName;
    matchesArr.forEach((match: IMatch) => {
      if (team.id === match.homeTeamId) {
        teamObj.totalGames += 1;
        teamObj.goalsFavor += match.homeTeamGoals;
        teamObj.goalsOwn += match.awayTeamGoals;
        teamObj.goalsBalance = teamObj.goalsFavor - teamObj.goalsOwn;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          teamObj.totalVictories += 1; teamObj.totalPoints += 3;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          teamObj.totalLosses += 1;
        } else {
          teamObj.totalDraws += 1; teamObj.totalPoints += 1;
        }
      }
    });
    return teamObj;
  }

  static teamEfficiency(points: number, matches: number):string {
    const efficiency = ((points / (matches * 3)) * 100);
    return `${efficiency.toFixed(2)}`;
  }

  static ArrSorting = (arr: ILeader[]): ILeader[] => arr.sort((b, a) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance === b.goalsBalance) {
        return a.goalsFavor - b.goalsFavor;
      } return a.goalsBalance - b.goalsBalance;
    }
    return a.totalPoints - b.totalPoints;
  });

  static awayTeamCounter(team: ITeam, matchesArr: IMatch[]): ILeader {
    const teamObj = LeadboardService.teamObjFunc() as ILeader;
    teamObj.name = team.teamName;
    matchesArr.forEach((match: IMatch) => {
      if (team.id === match.awayTeamId) {
        teamObj.totalGames += 1;
        teamObj.goalsFavor += match.awayTeamGoals;
        teamObj.goalsOwn += match.homeTeamGoals;
        teamObj.goalsBalance = teamObj.goalsFavor - teamObj.goalsOwn;
        if (match.awayTeamGoals > match.homeTeamGoals) {
          teamObj.totalVictories += 1; teamObj.totalPoints += 3;
        } else if (match.awayTeamGoals < match.homeTeamGoals) {
          teamObj.totalLosses += 1;
        } else {
          teamObj.totalDraws += 1; teamObj.totalPoints += 1;
        }
      }
    });
    return teamObj;
  }

  public async getTeamsPerfomanceHome(): Promise<ILeader[]> {
    const teamsArr = await this._teamsModel.findAll();
    const matchesArr = await this._matchesModel.findAll({ where: { inProgress: false } });
    const dataArr: ILeader[] = [];
    teamsArr.forEach((team) => {
      const teamObj = LeadboardService.homeTeamCounter(team, matchesArr);
      teamObj.efficiency = LeadboardService.teamEfficiency(teamObj.totalPoints, teamObj.totalGames);
      dataArr.push(teamObj);
    });
    const data = LeadboardService.ArrSorting(dataArr);
    return data; // 200
  }

  public async getTeamsPerfomanceAway(): Promise<ILeader[]> {
    const teamsArr = await this._teamsModel.findAll();
    const matchesArr = await this._matchesModel.findAll({ where: { inProgress: false } });
    const dataArr: ILeader[] = [];
    teamsArr.forEach((team) => {
      const teamObj = LeadboardService.awayTeamCounter(team, matchesArr);
      teamObj.efficiency = LeadboardService.teamEfficiency(teamObj.totalPoints, teamObj.totalGames);
      dataArr.push(teamObj);
    });
    const data = LeadboardService.ArrSorting(dataArr);
    return data; // 200
  }

  public async getTeamsPerfomanceGeral(): Promise<ILeader[]> {
    const teamsArr = await this._teamsModel.findAll();
    const matchesArr = await this._matchesModel.findAll({ where: { inProgress: false } });
    const dataArr: ILeader[] = [];
    teamsArr.forEach((team) => {
      const teamObj = LeadboardService.geralTeamCounter(team, matchesArr);
      teamObj.efficiency = LeadboardService.teamEfficiency(teamObj.totalPoints, teamObj.totalGames);
      dataArr.push(teamObj);
    });
    const data = LeadboardService.ArrSorting(dataArr);
    return data;
  }

  static geralTeamCounter(team: ITeam, matchesArr: IMatch[]): ILeader {
    const teamObjHome = LeadboardService.homeTeamCounter(team, matchesArr);
    const teamObjAway = LeadboardService.awayTeamCounter(team, matchesArr);
    const teamObj = LeadboardService.teamObjFunc() as ILeader;

    teamObj.name = team.teamName;
    teamObj.totalPoints = teamObjHome.totalPoints + teamObjAway.totalPoints;
    teamObj.totalGames = teamObjHome.totalGames + teamObjAway.totalGames;
    teamObj.totalVictories = teamObjHome.totalVictories + teamObjAway.totalVictories;
    teamObj.totalDraws = teamObjHome.totalDraws + teamObjAway.totalDraws;
    teamObj.totalLosses = teamObjHome.totalLosses + teamObjAway.totalLosses;
    teamObj.goalsFavor = teamObjHome.goalsFavor + teamObjAway.goalsFavor;
    teamObj.goalsOwn = teamObjHome.goalsOwn + teamObjAway.goalsOwn;
    teamObj.goalsBalance = (teamObj.goalsFavor - teamObj.goalsOwn);

    return teamObj;
  }
}
