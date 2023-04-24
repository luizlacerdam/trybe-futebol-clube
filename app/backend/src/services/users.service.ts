import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import Unauthortized from '../errors/unauthorized.error';
import UsersModel from '../database/models/users.model';
import { IUserLogin, IUsersService } from '../interfaces/users.interfaces';
import { tokenGen } from '../utils/tokenRelated';
import IUsersValidations from '../validations/interfaces/usersValidations.interfaces';

export default class UsersService implements IUsersService {
  private _usersModel: ModelStatic<UsersModel>;
  private _usersValidations: IUsersValidations;
  constructor(usersModel: ModelStatic<UsersModel>, usersValidations: IUsersValidations) {
    this._usersModel = usersModel;
    this._usersValidations = usersValidations;
  }

  async userLogin(loginObj: IUserLogin): Promise <string | object> {
    const user = await this._usersModel.findOne({ where: { email: loginObj.email } });
    if (!user) {
      throw new Unauthortized('Invalid email or password');
    }
    const isPasswordRight = bcryptjs.compareSync(loginObj.password, user.password);
    this._usersValidations.validatePassword(isPasswordRight);
    // delete user.password;
    const { id, email, role, username } = user;
    const token = tokenGen({ id, email, role, username });
    return token;
  }
}
