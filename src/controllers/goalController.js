const Goal = require('../models/Goal');
const { formatResponse } = require('../utils/responseFormatter');
const { validationResult } = require('express-validator');

const goalController = {
  // Crear un nuevo Goal
  async crear(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const newGoal = new Goal({
        ...req.body,
        usuario: req.user.id // Asumiendo que el ID del usuario viene del middleware de autenticación
      });

      const goalGuardado = await newGoal.save();
      
      return res.status(201).json(formatResponse(201, "Goal creado exitosamente", goalGuardado));

    } catch (error) {
      console.error('Error al crear goal:', error);
      return res.status(500).json(formatResponse(500, 'Error al crear goal'));
    }
  },

  // Obtener todos los Goals del usuario
  async obtenerTodas(req, res) {
    try {
      const goals = await Goal.find({ usuario: req.user.id })
        .populate('hitos') // Si deseas incluir los hitos, puedes ajustar según tus necesidades
        .sort({ fechaInicio: -1 });

      return res.status(200).json(formatResponse(200, "Goals recuperados exitosamente", goals));
    } catch (error) {
      console.error('Error al obtener goals:', error);
      return res.status(500).json(formatResponse(500, "Error interno del servidor"));
    }
  },

  // Obtener un Goal específico
  async obtenerPorId(req, res) {
    try {
      const goal = await Goal.findOne({
        _id: req.params.id,
        usuario: req.user.id // Solo el dueño puede acceder
      }).populate('hitos');

      if (!goal) {
        return res.status(404).json(formatResponse(404, 'Goal no encontrado'));
      }

      return res.status(200).json(formatResponse(200, "Goal recuperado exitosamente", goal));
    } catch (error) {
      return res.status(500).json(formatResponse(500, 'Error al obtener el goal', error.message));
    }
  },

  // Actualizar un Goal
  async actualizar(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const goal = await Goal.findOneAndUpdate(
        {
          _id: req.params.id,
          usuario: req.user.id
        },
        req.body,
        { new: true }
      );

      if (!goal) {
        return res.status(404).json(formatResponse(404, "Goal no encontrado"));
      }

      return res.status(200).json(formatResponse(200, "Goal actualizado exitosamente", goal));
    } catch (error) {
      console.error('Error al actualizar goal:', error);
      return res.status(500).json(formatResponse(500, "Error interno del servidor"));
    }
  },

  // Eliminar un Goal
  async eliminar(req, res) {
    try {
      const goal = await Goal.findOne({
        _id: req.params.id,
        usuario: req.user.id // Solo el creador puede eliminar
      });

      if (!goal) {
        return res.status(404).json(formatResponse(404, 'Goal no encontrado o no tienes permisos para eliminarlo'));
      }

      await Goal.findByIdAndDelete(req.params.id);

      return res.status(200).json(formatResponse(200, 'Goal eliminado correctamente'));
    } catch (error) {
      return res.status(500).json(formatResponse(500, 'Error al eliminar el goal', error.message));
    }
  }
};

module.exports = goalController;
