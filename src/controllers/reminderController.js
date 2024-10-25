const Reminder = require('../models/Reminder');
const { formatResponse } = require('../utils/responseFormatter');
const { validationResult } = require('express-validator');

const reminderController = {
  // Crear un nuevo recordatorio
  async crear(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const newReminder = new Reminder({
        ...req.body,
        usuario: req.user.id // Asumiendo que el ID del usuario viene del middleware de autenticación
      });

      const recordatorioGuardado = await newReminder.save();

      return res.status(201).json(formatResponse(201, "Recordatorio creado exitosamente", recordatorioGuardado));
    } catch (error) {
      console.error('Error al crear recordatorio:', error);
      return res.status(500).json(formatResponse(500, 'Error al crear recordatorio'));
    }
  },

  // Obtener todos los recordatorios del usuario
  async obtenerTodos(req, res) {
    try {
      const recordatorios = await Reminder.find({ usuario: req.user.id }).populate('actividad');
      return res.status(200).json(formatResponse(200, "Recordatorios recuperados exitosamente", recordatorios));
    } catch (error) {
      console.error('Error al obtener recordatorios:', error);
      return res.status(500).json(formatResponse(500, "Error interno del servidor"));
    }
  },

  // Obtener un recordatorio específico
  async obtenerPorId(req, res) {
    try {
      const recordatorio = await Reminder.findOne({
        _id: req.params.id,
        usuario: req.user.id // Solo el creador puede obtener el recordatorio
      }).populate('actividad');

      if (!recordatorio) {
        return res.status(404).json(formatResponse(404, 'Recordatorio no encontrado'));
      }

      return res.status(200).json(formatResponse(200, "Recordatorio encontrado", recordatorio));
    } catch (error) {
      console.error('Error al obtener el recordatorio:', error);
      return res.status(500).json(formatResponse(500, 'Error al obtener el recordatorio', error.message));
    }
  },

  // Actualizar un recordatorio
  async actualizar(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const recordatorio = await Reminder.findOneAndUpdate(
        {
          _id: req.params.id,
          usuario: req.user.id // Solo el creador puede actualizar
        },
        req.body,
        { new: true }
      );

      if (!recordatorio) {
        return res.status(404).json(formatResponse(404, "Recordatorio no encontrado"));
      }

      return res.status(200).json(formatResponse(200, "Recordatorio actualizado exitosamente", recordatorio));
    } catch (error) {
      console.error('Error al actualizar recordatorio:', error);
      return res.status(500).json(formatResponse(500, "Error interno del servidor"));
    }
  },

  // Eliminar un recordatorio
  async eliminar(req, res) {
    try {
      const recordatorio = await Reminder.findOne({
        _id: req.params.id,
        usuario: req.user.id // Solo el creador puede eliminar
      });

      if (!recordatorio) {
        return res.status(404).json(formatResponse(404, 'Recordatorio no encontrado o no tienes permisos para eliminarlo'));
      }

      await Reminder.findByIdAndDelete(req.params.id);

      return res.status(200).json(formatResponse(200, 'Recordatorio eliminado correctamente'));
    } catch (error) {
      console.error('Error al eliminar recordatorio:', error);
      return res.status(500).json(formatResponse(500, 'Error al eliminar el recordatorio', error.message));
    }
  }
};

module.exports = reminderController;
