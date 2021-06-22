module.exports = app => {
  var router = require("express").Router();

  const clients = require('../controllers/ClientesController');
  const admins = require('../controllers/AdministradoresController');
  const instructors = require('../controllers/InstructoresController');
  //Clientes
  router.post('/clientes/create', clients.create);
  router.post('/clientes/read', clients.get);
  router.post('/clientes/update', clients.update);
  router.post('/clientes/delete', clients.delete);
  

  //Administradores
  router.post('/administradores/create', admins.create);
  router.post('/administradores/read', admins.get);
  router.post('/administradores/update', admins.update);
  router.post('/administradores/delete', admins.delete);

  //Instructores
  router.post('/instructores/create', instructors.create);
  router.post('/instructores/read', instructors.get);
  router.post('/instructores/update', instructors.update);
  router.post('/instructores/delete', instructors.delete);

  app.use('', router);
}