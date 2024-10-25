const Milestone = require('../models/Milestone');
const { formatResponse } = require('../utils/responseFormatter');
const { validationResult } = require('express-validator');

// Controlador de Milestones
const milestoneController = {
  // Crear un nuevo hito
  async crear(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const { objetivo, titulo, descripcion, fecha_objetivo, estado, orden } = req.body;

      const nuevoHito = new Milestone({
        objetivo,
        titulo,
        descripcion,
        fecha_objetivo,
        estado,
        orden,
        usuario: req.user.id // Suponiendo que el usuario está autenticado
      });

      const hitoGuardado = await nuevoHito.save();
      res.status(201).json(formatResponse(201, 'Hito creado exitosamente', hitoGuardado));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Error al crear el hito', error.message));
    }
  },

  // Obtener todos los hitos
  async obtenerTodos(req, res) {
    try {
      const hitos = await Milestone.find().populate('objetivo'); // Asegúrate de que el modelo "Objetivo" esté definido
      res.status(200).json(formatResponse(200, "Hitos recuperados exitosamente", hitos));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Error al obtener los hitos', error.message));
    }
  },

  // Obtener un hito por ID
  async obtenerPorId(req, res) {
    try {
      const hito = await Milestone.findById(req.params.id).populate('objetivo');

      if (!hito) {
        return res.status(404).json(formatResponse(404, 'Hito no encontrado'));
      }

      res.status(200).json(formatResponse(200, "Hito recuperado exitosamente", hito));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Error al obtener el hito', error.message));
    }
  },

  // Actualizar un hito
  async actualizar(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const { objetivo, titulo, descripcion, fecha_objetivo, estado, orden } = req.body;

      const hitoActualizado = await Milestone.findByIdAndUpdate(
        req.params.id,
        { objetivo, titulo, descripcion, fecha_objetivo, estado, orden },
        { new: true, runValidators: true }
      );

      if (!hitoActualizado) {
        return res.status(404).json(formatResponse(404, 'Hito no encontrado'));
      }

      res.status(200).json(formatResponse(200, 'Hito actualizado exitosamente', hitoActualizado));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Error al actualizar el hito', error.message));
    }
  },

  // Eliminar un hito
  async eliminar(req, res) {
    try {
      const hitoEliminado = await Milestone.findByIdAndDelete(req.params.id);

      if (!hitoEliminado) {
        return res.status(404).json(formatResponse(404, 'Hito no encontrado'));
      }

      res.status(200).json(formatResponse(200, 'Hito eliminado exitosamente'));
    } catch (error) {
      res.status(500).json(formatResponse(500, 'Error al eliminar el hito', error.message));
    }
  }
};

module.exports = milestoneController;
