import { NextFunction, Request, Response } from 'express';

export interface ITeamsModel {
  findAll(): Promise<ITeam[]>
  findByPk(id: number): Promise<ITeam>
}

export interface ITeamsService {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IUserController {
  getAll (req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getById (req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
