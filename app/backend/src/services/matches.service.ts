import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { IService } from './interfaces/service.interfaces';
import { IMatchService } from './interfaces/matches.interfaces';

export default class MatchesService implements IMatchService {
  protected model: ModelStatic<Matches> = Matches;

  async getAll(): Promise<IService<Matches[]>> {
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return { status: 200, data };
  }
}
