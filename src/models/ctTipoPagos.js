module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ctTipoPagos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: 'ctTipoPagos',
    timestamps: true
  });
};