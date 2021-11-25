import UserDb, { IUser } from "../models/user";
export default class UserService {
  public async GetUserById(id: number): Promise<IUser> {
    return UserDb.findOne({ where: { Id: id } });
  }

  public async AddUser(user: IUser): Promise<IUser> {
    if (!user.Id) {
      const created = {
        Name: user.Name,
        Email: user.Email,
        Password: user.Password,
      };
      user.Id = (await UserDb.create(created)).Id;
    } else {
      const updated = {
        Id: user.Id,
        Name: user.Name,
        Email: user.Email,
        Password: user.Password,
      };
      await UserDb.update(updated, { where: { Id: user.Id } });
    }
    return user;
  }
}
