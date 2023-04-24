import MatchesModel from '../../../database/models/matches.model';

export default interface IMatchValidation {
  validateTeamsId(homeTeamId: number, awayTeamId: number): void;
  validateTeams(homeTeam: MatchesModel | null, awayTeam: MatchesModel | null): void;
}
