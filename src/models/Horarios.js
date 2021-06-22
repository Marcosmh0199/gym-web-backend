module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Horarios', {
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
    }
  },
  {
    tableName: 'Horarios',
    timestamps: true
  });
};