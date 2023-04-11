import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches.model';

export default class LeadboardService {
  protected model: ModelStatic<Matches> = Matches;

  public async teamsPerformaceHome() {
    const data = await this.model.findAll({
      where: { inProgress: false },
      include: [{ model: Matches, as: 'homeTeam', attributes: { exclude: ['id'] } }],
    });
    return { status: 200, data };
  }
}
