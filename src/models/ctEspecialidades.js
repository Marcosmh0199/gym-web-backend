module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ctEspecialidades', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  },
  {
    tableName: 'ctEspecialidades',
    timestamps: true
  });
};