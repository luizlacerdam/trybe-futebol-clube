import { ModelStatic } from 'sequelize';
import { IService } from './interfaces/service.interfaces';
import Teams from '../database/models/teams.model';
import { ITeam, ITeamsService } from './interfaces/teams.interfaces';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Teams> = Teams;

  async getAll(): Promise<IService<ITeam[]>> {
    const data = await this.model.findAll();
    return { status: 200, data };
  }

  async getById(id: number): Promise<IService<ITeam | string>> {
    const data = await this.model.findByPk(id);
    if (!data) return { status: 404, data: 'Not found.' };
    return { status: 200, data };
  }
}
