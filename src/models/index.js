
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//tables
db.administradores = require('./Administradores')(sequelize, Sequelize);
db.clases = require('./Clases')(sequelize, Sequelize);
db.clientes = require('./Clientes')(sequelize, Sequelize);
db.ctEspecialidades = require('./ctEspecialidades')(sequelize, Sequelize);
db.ctServicios = require('./ctServicios')(sequelize, Sequelize);
db.ctTipoPagos = require('./ctTipoPagos')(sequelize, Sequelize);
db.instructores = require('./Instructores')(sequelize, Sequelize);
db.pagos = require('./Pagos')(sequelize, Sequelize);
db.Horarios = require('./Horarios')(sequelize, Sequelize);
db.reservaciones = require('./Reservaciones')(sequelize, Sequelize);
db.salas = require('./Salas')(sequelize, Sequelize);
db.sesiones = require('./Sesiones')(sequelize, Sequelize);

//relations

//Administradores

//Clases
db.ctServicios.hasMany(db.clases);
db.instructores.hasMany(db.clases, { onDelete: 'cascade' });
db.clases.belongsTo(db.sesiones, { onDelete: 'cascade' });

//Clientes

//ctEspecialidades

//ctServicios

//ctTipoPagos

//Instructores
db.instructores.belongsTo(db.salas);

//Pagos
db.pagos.belongsTo(db.reservaciones);
db.ctTipoPagos.hasMany(db.pagos);

//Horarios
db.Horarios.belongsTo(db.instructores, { onDelete: 'cascade' });
db.Horarios.hasMany(db.clases, { onDelete: 'cascade' });

//Reservaciones
db.reservaciones.belongsTo(db.clientes, { onDelete: 'cascade' });
db.sesiones.hasMany(db.reservaciones);

//Salas
db.administradores.hasMany(db.salas);

//Sesiones
db.salas.hasMany(db.sesiones);

module.exports = db; 