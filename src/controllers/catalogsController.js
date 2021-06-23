const db = require('../models');
const { sequelize } = require("../models");
const Especialidades = db.ctEspecialidades;
const Servicios = db.ctServicios;
const TipoPagos = db.ctTipoPagos;

exports.createEspecialidades = async (req, res, next) => {
  try {
    let _especialidad = await createEspecialidad(req.body);
    return res.status(200).send({
      message: 'La especialidad ha sido registrada.',
      especialidad: _especialidad
    });
  } catch (error){
    res.status(500).send({
      message: `Error al crear la especialidad : ${error.stack}`
    });
  }
}

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

exports.deleteEspecialidades = async (req, res, next) => {
  try {
    let _especialidad = await Especialidades.findByPk(req.body.id);
    if(!_especialidad){
      return res.status(404).send({
        message: `Especialidad no encontrada.`
      });
    }
    await _especialidad.destroy();
    return res.status(200).send({
      message: `Especialidad eliminada.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar la especialidad: ${error.stack}`
    });
    next(error);
  }
}

exports.createServicios = async (req, res, next) => {
  try {
    let _servicio = await createServicio(req.body);
    return res.status(200).send({
      message: 'El servicio ha sido registrado.',
      servicio: _servicio
    });
  } catch (error){
    res.status(500).send({
      message: `Error al crear servicio : ${error.stack}`
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

exports.deleteServicios = async (req, res, next) => {
  try {
    let _servicio = await Servicios.findByPk(req.body.id);
    if(!_servicio){
      return res.status(404).send({
        message: `Servicio no encontrado.`
      });
    }
    await _servicio.destroy();
    return res.status(200).send({
      message: `Servicio eliminado.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar el servicio: ${error.stack}`
    });
    next(error);
  }
}

exports.createTipoPagos = async (req, res, next) => {
  try {
    let _tipoPago = await createTipoPago(req.body);
    return res.status(200).send({
      message: 'El tipo de pago ha sido registrado.',
      tipoPago: _tipoPago
    });
  } catch (error){
    res.status(500).send({
      message: `Error al crear tipo de pago : ${error.stack}`
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

exports.deleteTipoPagos = async (req, res, next) => {
  try {
    let _tipoPago = await TipoPagos.findByPk(req.body.id);
    if(!_tipoPago){
      return res.status(404).send({
        message: `Tipo de pago no encontrado.`
      });
    }
    await _tipoPago.destroy();
    return res.status(200).send({
      message: `Tipo de pago eliminado.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar el tipo de pago: ${error.stack}`
    });
    next(error);
  }
}

async function createEspecialidad(body){
  try {
    let _ins = await Especialidades.create({
        nombre: body.nombre,
        descripcion: body.descripcion
      });
    return _ins.dataValues;
  } catch (error) {
    return error;
  }
}

async function createServicio(body){
  try {
    let _ins = await Servicios.create({
        nombre: body.nombre,
        descripcion: body.descripcion
      });
    return _ins.dataValues;
  } catch (error) {
    return error;
  }
}

async function createTipoPago(body){
  try {
    let _ins = await TipoPagos.create({
        nombre: body.nombre,
        descripcion: body.descripcion
      });
    return _ins.dataValues;
  } catch (error) {
    return error;
  }
}