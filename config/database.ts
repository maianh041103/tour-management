import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_PASSWORD,
    port: 3310,
    dialect: 'mysql'
  }
)

sequelize.authenticate().then(() => {
  console.log("Connect success");
}).catch((error) => {
  console.log("connect error " + error);
})

export default sequelize;