import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import {
  IMatchService,
  MatcheObj,
  NewMatchObj,
  NewMatchObjReturn } from '../interfaces/matches.interfaces';

export default class MatchesService implements IMatchService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async getAll(): Promise<MatchesModel[]> {
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  async getInProgress(inProgress: boolean): Promise<MatchesModel[]> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return data;
  }

  async finishMatch(id: number): Promise<void> {
    const match = await this.model.findByPk(id);
    if (!match) {
      throw new Error('Match not found!');
    } else {
      await this.model.update(
        { inProgress: false },
        { where: { id } },
      );
    }
  }

  async matchUpdate(matcheObj: MatcheObj): Promise<void> {
    const { id, homeTeamGoals, awayTeamGoals } = matcheObj;
    const match = await this.model.findByPk(id);
    if (!match) {
      throw new Error('Match not found!');
    } else {
      await this.model.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
    }
  }

  async newMatch(matcheObj: NewMatchObj): Promise<NewMatchObjReturn | object> {
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

    return data;
  }
}
