module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Salas', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    capacidadMaxima: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    costo: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    servicios: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  },
  {
    tableName: 'Salas',
    timestamps: true
  });
};