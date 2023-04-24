import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
// import tokenGen from '../utils/tokenGen';
import UsersModel from '../database/models/users.model';
import { IUserLogin, IUsersService } from '../interfaces/users.interfaces';
import { tokenGen } from '../utils/tokenRelated';
import { IService } from '../interfaces/service.interfaces';
import IUsersValidations from '../validations/matches/interfaces/usersValidations.interfaces';

export default class UsersService implements IUsersService {
  private _usersModel: ModelStatic<UsersModel>;
  private _usersValidations: IUsersValidations;
  constructor(usersModel: ModelStatic<UsersModel>, usersValidations: IUsersValidations) {
    this._usersModel = usersModel;
    this._usersValidations = usersValidations;
  }

  async userLogin(loginObj: IUserLogin): Promise <IService<string | object>> {
    const user = await this._usersModel.findOne({ where: { email: loginObj.email } });

    if (!user) return { status: 401, data: { message: 'Invalid email or password' } };

    const isPasswordRight = bcryptjs.compareSync(loginObj.password, user.password);

    if (!isPasswordRight) return { status: 401, data: { message: 'Invalid email or password' } };
    // delete user.password;
    const { id, email, role, username } = user;
    const token = tokenGen({ id, email, role, username });
    return { status: 200, data: { token } };
  }
}
