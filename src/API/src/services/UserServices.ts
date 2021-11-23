import UserDb, { IUser } from "../models/user";
export default class UserService {
  public async AddUser(user: IUser): Promise<IUser> {
    if (!user.Id) {
      const created = {
        Name: user.Name,
        Email: user.Email,
        Password: user.Password,
      };
      user.Id = (await UserDb.create(created)).Id;
    }
    return user;
  }
}
