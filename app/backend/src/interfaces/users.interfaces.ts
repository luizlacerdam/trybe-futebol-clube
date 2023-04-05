export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUsersService {
  getAll(): Promise<IUser[]>
}
