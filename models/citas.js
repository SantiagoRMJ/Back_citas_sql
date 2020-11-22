'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Citas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario)
    }
  };
  Citas.init({
    id_usuario: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    id_doctor: DataTypes.INTEGER,
    observaciones: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Citas',
  });
  return Citas;
};