const Statistic = require("../models/Statistic");
const { formatResponse } = require("../utils/responseFormatter");

const statisticsController = {
  // Crear una estadística
  async crear(req, res) {
    try {
      const {
        fecha,
        actividades_completadas,
        objetivos_completados,
        tiempo_total_actividades,
        distribucion_categorias,
      } = req.body;
      const nuevaEstadistica = new Statistic({
        usuario: req.user.id, // Se asume que el usuario está autenticado
        fecha,
        actividades_completadas,
        objetivos_completados,
        tiempo_total_actividades,
        distribucion_categorias,
      });

      await nuevaEstadistica.save();

      res
        .status(201)
        .json(
          formatResponse(
            201,
            "Estadística creada exitosamente",
            nuevaEstadistica
          )
        );
    } catch (error) {
      logger.error("Error al crear estadística:", error);
      res.status(500).json(formatResponse(500, "Error al crear estadística"));
    }
  },

  // Obtener todas las estadísticas de un usuario
  async obtenerTodas(req, res) {
    try {
      const estadisticas = await Statistic.find({ usuario: req.user.id });
      res.json(
        formatResponse(200, "Estadísticas obtenidas exitosamente", estadisticas)
      );
    } catch (error) {
      logger.error("Error al obtener estadísticas:", error);
      res
        .status(500)
        .json(formatResponse(500, "Error al obtener estadísticas"));
    }
  },

  // Obtener estadísticas por ID
  async obtenerPorId(req, res) {
    try {
      const estadistica = await Statistic.findById(req.params.id);
      if (!estadistica) {
        return res
          .status(404)
          .json(formatResponse(404, "Estadística no encontrada"));
      }
      res.json(
        formatResponse(200, "Estadística obtenida exitosamente", estadistica)
      );
    } catch (error) {
      logger.error("Error al obtener estadística:", error);
      res.status(500).json(formatResponse(500, "Error al obtener estadística"));
    }
  },

  // Actualizar una estadística
  async actualizar(req, res) {
    try {
      const {
        fecha,
        actividades_completadas,
        objetivos_completados,
        tiempo_total_actividades,
        distribucion_categorias,
      } = req.body;
      const estadisticaActualizada = await Statistic.findByIdAndUpdate(
        req.params.id,
        {
          fecha,
          actividades_completadas,
          objetivos_completados,
          tiempo_total_actividades,
          distribucion_categorias,
        },
        { new: true, runValidators: true }
      );
      if (!estadisticaActualizada) {
        return res
          .status(404)
          .json(formatResponse(404, "Estadística no encontrada"));
      }
      res.json(
        formatResponse(
          200,
          "Estadística actualizada exitosamente",
          estadisticaActualizada
        )
      );
    } catch (error) {
      logger.error("Error al actualizar estadística:", error);
      res
        .status(500)
        .json(formatResponse(500, "Error al actualizar estadística"));
    }
  },

  // Eliminar una estadística
  async eliminar(req, res) {
    try {
      const estadistica = await Statistic.findByIdAndDelete(req.params.id);
      if (!estadistica) {
        return res
          .status(404)
          .json(formatResponse(404, "Estadística no encontrada"));
      }
      res.json(formatResponse(200, "Estadística eliminada exitosamente"));
    } catch (error) {
      logger.error("Error al eliminar estadística:", error);
      res
        .status(500)
        .json(formatResponse(500, "Error al eliminar estadística"));
    }
  },
};

module.exports = statisticsController;
