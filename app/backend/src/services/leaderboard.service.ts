import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

export default class LeadboardService {
  protected model: ModelStatic<Matches> = Matches;

  public async getTeamsPerfomance() {
    const teamsArr = await Teams.findAll();
    const matchesArr = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });

    const data = [{}];
    teamsArr.forEach((team) => {
      const teamObj = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      };
      matchesArr.forEach((match) => {
        if (team.id === match.homeTeamId) {
          teamObj.totalGames += 1;
          teamObj.goalsFavor += match.homeTeamGoals;
          teamObj.goalsOwn += match.awayTeamGoals;
          if (match.homeTeamGoals > match.awayTeamGoals) {
            teamObj.totalVictories += 1;
            teamObj.totalPoints += 3;
          } else if (match.homeTeamGoals < match.awayTeamGoals) {
            teamObj.totalLosses += 1;
          } else {
            teamObj.totalDraws += 1;
            teamObj.totalPoints += 1;
          }
        }
      });
      data.push(teamObj);
    });

    return { status: 200, data };
  }
}
