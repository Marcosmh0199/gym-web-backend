module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Clases', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    instructor: {
      type: DataTypes.STRING(30),
      allowNull: true,
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
    tableName: 'Clases',
    timestamps: true
  });
};