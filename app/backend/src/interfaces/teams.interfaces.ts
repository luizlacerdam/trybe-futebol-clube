import { IService } from './service.interfaces';

export interface ITeamsService {
  getAll(): Promise<IService<ITeam[]>>;
  getById(id: number): Promise<IService<ITeam | string>>;
}

export interface ITeam {
  id: number;
  teamName: string;
}
