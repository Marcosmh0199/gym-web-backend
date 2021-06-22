const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Salas = db.salas;
const CONSTANTS = require('../config/constants');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize'); 

exports.create = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    body.user = req.decoded.user;
    let _sala = await createSala(req.body, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'La sala ha sido creada.',
      sala: _sala
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al crear la sala : ${error.stack}`
    });
  }
}

exports.get = async (req, res, next) => {
  try {
    let _salas = await Salas.findAll();
    return res.status(200).send({
      salas: _salas
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al obtener las salas : ${error.stack}`
    });
  }
}

exports.update = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _sala = await Salas.findByPk(req.body.id);
    if(!_sala){
      return res.status(401).send({
        message: `Sala no encontrada.`
      });
    }
    _sala = await updateSala(req.body, _sala, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'Información del administrador actualizada.',
      administrador: _sala
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al actualizar la sala : ${error.stack}`
    });
  }
}

exports.delete = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _sala = await Salas.findByPk(req.body.id);
    if(!_sala){
      return res.status(401).send({
        message: `Sala no encontrada.`
      });
    }
    await _sala.destroy({ transaction : transaction });
    await transaction.commit();
    return res.status(401).send({
      message: `Sala eliminada.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar la sala: ${error.stack}`
    });
    next(error);
  }
}

async function createSala(body, transaction) {
  try {
    let _servicios = [];
    for(const s of body.servicios){
      _servicios.push(s.id);
    }
    let _sala = await Salas.create({
      nombre : body.nombre,
      capacidadMax : body.capacidadMax,
      costo : body.costo,
      cedulaAdministrador : body.user,
      servicios: _servicios
    }, { transaction : transaction })
  } catch (error) {
    return error;
  }
}

async function updateSala(body, _sala, transaction){
  try {
    let _newSala =
    {
      nombre : body.nombre,
      capacidadMax : body.capacidadMax,
      costo : body.costo,
      servicios: _servicios
    };
    Object.assign(_sala, _newSala);
    await _newSala.save({ transaction: transaction });
    return _newSala.dataValues;
  } catch (error) {
    return error;
  }
}