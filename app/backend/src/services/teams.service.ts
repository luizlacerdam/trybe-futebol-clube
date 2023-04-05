import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teams.model';
import { ITeam, ITeamsService } from '../interfaces/teams.interfaces';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }
}
