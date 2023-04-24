import { ModelStatic } from 'sequelize';
import NotFound from '../errors/notFound.error';
import TeamsModel from '../database/models/teams.model';
import { ITeam, ITeamsService } from '../interfaces/teams.interfaces';

export default class TeamsService implements ITeamsService {
  private _teamsModel: ModelStatic<TeamsModel>;

  constructor(teamsModel: ModelStatic<TeamsModel>) {
    this._teamsModel = teamsModel;
  }

  async getAll(): Promise<ITeam[]> {
    return this._teamsModel.findAll();
  }

  async getById(id: number): Promise<ITeam | null> {
    const data = await this._teamsModel.findByPk(id);
    if (!data) {
      throw new NotFound('Team not found.');
    }
    return data;
  }
}
