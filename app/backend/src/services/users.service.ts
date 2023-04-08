import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
// import tokenGen from '../utils/tokenGen';
import Users from '../database/models/users.model';
import { IUserLogin, IUsersService } from './interfaces/users.interfaces';
import { tokenGen } from '../utils/tokenRelated';
import { IService } from './interfaces/service.interfaces';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<Users> = Users;

  // function checkPassword(loginPassword: string, dbPassword: string): {
  //   const check = bcryptjs.compareSync(loginPassword, dbPassword);
  //   return check;
  // }

  async userLogin(loginObj: IUserLogin): Promise <IService<string | object>> {
    const user = await this.model.findOne({ where: { email: loginObj.email } });

    if (!user) return { status: 401, data: { message: 'Invalid email or password' } };
    // this.checkPassword(loginObj.password, user.password);
    const isPasswordRight = bcryptjs.compareSync(loginObj.password, user.password);

    if (!isPasswordRight) return { status: 401, data: { message: 'Invalid email or password' } };
    // delete user.password;
    const { password, ...userWithoutPass } = user.dataValues;
    const token = tokenGen(userWithoutPass);
    return { status: 200, data: { token } };
  }
}
