import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import {
  IMatchService,
  MatcheObj,
  NewMatchObj,
  NewMatchObjReturn } from '../interfaces/matches.interfaces';
import IMatchValidation from '../validations/interfaces/matchesValidation.interfaces';

export default class MatchesService implements IMatchService {
  private _matchesModel: ModelStatic<MatchesModel>;
  private _matchesValidations: IMatchValidation;

  constructor(matchesModel: ModelStatic<MatchesModel>, matchesValidations: IMatchValidation) {
    this._matchesModel = matchesModel;
    this._matchesValidations = matchesValidations;
  }

  async getAll(): Promise<MatchesModel[]> {
    const data = await this._matchesModel.findAll({
      include: [
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  async getById(id: number): Promise<MatchesModel | null> {
    const data = await this._matchesModel.findByPk(id);
    return data;
  }

  async getInProgress(inProgress: boolean): Promise<MatchesModel[]> {
    const data = await this._matchesModel.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return data;
  }

  async finishMatch(id: number): Promise<number[]> {
    const match = await this._matchesModel.findByPk(id);
    if (!match) {
      throw new Error('Match not found!');
    } else {
      const data = await this._matchesModel.update(
        { inProgress: false },
        { where: { id } },
      );
      return data;
    }
  }

  async matchUpdate(matcheObj: MatcheObj): Promise<void> {
    const { id, homeTeamGoals, awayTeamGoals } = matcheObj;
    const match = await this._matchesModel.findByPk(id);
    if (!match) {
      throw new Error('Match not found!');
    } else {
      await this._matchesModel.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
    }
  }

  async newMatch(matcheObj: NewMatchObj): Promise<NewMatchObjReturn | object> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = matcheObj;
    this._matchesValidations.validateTeamsId(homeTeamId, awayTeamId);

    const homeTeam = await this.getById(homeTeamId);
    const awayTeam = await this.getById(awayTeamId);

    this._matchesValidations.validateTeams(homeTeam, awayTeam);
    const data = await this._matchesModel.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    return data;
  }
}
