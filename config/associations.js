//Nesse aquivo será definido os relacionamentos entre tabelas

// Model Cliente
import Cliente from "../models/Cliente.js";

// Model Pedido
import Pedido from "../models/Pedido.js";

// Definindo os relacionamentos entre os Models
const defineAssociac = () => {
  // Um cliente possui muitos pedidos
  Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });

  // Um Pedido pertenece somente a um Cliente
  Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });
};

// Exportando
export default defineAssociac;
