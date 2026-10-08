// Model produto

//Importando o arquivo de conexão
import connection from "../config/sequelize-config.js";
// Importando a biblioteca sequelize
import Sequelize from "sequelize";

const Produto = connection.define("produtos", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Exportando o modulo
export default Produto;
