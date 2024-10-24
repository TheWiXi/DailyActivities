const Activity = require('../models/Activity');
const { formatResponse } = require('../utils/responseFormatter');
const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const Tag = require('../models/Tag');


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
        const newCategory = new Category();
        const newtag = new Tag();
        const actividades = await Activity.find({ usuario: req.user.id })
            .populate('categoria', 'nombre color')
            .populate('etiquetas', 'nombre color')
            .populate('colaboradores', 'nombre apellido email')
            .sort({ fecha_inicio: -1 });

        return res.status(200).json({
            status: 200,
            message: "Actividades recuperadas exitosamente",
            data: actividades
        });
    } catch (error) {
      console.error('Error al obtener actividades:', error);
      return res.status(500).json({
          status: 500,
          message: "Error interno del servidor"
    });
  }
}
};

module.exports = activityController;