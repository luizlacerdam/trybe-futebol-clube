import SameTeamIdError from '../../errors/same-team-id-error';
import IMatchValidation from './interfaces/matchesValidation.interfaces';

export default class MatchesValidations implements IMatchValidation {
  validateTeamsId = (homeTeamId: number, awayTeamId: number): void => {
    if (homeTeamId === awayTeamId) {
      throw new SameTeamIdError('It is not possible to create a match with two equal teams');
    }
  };
}
