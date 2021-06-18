module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Administradores', {
    cedula: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    celular: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contrasenia: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'Administradores',
    timestamps: true
  });
};