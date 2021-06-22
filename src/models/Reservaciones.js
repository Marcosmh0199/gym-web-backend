module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Reservaciones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pagada : {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'Reservaciones',
    timestamps: true
  });
};