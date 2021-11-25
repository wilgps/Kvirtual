import Sequelize, { Model } from "sequelize";
import db from "../data/db";
import User, { IUser } from "./user";

class Point extends Model implements IPoint {
  User?: IUser;
  Id: number;
  Session: string;
  UserId: number;
  Points: number;
  GameName: string;
}

Point.init(
  {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    UserId: { type: Sequelize.INTEGER },
    Points: { type: Sequelize.INTEGER },
    GameName: { type: Sequelize.STRING },
  },
  {
    sequelize: db,
    modelName: "Point",
  }
);
Point.belongsTo(User);
export default Point;
export interface IPoint {
  Id?: number;
  UserId: number;
  Points: number;
  GameName: string;
  User?: IUser;
}
