'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
   
    static associate(models) {

      this.hasMany(models.Citas)
    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    pass: DataTypes.STRING,
    email: DataTypes.STRING,
    rol: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};