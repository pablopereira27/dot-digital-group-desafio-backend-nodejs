require("dotenv").config({ quiet: true });
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [__dirname + "/domains/**/entities/*.entity.js"],
  migrations: [__dirname + "/database/migrations/*.js"],
});

module.exports = { AppDataSource };
