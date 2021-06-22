const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Clientes = db.clientes;
const CONSTANTS = require('../config/constants');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize'); 

exports.create = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _client = await Clientes.findByPk(req.body.cedula);
    if(_client){
      return res.status(402).send({
        message: 'El cliente ya se encuentra registrado.',
      });
    }
    _client = await createClient(req.body, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'El cliente ha sido registrado.',
      cliente: _client
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al crear cliente : ${error.stack}`
    });
  }
}

exports.get = async (req, res, next) => {
  try {
    let _clients = await Clientes.findAll();
    return res.status(200).send({
      clientes: _clients
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al recuperar los clientes: ${error.stack}`
    });
    next(error);
  }
}

exports.update = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _client = await Clientes.findByPk(req.body.cedula);
    if(!_client){
      return res.status(401).send({
        message: `Cliente no encontrado.`
      });
    }
    _client = await updateClient(req.body, _client, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'Información del cliente actualizada.',
      cliente: _client
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al actualizar el cliente: ${error.stack}`
    });
    next(error);
  }
}

exports.delete = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _client = await Clientes.findByPk(req.body.cedula);
    if(!_client){
      return res.status(401).send({
        message: `Cliente no encontrado.`
      });
    }
    await _client.destroy({ transaction : transaction });
    await transaction.commit();
    return res.status(401).send({
      message: `Cliente eliminado.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar el cliente: ${error.stack}`
    });
    next(error);
  }
}

async function createClient(body, transaction){
  try {
    let _ins = await Clientes.create({
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
      alDia : body.alDia, //true?
      contrasenia : body.contrasenia,
      enfermedades : body.enfermedades,
      medicamentos : body.medicamentos,
      contactosEmergencia : body.contactosEmergencia
    }, { transaction : transaction });
    return _ins.dataValues;
  } catch (error) {
    return error;
  }
}

async function updateClient(body, _client, transaction){
  try {
    let _newClient =
    {
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
      alDia : body.alDia, //true?
      enfermedades : body.enfermedades,
      medicamentos : body.medicamentos,
      contactosEmergencia : body.contactosEmergencia
    };
    Object.assign(_client, _newClient);
    await _client.save({ transaction: transaction });
    return _client.dataValues;
  } catch (error) {
    return error;
  }
}