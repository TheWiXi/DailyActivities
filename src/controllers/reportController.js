const Report = require('../models/Report'); // Asegúrate de que la ruta sea correcta
const { formatResponse } = require('../utils/responseFormatter'); // Asegúrate de que este archivo exista
const { validationResult } = require('express-validator');

const reportController = {
  // Crear un nuevo reporte
  async crear(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const newReport = new Report({
        usuario: req.user.id, // Suponiendo que el ID del usuario viene del middleware de autenticación
        tipo: req.body.tipo,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        resumen: req.body.resumen,
        detalles: req.body.detalles
      });

      const reportGuardado = await newReport.save();
      return res.status(201).json(formatResponse(201, "Reporte creado exitosamente", reportGuardado));

    } catch (error) {
      console.error('Error al crear reporte:', error);
      return res.status(500).json(formatResponse(500, 'Error al crear reporte'));
    }
  },

  // Obtener todos los reportes del usuario
  async obtenerTodos(req, res) {
    try {
      const reportes = await Report.find({ usuario: req.user.id })
        .populate('usuario', 'nombre email') // Ajusta los campos según tu modelo de Usuario
        .populate('resumen.categoria_mas_trabajada', 'nombre') // Asegúrate de que el modelo 'Categoria' tenga estos campos
        .populate('detalles.actividades')
        .populate('detalles.objetivos')
        .sort({ createdAt: -1 }); // O cualquier otro campo que desees usar para ordenar

      return res.status(200).json(formatResponse(200, "Reportes recuperados exitosamente", reportes));
    } catch (error) {
      console.error('Error al obtener reportes:', error);
      return res.status(500).json(formatResponse(500, "Error interno del servidor"));
    }
  },

  // Obtener un reporte específico
  async obtenerPorId(req, res) {
    try {
      const report = await Report.findOne({ 
        _id: req.params.id,
        usuario: req.user.id // Asegura que solo el propietario pueda acceder
      })
        .populate('usuario', 'nombre email')
        .populate('resumen.categoria_mas_trabajada')
        .populate('detalles.actividades')
        .populate('detalles.objetivos');

      if (!report) {
        return res.status(404).json(formatResponse(404, 'Reporte no encontrado'));
      }

      return res.status(200).json(formatResponse(200, "Reporte recuperado exitosamente", report));
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
      return res.status(500).json(formatResponse(500, 'Error al obtener el reporte', error.message));
    }
  },

  // Actualizar un reporte
  async actualizar(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse(400, "Error de validación", errors.array()));
      }

      const report = await Report.findOneAndUpdate(
        { 
          _id: req.params.id, 
          usuario: req.user.id // Solo el propietario puede actualizar
        },
        req.body,
        { new: true }
      );

      if (!report) {
        return res.status(404).json(formatResponse(404, "Reporte no encontrado"));
      }

      return res.status(200).json(formatResponse(200, "Reporte actualizado exitosamente", report));
    } catch (error) {
      console.error('Error al actualizar reporte:', error);
      return res.status(500).json(formatResponse(500, "Error interno del servidor"));
    }
  },

  // Eliminar un reporte
  async eliminar(req, res) {
    try {
      const report = await Report.findOne({
        _id: req.params.id,
        usuario: req.user.id // Solo el propietario puede eliminar
      });

      if (!report) {
        return res.status(404).json(formatResponse(404, 'Reporte no encontrado o no tienes permisos para eliminarlo'));
      }

      await Report.findByIdAndDelete(req.params.id);
      return res.json(formatResponse(200, 'Reporte eliminado correctamente'));
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
      return res.status(500).json(formatResponse(500, 'Error al eliminar el reporte', error.message));
    }
  }
};

module.exports = reportController;
