import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/teams.model';
import { ITeam, ITeamsService } from '../interfaces/teams.interfaces';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<TeamsModel> = TeamsModel;

  async getAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  async getById(id: number): Promise<ITeam | null> {
    return this.model.findByPk(id);
  }
}
