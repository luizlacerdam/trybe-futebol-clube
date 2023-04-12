import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import ILeader from './interfaces/leaderboard.interfaces';

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

  static homeTeamCounter(team: any, matchesArr: any, data: ILeader[]) {
    const teamObj = LeadboardService.teamObjFunc() as ILeader;
    teamObj.name = team.teamName;
    matchesArr.forEach((match: any) => {
      if (team.id === match.homeTeamId) {
        teamObj.totalGames += 1; teamObj.goalsFavor += match.homeTeamGoals;
        teamObj.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          teamObj.totalVictories += 1;
          teamObj.totalPoints += 3;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          teamObj.totalLosses += 1;
        } else {
          teamObj.totalDraws += 1; teamObj.totalPoints += 1;
        }
      }
    });
    data.push(teamObj);
  }

  public async getTeamsPerfomance() {
    const teamsArr = await Teams.findAll();
    const matchesArr = await this.model.findAll({ where: { inProgress: false } });
    const data: ILeader[] = [];
    teamsArr.forEach((team) => {
      LeadboardService.homeTeamCounter(team, matchesArr, data);
      //   const teamObj = LeadboardService.teamObjFunc() as ILeader;
      //   teamObj.name = team.teamName;
      //   matchesArr.forEach((match) => {
      //     LeadboardService.homeTeamCounter(team, match, teamObj);
      //   });
    //   data.push(teamObj);
    });
    return { status: 200, data };
  }
}
