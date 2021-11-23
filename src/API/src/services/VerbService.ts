import sequelize, { Sequelize } from "sequelize";
import db from "../data/db";
import Verbs, { IVerbs } from "../models/Verbs";

export class VerbService {
  public async ListVerbs(): Promise<IVerbs[]> {
    return await Verbs.findAll({ raw: true });
  }
  public async AddOrUpdate(verbs: IVerbs[]): Promise<void> {
    const create = verbs.filter((x) => !x.Id && x.Id !== 0);
    const update = verbs.filter((x) => !!x.Id || x.Id === 0);

    db.query("delete from Verbs where Id not in ("+update.map((x) => x.Id).join(",")+")");

    if (update.length > 0) {
      for (const item of update) {
        await Verbs.update(item, { where: { Id: item.Id } });
      }
    }
    if (create.length > 0) Verbs.bulkCreate(create);
  }
}
