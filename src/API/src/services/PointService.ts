import Sequelize from "sequelize";
import Point, { IPoint } from "../models/Points";
import User from "../models/user";

export default class PointService {
  public async ListRank(game: string): Promise<IPoint[]> {
    const result = await Point.findAll({
      attributes: { exclude: ["User.Password"] },
      where: { GameName: game, Id: { [Sequelize.Op.not]: 0 } },
      include: [{ model: User, required: true, isMultiAssociation: true }],
      limit: 10,
      order: [["Points", "DESC"]],
      nest: true,
      mapToModel: true,
      raw: true,
    });
    return result.map((x) => {
      x.User.Password = undefined;
      return x;
    });
  }

  public async AddOrUpdate(point: IPoint): Promise<IPoint> {
    if (!point.Id) {
      const created = {
        UserId: point.UserId,
        Points: point.Points,
        GameName: point.GameName,
      };
      point.Id = (await Point.create(created)).Id;
    } else await Point.update(point, { where: { Id: point.Id } });
    return point;
  }
}
