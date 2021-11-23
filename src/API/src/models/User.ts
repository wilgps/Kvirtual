import Sequelize, { Model } from "sequelize";
import db from "../data/db";

class User extends Sequelize.Model implements IUser {
  Id: number;
  Name: string;
  Email: string;
  Password: string;

  public get InvalidFields(): string[] {
    const inValidFields: string[] = [];
    if (!this.Name) inValidFields.push("Name");
    if (!this.Email) inValidFields.push("Email");
    if (!this.Password) inValidFields.push("Password");

    return inValidFields;
  }
  public get IsValid(): boolean {
    return this.InvalidFields.length === 0;
  }
}
User.init(
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    indexes: [{ unique: true, fields: ["Email"] }],
  }
);

export interface IUser {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
}
export default User;
