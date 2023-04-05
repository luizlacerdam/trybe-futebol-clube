import { ModelStatic } from 'sequelize';
import Users from '../database/models/users.model';
import { IUser, IUsersService } from '../interfaces/users.interfaces';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<Users> = Users;

  async getAll(): Promise<IUser[]> {
    return this.model.findAll();
  }

  async getById(id: number): Promise<IUser | null> {
    return this.model.findByPk(id);
  }
}
