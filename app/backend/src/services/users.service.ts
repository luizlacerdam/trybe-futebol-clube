import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
// import tokenGen from '../utils/tokenGen';
import Users from '../database/models/users.model';
import { IUserLogin, IUsersService } from './interfaces/users.interfaces';
import { tokenGen } from '../utils/tokenRelated';
import { IService } from './interfaces/service.interfaces';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<Users> = Users;

  async userLogin(loginObj: IUserLogin): Promise <IService<string | object>> {
    const user = await this.model.findOne({ where: { email: loginObj.email } });
    if (!user) return { status: 401, data: { message: 'Invalid email or password' } };
    const checkPassword = bcryptjs.compareSync(loginObj.password, user.password);
    if (!checkPassword) return { status: 401, data: { message: 'Invalid email or password' } };
    // delete user.password;
    const token = tokenGen({ ...user });
    return { status: 200, data: { token } };
  }
}
