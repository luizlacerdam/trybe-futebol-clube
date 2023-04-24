import MatchesModel from '../../database/models/matches.model';
import InvalidFields from '../../errors/invalidFields.error';
import IMatchValidation from './interfaces/matchesValidation.interfaces';
import NotFound from '../../errors/notFound.error';

export default class MatchesValidations implements IMatchValidation {
  validateTeamsId = (homeTeamId: number, awayTeamId: number): void => {
    if (homeTeamId === awayTeamId) {
      throw new InvalidFields('It is not possible to create a match with two equal teams');
    }
  };

  validateTeams = (homeTeam: MatchesModel | null, awayTeam: MatchesModel | null) => {
    if (!homeTeam || !awayTeam) {
      throw new NotFound('There is no team with such id!');
    }
  };
}
