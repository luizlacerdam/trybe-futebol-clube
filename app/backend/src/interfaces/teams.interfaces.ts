export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamsService {
  getAll(): Promise<ITeam[]>
}
