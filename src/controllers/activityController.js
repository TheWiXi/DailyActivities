const Activity = require('../models/Activity');
const { formatResponse } = require('../utils/responseFormatter');
const { validationResult } = require('express-validator');

const activityController = {
  // Crear una nueva actividad
  async crear(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(formatResponse(400,"Error de validación",errors.array()));
        }

        const newActivity = new Activity({
            ...req.body,
            usuario: req.user.id // Asumiendo que el ID del usuario viene del middleware de autenticación
        });

        const actividadGuardada = await newActivity.save();
        
        return res.status(201).json(formatResponse(201,"Actividad creada exitosamente",actividadGuardada));

    } catch (error) {
        console.error('Error al crear actividad:', error);
        return res.status(500).json(formatResponse(500, 'Error al crear actividad'));
    }
  },
  // Obtener todas las actividades del usuario
  async obtenerTodas (req, res) {
        try {
            const actividades = await Activity.find({ usuario: req.user.id })
                .populate('categoria', 'nombre color')
                .populate('etiquetas', 'nombre color')
                .populate('colaboradores', 'nombre apellido email')
                .sort({ fecha_inicio: -1 });

            return res.status(200).json(formatResponse(200,"Actividades recuperadas exitosamente", actividades));
        } catch (error) {
            console.error('Error al obtener actividades:', error);
            return res.status(500).json(formatResponse( 500, "Error interno del servidor"));
        }
    },
    // Obtener una actividad específica
    async obtenerPorId (req, res) {
        try {
        const activity = await Activity.findOne({
            _id: req.params.id,
            $or: [
            { usuario: req.user.id },
            { colaboradores: req.user.id }
            ]
        }).populate([
            { path: 'usuario', select: 'nombre email' },
            { path: 'categoria' },
            { path: 'etiquetas' },
            { path: 'colaboradores', select: 'nombre email' }
        ]);

        if (!activity) {
            return res.status(404).json(formatResponse(400,'Actividad no encontrada'));
        }

        res.json(activity);
        } catch (error) {
        res.status(500).json(formatResponse(500,'Error al obtener la actividad',error.message));
        }
    },
    // Actualizar una actividad
    async actualizar (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(formatResponse(400,"Error de validación",errors.array()));
        }

        const actividad = await Activity.findOneAndUpdate(
            {
                _id: req.params.id,
                usuario: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!actividad) {
            return res.status(404).json(formatResponse(404,"Actividad no encontrada"));
        }

        return res.status(200).json(formatResponse(200,"Actividad actualizada exitosamente",actividad));
    } catch (error) {
        console.error('Error al actualizar actividad:', error);
        return res.status(500).json(formatResponse( 500, "Error interno del servidor"));
    }
  },
  // Eliminar una actividad
  async eliminar (req, res) {
    try {
      const activity = await Activity.findOne({
        _id: req.params.id,
        usuario: req.user.id // Solo el creador puede eliminar
      });

      if (!activity) {
        return res.status(404).json(formatResponse(404,'Actividad no encontrada o no tienes permisos para eliminarla'));
    }

      await Activity.findByIdAndDelete(req.params.id);

      res.json(formatResponse( 200,'Actividad eliminada correctamente'));
    } catch (error) {
      res.status(500).json(formatResponse( 500,'Error al eliminar la actividad',error.message));
    }
  }
};

module.exports = activityController;