export interface ITeamsService {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}

export interface ITeam {
  id: number;
  teamName: string;
}
