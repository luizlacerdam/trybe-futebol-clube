import Unauthortized from '../errors/unauthorized.error';
import IUsersValidations from './interfaces/usersValidations.interfaces';

export default class UsersValidations implements IUsersValidations {
  validatePassword = (isPasswordRight: boolean) => {
    if (isPasswordRight === false) {
      throw new Unauthortized('Invalid email or password');
    }
  };
}
