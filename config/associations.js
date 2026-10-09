import Jogador from "../models/Jogador.js";
import Partida from "../models/Partida.js";

const defineAssociac = () => {
  Jogador.hasMany(Partida, {
    foreignKey: "jogador_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });
  Partida.belongsTo(Jogador, {
    as: "jogador",
    foreignKey: "jogador_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });
};

export default defineAssociac;
