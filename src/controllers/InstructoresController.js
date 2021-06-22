const db = require('../models');
const { sequelize } = require("../models");
const { v4: uuidv4 } = require('uuid');
const Instructores = db.instructores;
const Horarios = db.Horarios;
const CONSTANTS = require('../config/constants');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize'); 
const Clases = db.clases;

exports.create = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _instructor = await Instructores.findByPk(req.body.cedula);
    if(_instructor){
      return res.status(402).send({
        message: 'El instructor ya se encuentra registrado.',
      });
    }
    _instructor = await createInstructor(req.body, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'El instructor ha sido registrado.',
      instructor: _instructor
    });
  } catch (error) {
    transaction.rollback();
    res.status(500).send({
      message: `Error al crear instructor : ${error.stack}`
    });
  }
}

exports.get = async (req, res, next) => {
  try {
    let _instructors = await Instructores.findAll();
    return res.status(200).send({
      instructores: _instructors
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al recuperar los instructores: ${error.stack}`
    });
    next(error);
  }
}

exports.update = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _instructor = await Instructores.findByPk(req.body.cedula);
    if(!_instructor){
      return res.status(401).send({
        message: `Instructor no encontrado.`
      });
    }
    _instructor = await updateInstructor(req.body, _instructor, transaction);
    await transaction.commit();
    return res.status(200).send({
      message: 'Información del instructor actualizada.',
      instructor: _instructor
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al actualizar el instructor: ${error.stack}`
    });
    next(error);
  }
}

exports.delete = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    let _instructor = await Instructores.findByPk(req.body.cedula);
    if(!_instructor){
      return res.status(401).send({
        message: `Instructor no encontrado.`
      });
    }
    await _instructor.destroy({ transaction : transaction });
    await transaction.commit();
    return res.status(200).send({
      message: `Instructor eliminado.`
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al eliminar el instructor: ${error.stack}`
    });
    next(error);
  }
}

exports.createHorario = async (req, res, next) => {
  try {
    let fechaInicio = new Date();
    let fechaFin = new Date();
    fechaFin.setMonth(fechaInicio.getMonth()+1);
    let _horario = await Horarios.create({
      fechaInicio : fechaInicio,
      fechaFin : fechaFin,
      InstructoreCedula : req.decoded.user
    });
    return res.status(200).send({
      message: `Horario creado.`,
      horario: _horario
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al crear el horario: ${error.stack}`
    });
    next(error);
  }
}

exports.createClase = async (req, res, next) => {
  try {
    let _clase = await Clases.create({
      dia : req.body.dia,
      horaInicio : req.body.horaInicio,
      horaFin : req.body.horaFin,
      SesioneId : req.body.sesionId,
      InstructoreCedula : req.decoded.user,
      SesioneId : req.body.sesionId,
      HorarioId : req.body.horarioId,
      ctServicioId : req.body.ctServicioId
    });
    return res.status(200).send({
      message: `Clase agregada al horario.`,
      clase: _clase
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al crear la clase: ${error.stack}`
    });
    next(error);
  }
}

exports.sustituir = async (req, res, next) => {
  try {
    let _clase = await Clases.findByPk(req.body.id);
    _clase.instructor = req.body.instructor;
    await _clase.save();
    return res.status(200).send({
      message: `Se ha agregado al instructor sustituto.`,
      clase: _clase
    });
  } catch (error) {
    res.status(500).send({
      message: `Error al sustituir instructor: ${error.stack}`
    });
    next(error);
  }
}

async function createInstructor(body, transaction){
  try {
    let _especialidades = [];
    for(const e of body.especialidades){
      _especialidades.push(e.id);
    }
    let _ins = await Instructores.create({
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
      contrasenia : body.contrasenia,
      especialidades : _especialidades,
      salaId : body.salaId
    }, { transaction : transaction });
    return _ins.dataValues;
  } catch (error) {
    return error;
  }
}

async function updateInstructor(body, _instructor, transaction){
  try {
    let _especialidades = [];
    for(const e of body.especialidades){
      _especialidades.push(e.id);
    }
    let _newInstructor =
    {
      cedula : body.cedula,
      nombre : body.nombre,
      celular : body.celular,
      correo : body.correo,
      especialidades : _especialidades,
      salaId : body.salaId
    };
    Object.assign(_instructor, _newInstructor);
    await _instructor.save({ transaction: transaction });
    return _instructor.dataValues;
  } catch (error) {
    return error;
  }
}