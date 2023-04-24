import MatchesModel from '../../database/models/matches.model';
import { IUser } from '../../interfaces/users.interfaces';

export default interface IUsersValidations {
  validateUser(user: IUser | null): void;
  validatePassword(homeTeam: MatchesModel | null, awayTeam: MatchesModel | null): void;
}