import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Brawler = connection.define("brawlers", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  poder: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  classe: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: "brawlers",
});

export default Brawler;
