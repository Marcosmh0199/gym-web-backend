const db = require('../models')
const jwt = require('jsonwebtoken');
const authConf = require('../config/auth.config')
const Clientes = db.clientes;
const Administradores = db.administradores;
const Instructores = db.instructores;
const CONSTANTS = require('../config/constants');

exports.login = async (req, res, next) => {
  try {
    let _user = null;
    switch(req.body.userType){
      case CONSTANTS.USER_TYPES.ADMIN :
        _user = await Clientes.findOne({ where : { correo : req.body.correo, contrasenia : req.body.contrasenia } });
        break;
      case CONSTANTS.USER_TYPES.CLIENT :
        _user = await Administradores.findOne({ where : { correo : req.body.correo, contrasenia : req.body.contrasenia } });
        break;
      case CONSTANTS.USER_TYPES.INSTRUCTOR :
        _user = await Instructores.findOne({ where : { correo : req.body.correo, contrasenia : req.body.contrasenia } });
        break;
    }
    if(_user){
      let _playload = { user : _user.cedula, correo : _user.correo };
      const _options  = { expiresIn : authConf.expire, issuer : authConf.issuer};
      const _token = jwt.sign( _playload, authConf.jwtSecret  , _options); 
      return res.status(200).send({
        message : "Ingreso exitoso.",
        token : _token,
        info : {
          correo : _user.correo,
          nombre : _user.nombre,
          welcomeMessage : 'Bienvenido a Musculos a la Tica.'
        },
        user : _user,
      });
    }else{
      res.status(404).send({
        message : "Error de autenticación."
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Error interno : ${error.message}`
    });
  }
}