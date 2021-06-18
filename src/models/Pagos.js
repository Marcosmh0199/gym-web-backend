module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Pagos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'Pagos',
    timestamps: true
  });
};