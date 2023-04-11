import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches.model';

export default class LeadboardService {
  protected model: ModelStatic<Matches> = Matches;

  public async getTeamsPerfomance() {
    const data = await this.model.findAll();
    return { status: 200, data };
  }
}
