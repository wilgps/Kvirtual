import Sequelize, { Model } from "sequelize";
import db from "../data/db";

 class Verbs extends Model implements IVerbs {
  Id: number;
  Verb: string;
}
Verbs.init(
  {
    Id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Verb: { type: Sequelize.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "Verbs",
    indexes: [{ unique: true, fields: ["Verb"] }],
  }
);
export interface IVerbs {
  Id?: number;
  Verb: string;
}
export default Verbs;