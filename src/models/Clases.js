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
    dia: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    horaInicio: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    horaFin: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  },
  {
    tableName: 'Clases',
    timestamps: true
  });
};