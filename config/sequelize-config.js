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
  await migrateLegacySchema();
};

const migrateLegacySchema = async () => {
  const tableExists = async (tableName) => {
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS total FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
      { replacements: [tableName] },
    );
    return Number(rows[0].total) > 0;
  };

  for (const [oldName, newName] of [
    ["clientes", "jogadores"],
    ["produtos", "brawlers"],
    ["pedidos", "partidas"],
  ]) {
    const oldTableExists = await tableExists(oldName);
    const newTableExists = await tableExists(newName);

    if (oldTableExists && newTableExists) {
      throw new Error(
        `Não foi possível migrar ${oldName}: as tabelas ${oldName} e ${newName} existem ao mesmo tempo.`,
      );
    }
    if (oldTableExists) {
      await connection.query(`RENAME TABLE \`${oldName}\` TO \`${newName}\``);
    }
  }

  const columnExists = async (tableName, columnName) => {
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS total FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?",
      { replacements: [tableName, columnName] },
    );
    return Number(rows[0].total) > 0;
  };

  const renameColumn = async (tableName, oldName, newName, definition) => {
    if (!(await tableExists(tableName))) {
      return;
    }

    const oldColumnExists = await columnExists(tableName, oldName);
    const newColumnExists = await columnExists(tableName, newName);
    if (oldColumnExists && newColumnExists) {
      throw new Error(
        `Não foi possível migrar ${tableName}.${oldName}: as colunas antiga e nova existem ao mesmo tempo.`,
      );
    }
    if (!oldColumnExists) {
      return;
    }

    if (tableName === "partidas" && oldName === "cliente_id") {
      const [constraints] = await connection.query(
        "SELECT constraint_name AS constraintName FROM information_schema.key_column_usage WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ? AND referenced_table_name IS NOT NULL",
        { replacements: [tableName, oldName] },
      );
      for (const { constraintName } of constraints) {
        await connection.query(
          `ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${constraintName}\``,
        );
      }
    }

    await connection.query(
      `ALTER TABLE \`${tableName}\` CHANGE COLUMN \`${oldName}\` \`${newName}\` ${definition}`,
    );
  };

  await renameColumn("jogadores", "nome", "nick", "VARCHAR(255) NOT NULL");
  await renameColumn("jogadores", "cpf", "id_jogador", "VARCHAR(255) NOT NULL");
  await renameColumn(
    "jogadores",
    "endereco",
    "clube_regiao",
    "VARCHAR(255) NOT NULL",
  );
  await renameColumn("brawlers", "preco", "poder", "FLOAT NOT NULL");
  await renameColumn("brawlers", "categoria", "classe", "VARCHAR(255) NOT NULL");
  await renameColumn("partidas", "valor", "recompensa", "FLOAT NOT NULL");
  await renameColumn(
    "partidas",
    "cliente_id",
    "jogador_id",
    "INT NOT NULL",
  );

  if (await tableExists("partidas")) {
    const [constraints] = await connection.query(
      "SELECT constraint_name FROM information_schema.key_column_usage WHERE table_schema = DATABASE() AND table_name = 'partidas' AND column_name = 'jogador_id' AND referenced_table_name = 'jogadores'",
    );
    if (constraints.length === 0 && (await tableExists("jogadores"))) {
      await connection.query(
        "ALTER TABLE `partidas` ADD CONSTRAINT `partidas_jogador_id_fk` FOREIGN KEY (`jogador_id`) REFERENCES `jogadores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE",
      );
    }
  }
};

export default connection;