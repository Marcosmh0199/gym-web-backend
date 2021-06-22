const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Administradores = db.administradores;
const CONSTANTS = require('../config/constants');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize'); 

exports.create = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _admin = await Administradores.findByPk(req.body.cedula);
    if(_admin){
      return res.status(402).send({
        message: 'El administrador ya se encuentra registrado.',
      });
    }
    _admin = await createAdministrador(req.body, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'El administrador ha sido registrado.',
      administrador: _admin
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al crear administrador : ${error.stack}`
    });
  }
}

exports.get = async (req, res, next) => {
  try {
    let _admins = await Administradores.findAll();
    return res.status(200).send({
      administradores: _admins
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al recuperar los administradores: ${error.stack}`
    });
    next(error);
  }
}

exports.update = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _admin = await Administradores.findByPk(req.body.cedula);
    if(!_admin){
      return res.status(401).send({
        message: `Administrador no encontrado.`
      });
    }
    _admin = await updateAdministrador(req.body, _admin, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'Información del administrador actualizada.',
      administrador: _admin
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al actualizar el administrador: ${error.stack}`
    });
    next(error);
  }
}

exports.delete = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _admin = await Administradores.findByPk(req.body.cedula);
    if(!_admin){
      return res.status(401).send({
        message: `Administrador no encontrado.`
      });
    }
    await _admin.destroy({ transaction : transaction });
    await transaction.commit();
    return res.status(401).send({
      message: `Administrador eliminado.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar el administrador: ${error.stack}`
    });
    next(error);
  }
}

async function createAdministrador(body, transaction){
  try {
    let _ins = await Administradores.create({
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
      contrasenia : body.contrasenia
    }, { transaction : transaction });
    return _ins.dataValues;
  } catch (error) {
    return error;
  }
}

async function updateAdministrador(body, _admin, transaction){
  try {
    let _newAdmin =
    {
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
    };
    Object.assign(_admin, _newAdmin);
    await _admin.save({ transaction: transaction });
    return _admin.dataValues;
  } catch (error) {
    return error;
  }
}