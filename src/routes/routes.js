const validateToken = require("../middleware/authMiddleware").validateToken;

module.exports = app => {
  var router = require("express").Router();

  const auth = require('../controllers/AuthController');
  const clients = require('../controllers/ClientesController');
  const admins = require('../controllers/AdministradoresController');
  const instructors = require('../controllers/InstructoresController');
  const catalogs = require('../controllers/catalogsController')
  const salas = require('../controllers/SalasController');
  const sesiones = require('../controllers/SesionesController');
  
  //Login
  router.post('/auth/login', auth.login);

  //Clientes
  router.post('/clientes/create', clients.create);
  router.post('/clientes/read', clients.get);
  router.post('/clientes/update', clients.update);
  router.post('/clientes/delete', clients.delete);
  router.get('/clientes/horarios/read', validateToken, clients.getHorarios);
  router.get('/clientes/pagosAlDia', validateToken, clients.getAlDia);
  router.post('/clientes/reservar', validateToken, clients.reservar);
  
  //Administradores
  router.post('/administradores/create', admins.create);
  router.post('/administradores/read', validateToken, admins.get);
  router.post('/administradores/update', admins.update);
  router.post('/administradores/delete', admins.delete);

  //Instructores
  router.post('/instructores/create', instructors.create);
  router.post('/instructores/read', validateToken, instructors.get);
  router.post('/instructores/update', validateToken, instructors.update);
  router.post('/instructores/delete', instructors.delete);
  router.post('/instructores/horarios/create', validateToken, instructors.createHorario);
  router.post('/instructores/clases/create', validateToken, instructors.createClase);
  router.post('/instructores/sustituir', validateToken, instructors.sustituir);

  //Catalogos
    //Especialidades
  router.get('/catalogos/especialidades', validateToken, catalogs.getEspecialidades);
  router.post('/catalogos/especialidades/create', validateToken, catalogs.createEspecialidades);
  router.post('/catalogos/especialidades/delete', validateToken, catalogs.deleteEspecialidades);
    //Servicios
  router.get('/catalogos/servicios', validateToken, catalogs.getServicios);
  router.post('/catalogos/servicios/create', validateToken, catalogs.createServicios);
  router.post('/catalogos/servicios/delete', validateToken, catalogs.deleteServicios);
    //Tipo de pagos
  router.get('/catalogos/tipoPagos', validateToken, catalogs.getTipoPagos);
  router.post('/catalogos/tipoPagos/create', validateToken, catalogs.createTipoPagos);
  router.post('/catalogos/tipoPagos/delete', validateToken, catalogs.deleteTipoPagos);

  //Salas
  router.post('/salas/create', validateToken, salas.create);
  router.post('/salas/read', validateToken, salas.get);
  router.post('/salas/update', validateToken, salas.update);
  router.post('/salas/delete', validateToken, salas.delete);

  //Sesiones
  router.post('/sesiones/create', validateToken, sesiones.create);
  router.post('/sesiones/read', validateToken, sesiones.get);
  router.post('/sesiones/update', validateToken, sesiones.update);
  router.post('/sesiones/delete', validateToken, sesiones.delete);

  app.use('', router);
}