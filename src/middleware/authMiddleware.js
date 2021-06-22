const db = require('../models');
const User = db.users;

const CONSTANTS = require('../config/constants');
const authConf = require('../config/auth.config');
const jwt = require('jsonwebtoken');

module.exports = {
  validateToken : (req, res, next) => {
    const _authorizationHeader = req.headers.authorization;
    if(_authorizationHeader) {
      try {
        jwt.verify(_authorizationHeader, authConf.jwtSecret, async function(err, decoded){  
          if(err){
            res.status(403).send({
              message : "Error interno",
              detail : err,
              token : req.headers.authorization == undefined || req.headers.authorization == null ? "No se recibe token" : req.headers.authorization
            });
          }else{
            req.decoded = decoded;
            next();
          }
        });
      } catch (error) {
        res.status(403).send({
          message : "Token de autenticación no válido.",
          detail  : error,
          token : req.headers.authorization == undefined || req.headers.authorization == null ? "No se recibe token" : req.headers.authorization
        });
      }
    }else{
      return res.status(401).send({
        message : 'Token de autenticación requerido',
      });
    }
  }
}