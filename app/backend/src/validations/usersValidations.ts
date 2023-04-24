import { IUser } from '../interfaces/users.interfaces';
import IUsersValidations from './interfaces/usersValidations.interfaces';

export default class UsersValidations implements IUsersValidations {
  validateUser = (user: IUser) => {
    if (!user) throw new Error('Invalid email or password');
  };

  validatePassword = () => {

  };
}
