module.exports = app => {
  var router = require("express").Router();

  const clients = require('../controllers/ClientesController');

  //Clientes
  router.post('/clientes/create', clients.create);
  router.post('/clientes/read', clients.get);
  router.post('/clientes/update', clients.update);
  router.post('/clientes/delete', clients.delete);
  app.use('', router);
}