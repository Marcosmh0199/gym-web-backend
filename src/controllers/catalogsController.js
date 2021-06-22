const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Especialidades = db.ctEspecialidades;
const Servicios = db.ctServicios;
const TipoPagos = db.ctTipoPagos;
const CONSTANTS = require('../config/constants');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize'); 

exports.getEspecialidades = async (req, res, next) => {
  try {
    let _especialidades = await Especialidades.findAll();
    return res.status(200).send({
      especialidades : _especialidades,
    });
  } catch (error) {
    return res.status(500).send({
      msg : `Error al recuperar las especialidades: ${error.stack}`,
    });
  }
}

exports.getServicios = async (req, res, next) => {
  try {
    let _servicios = await Servicios.findAll();
    return res.status(200).send({
      servicios : _servicios,
    });
  } catch (error) {
    return res.status(500).send({
      msg : `Error al recuperar los servicios: ${error.stack}`,
    });
  }
}

exports.getTipoPagos = async (req, res, next) => {
  try {
    let _tipoPagos = await TipoPagos.findAll();
    return res.status(200).send({
      TipoPagos : _tipoPagos,
    });
  } catch (error) {
    return res.status(500).send({
      msg : `Error al recuperar los tipo de pagos: ${error.stack}`,
    });
  }
}