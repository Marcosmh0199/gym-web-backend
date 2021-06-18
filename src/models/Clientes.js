module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Clientes', {
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
    alDia: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    enfermedades: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    medicamentos: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    contactosEmergencia: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  },
  {
    tableName: 'Clientes',
    timestamps: true
  });
};