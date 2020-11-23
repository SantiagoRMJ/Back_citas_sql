'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Citas extends Model {
  
    static associate(models) {
 
      this.belongsTo(models.Usuario)
    }
  };
  Citas.init({
    UsuarioId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_doctor: DataTypes.INTEGER,
    observaciones: DataTypes.STRING,
    emailPaciente:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Citas',
  });
  return Citas;
};