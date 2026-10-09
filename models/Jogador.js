import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Jogador = connection.define("jogadores", {
  nick: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id_jogador: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clube_regiao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: "jogadores",
});

export default Jogador;
