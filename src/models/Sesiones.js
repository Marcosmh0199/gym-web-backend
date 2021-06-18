module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Sesiones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    aforo: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  },
  {
    tableName: 'Sesiones',
    timestamps: true
  });
};