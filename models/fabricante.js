'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fabricante = sequelize.define('Fabricante', {
    nome: DataTypes.STRING,
  }, {});
  Fabricante.associate = function(models) {
    // associations can be defined here
  };
  return Fabricante;
};