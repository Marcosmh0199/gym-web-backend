module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Reservaciones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    tableName: 'Reservaciones',
    timestamps: true
  });
};