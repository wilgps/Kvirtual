import UserDb, { IUser } from "../models/user";

export default class AuthService {
  public async Autheticate(email: string, password: string): Promise<IUser> {
      const users = await UserDb.findAll();
    const user = await UserDb.findOne({
      where: {
        Email: email,
        Password: password,
      },
      raw: true,
    });
    return user;
  }
}
