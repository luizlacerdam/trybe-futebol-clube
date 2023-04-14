import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { IService } from './interfaces/service.interfaces';
import {
  IMatchService,
  MatcheObj,
  NewMatchObj,
  NewMatchObjReturn } from './interfaces/matches.interfaces';

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

  async getInProgress(inProgress: boolean): Promise<IService<Matches[]>> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, data };
  }

  async finishMatch(id: number): Promise<IService<object>> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    const data = { message: 'Finished' };
    return { status: 200, data };
  }

  async matchUpdate(matcheObj: MatcheObj): Promise<IService<null>> {
    const { id, homeTeamGoals, awayTeamGoals } = matcheObj;

    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { status: 200, data: null };
  }

  async newMatch(matcheObj: NewMatchObj): Promise<IService<NewMatchObjReturn | object>> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matcheObj;

    const homeTeam = await this.model.findOne({ where: { homeTeamId } });

    const awayTeam = await this.model.findOne({ where: { awayTeamId } });

    if (matcheObj.homeTeamId === matcheObj.awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    if (!homeTeam || !awayTeam) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }

    const data = await this.model.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    return { status: 201, data };
  }
}
