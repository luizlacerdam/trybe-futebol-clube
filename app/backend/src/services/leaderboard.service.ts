import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import ILeader from './interfaces/leaderboard.interfaces';
import { ITeam } from './interfaces/teams.interfaces';
import { IMatch } from './interfaces/matches.interfaces';

export default class LeadboardService {
  protected model: ModelStatic<Matches> = Matches;

  static teamObjFunc() {
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

  static homeTeamCounter(team: ITeam, matchesArr: IMatch[]) {
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

  static teamEfficiency(points: number, matches: number) {
    const efficiency = ((points / (matches * 3)) * 100);
    return `${efficiency.toFixed(2)}`;
  }

  static ArrSorting = (arr: ILeader[]) => arr.sort((b, a) => {
    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance === b.goalsBalance) {
        return a.goalsFavor - b.goalsFavor;
      } return a.goalsBalance - b.goalsBalance;
    }
    return a.totalPoints - b.totalPoints;
  });

  //   static awayTeamCounter(team: ITeam, matchesArr: IMatch[], data: ILeader[]) {
  //     const teamObj = LeadboardService.teamObjFunc() as ILeader;
  //     teamObj.name = team.teamName;
  //     matchesArr.forEach((match: IMatch) => {
  //       if (team.id === match.awayTeamId) {
  //         teamObj.totalGames += 1;
  //         teamObj.goalsFavor += match.awayTeamGoals;
  //         teamObj.goalsOwn += match.homeTeamGoals;
  //         if (match.awayTeamGoals > match.homeTeamGoals) {
  //           teamObj.totalVictories += 1;
  //           teamObj.totalPoints += 3;
  //         } else if (match.awayTeamGoals < match.homeTeamGoals) {
  //           teamObj.totalLosses += 1;
  //         } else {
  //           teamObj.totalDraws += 1; teamObj.totalPoints += 1;
  //         }
  //       }
  //     });
  //     data.push(teamObj);
  //   }

  public async getTeamsPerfomance() {
    const teamsArr = await Teams.findAll();
    const matchesArr = await this.model.findAll({ where: { inProgress: false } });
    const dataArr: ILeader[] = [];
    teamsArr.forEach((team) => {
      const teamObj = LeadboardService.homeTeamCounter(team, matchesArr);
      teamObj.efficiency = LeadboardService.teamEfficiency(teamObj.totalPoints, teamObj.totalGames);
      dataArr.push(teamObj);
    });
    const data = LeadboardService.ArrSorting(dataArr);
    return { status: 200, data };
  }
}
