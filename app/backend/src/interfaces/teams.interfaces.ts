export interface ITeam {
  id: number;
  teamName: string;
}

// export interface IService {
//   status: number;
//   data:
// }

export interface ITeamsService {
  getAll(): Promise<ITeam[]>
}
