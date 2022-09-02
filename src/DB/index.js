import { Sequelize } from "sequelize";

const { PGDATABASE, PGHOST, PGPORT, PGUSER, password } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, password,{
    host: PGHOST,
    dialect: "postgres",
    port: PGPORT,
})

export const authenticateDB = async () => {
    try {
      await sequelize.authenticate({ logging: false });
      console.log("db is seccessful");
    } catch (error) {
      console.log(error);
    }
  };
  
  export const syncModels = async () => {
    try {
      await sequelize.sync({alter: true});
      console.log("db is synced");
    } catch (error) {
      console.log(error);
    }
  };
  
  export default sequelize;
  