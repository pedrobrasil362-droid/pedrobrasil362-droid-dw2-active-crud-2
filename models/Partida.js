import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Partida = connection.define("partidas", {
  numero: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recompensa: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  jogador_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "partidas",
});

export default Partida;
