import { ModelStatic } from 'sequelize';
// import tokenGen from '../utils/tokenGen';
import Users from '../database/models/users.model';
import { IUserLogin, IUsersService } from './interfaces/users.interfaces';
import tokenGen from '../utils/tokenGen';
import { IService } from './interfaces/service.interfaces';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<Users> = Users;

  async userLogin(loginObj: IUserLogin): Promise <IService<string>> {
    const user = await this.model.findOne({ where: { email: loginObj.email } });
    if (!user) return { status: 401, data: 'Username or password invalid' };
    // delete user.password;
    const token = tokenGen({ ...user });
    return { status: 200, data: token };
  }
}
