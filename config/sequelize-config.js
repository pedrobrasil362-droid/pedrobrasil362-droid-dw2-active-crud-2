// Arquivo com os dados de conexão com o banco
import mysql from "mysql2/promise";
import Sequelize from "sequelize";

const DB_NAME = "loja_relacional";
const host = "localhost";
const username = "root";
const password = "";

const connection = new Sequelize(DB_NAME, username, password, {
  dialect: "mysql",
  host,
  timezone: "-03:00",
});

export const initializeDatabase = async () => {
  const mysqlConnection = await mysql.createConnection({
    host,
    user: username,
    password,
  });

  try {
    await mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  } finally {
    await mysqlConnection.end();
  }

  await connection.authenticate();
};

export default connection;