const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Sesiones = db.sesiones;
const CONSTANTS = require('../config/constants');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

exports.create = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _sesion = await getSesionByDate(req.body);
    if(_sesion){
      return res.status(400).send({
        message: 'Ya existe una sesión en ese rango de fechas.',
      });
    }
    _sesion = await createSesion(req.body, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'La sesión ha sido creada.',
      sala: _sesion
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al crear la sesión : ${error.stack}`
    });
  }
}

exports.get = async (req, res, next) =>{
  try {
    res.status(500).send({
      sesiones: await Sesiones.findAll()
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al obtener las sesiones : ${error.stack}`
    });
  }
}

exports.update = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _sesion = await getSesionByDate(req.body);
    if(_sesion){
      if(_sesion.id != req.body.id){
        return res.status(400).send({
          message: 'Ya existe una sesión en ese rango de fechas.',
        });
      }
    }
    _sesion = await Sesiones.findByPk(req.body.id);
    if(!_sesion){
      return res.status(400).send({
        message: 'La sesión no existe.',
        sesion: _sesion
      });
    }
    _sesion = await updateSesion(req.body, _sesion, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'Información de la sesión actualizada.',
      sesion: _sesion
    });
  } catch (error) {
    transaction.rollback();
    return res.status(500).send({
      message: 'Error al actualizar la sesión.',
    });
  }
}

exports.delete = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    _sesion = await Sesiones.findByPk(req.body.id);
    if(!_sesion){
      return res.status(400).send({
        message: 'La sesión no existe.',
        sesion: _sesion
      });
    }
    await _sesion.destroy({ transaction : transaction });
    await transaction.commit();
    return res.status(400).send({
      message: 'Sesión eliminada.',
    });
  } catch (error) {
    transaction.rollback();
    return res.status(500).send({
      message: 'Error al eliminar la sesión.',
    });
  }
}

async function createSesion(body, transaction){
  let _sesion = await Sesiones.create({
    fechaInicio  : body.fechaInicio,
    fechaFin : body.fechaFin,
    aforo : body.aforo,
    SalaId : body.salaId
  }, { transaction : transaction });
  return _sesion.dataValues;
}

async function updateSesion(body, _sesion, transaction){
  try {
    let _newSesion =
    {
      fechaInicio  : body.fechaInicio,
      fechaFin : body.fechaFin,
      aforo : body.aforo,
      SalaId : body.salaId
    };
    Object.assign(_sesion, _newSesion);
    await _sesion.save({ transaction: transaction });
    return _sesion.dataValues;
  } catch (error) {
    return error;
  }
}

async function getSesionByDate(body){
  let _sesiones = await Sesiones.findOne({ 
    where : 
    {
      SalaId : body.salaId,
      fechaInicio : {
        [Op.lte] : body.fechaInicio
      },
      fechaFin : {
        [Op.gte] : body.fechaFin
      }
    } 
  });
  if(_sesiones){
    return _sesiones;
  }
  _sesiones = await Sesiones.findOne({ 
    where : 
    {
      SalaId : body.salaId,
      fechaInicio : {
        [Op.lte] : body.fechaInicio
      },
      fechaFin : {
        [Op.gte] : body.fechaInicio
      }
    } 
  });
  if(_sesiones){
    return _sesiones;
  }
  _sesiones = await Sesiones.findOne({ 
    where : 
    {
      SalaId : body.salaId,
      fechaInicio : {
        [Op.lte] : body.fechaFin
      },
      fechaFin : {
        [Op.gte] : body.fechaFin
      }
    } 
  });
  return _sesiones;
}