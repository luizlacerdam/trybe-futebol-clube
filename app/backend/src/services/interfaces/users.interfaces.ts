// import Users from '../../database/models/users.model';
import { IService } from './service.interfaces';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  id: number;
  username: string;
  role: string;
}

export interface IUsersService {
  userLogin(loginObj: IUserLogin): Promise<IService<string>>
}
