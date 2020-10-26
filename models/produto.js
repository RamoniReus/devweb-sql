'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: DataTypes.STRING,
    codigo: DataTypes.STRING,
    preco: DataTypes.FLOAT
  }, {});
  Produto.associate = function(models) {
    Produto.Fabricante = Produto.belongsTo(models.Fabricante, {
      foreignKey: 'fabricanteId',
      as: 'fabricante'
    });
  };
  return Produto;
};