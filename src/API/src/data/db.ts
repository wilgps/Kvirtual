import Sequelize from "sequelize";
const db = new Sequelize.Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
const sync = async () => {
  try {
    const result = await db.sync();
  } catch (error) {
    console.log(error);
  }
};

export default db;
export { sync };
