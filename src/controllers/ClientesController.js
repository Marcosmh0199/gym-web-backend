const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Clientes = db.clientes;
const Horarios = db.Horarios;
const Reservaciones = db.reservaciones;
const Clases = db.clases;
const Pagos = db.pagos;
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
    return res.status(200).send({
      message: `Cliente eliminado.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar el cliente: ${error.stack}`
    });
    
  }
}

exports.getHorarios = async (req, res, next) => {
  try {
    let _horarios = await Horarios.findAll();
    for(let h of _horarios){
      h.dataValues.clases = await Clases.findAll({ where : { HorarioId : h.id } });
    }
    return res.status(200).send({
      Horarios: _horarios
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al obtener los horarios: ${error.stack}`
    });
  }
}

exports.getAlDia = async (req, res, next) => {
  try {
    let _pagoPendiente = await Reservaciones.findOne({ where : { pagada : false, ClienteCedula : req.decoded.user } });
    return res.status(200).send({
      mensaje: !_pagoPendiente ? 'El cliente está al día con los pagos.' : 'El cliente no está al día con los pagos.'
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al obtener los horarios: ${error.stack}`
    });
  }
}

exports.reservar = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _reserva = await Reservaciones.create({
      ClienteCedula : req.decoded.user,
      SesioneId : req.body.sesionId,
      pagada: false
    }, { transaction : transaction });
    let _client = await Clientes.findByPk(req.decoded.user);
    _client.alDia = false;
    await _client.save({ transaction : transaction });
    await transaction.commit();
    return res.status(200).send({
      message: 'Reserva realizada.',
      reserva: _reserva,
      cliente: _client
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al realizar la reserva: ${error.stack}`
    });
  }
}

exports.morosidades = async (req, res, next) => {
  try {
    res.status(200).send({
      morosidades: await Reservaciones.findAll({ where : { pagada : false, ClienteCedula : req.decoded.user} })
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al obtener las morosidades: ${error.stack}`
    });
  }
}

exports.pagarReserva = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _pago = await Pagos.create({
      fecha : new Date(),
      ReservacioneId : req.body.reservaId,
      ctTipoPagoId : req.body.tipoPagoId
    }, { transaction : transaction });
    let _reserva = await Reservaciones.findByPk(req.body.reservaId);
    _reserva.pagada = true;
    await _reserva.save({ transaction : transaction });
    let _cliente = await Clientes.findByPk(req.decoded.user);
    let _pagoPendiente = await Reservaciones.findOne({ where : { pagada : false, ClienteCedula : req.decoded.user } });
    _cliente.alDia = _pagoPendiente ? false : true;
    await _cliente.save({ transaction : transaction });
    await transaction.commit();
    return res.status(200).send({
      message: 'Pago realizado.',
      reserva: _reserva,
      pago: _pago
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al pagar la reserva: ${error.stack}`
    });
  }
}

async function createClient(body, transaction){
  try {
    let _ins = await Clientes.create({
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
      alDia : true,
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
      alDia : true,
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