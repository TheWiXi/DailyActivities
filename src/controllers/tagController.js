const Tag = require("../models/Tag");
const { formatResponse } = require("../utils/responseFormatter");

const tagController = {
  // Crear etiqueta
  async crear(req, res) {
    try {
      const { nombre, color } = req.body;
      const nuevaEtiqueta = new Tag({
        nombre,
        color,
        usuario: req.user.id, // Se asume que el usuario está autenticado
      });

      await nuevaEtiqueta.save();

      res
        .status(201)
        .json(
          formatResponse(201, "Etiqueta creada exitosamente", nuevaEtiqueta)
        );
    } catch (error) {
      console.error("Error al crear etiqueta:", error);
      res.status(500).json(formatResponse(500, "Error al crear etiqueta"));
    }
  },

  // Obtener todas las etiquetas de un usuario
  async obtenerTodas(req, res) {
    try {
      const etiquetas = await Tag.find({ usuario: req.user.id });
      res.json(
        formatResponse(200, "Etiquetas obtenidas exitosamente", etiquetas)
      );
    } catch (error) {
      console.error("Error al obtener etiquetas:", error);
      res.status(500).json(formatResponse(500, "Error al obtener etiquetas"));
    }
  },

  // Obtener una etiqueta específica por ID
  async obtenerPorId(req, res) {
    try {
      const etiqueta = await Tag.findById(req.params.id);

      if (!etiqueta) {
        return res
          .status(404)
          .json(formatResponse(404, "Etiqueta no encontrada"));
      }

      res.json(formatResponse(200, "Etiqueta obtenida exitosamente", etiqueta));
    } catch (error) {
      console.error("Error al obtener etiqueta:", error);
      res.status(500).json(formatResponse(500, "Error al obtener etiqueta"));
    }
  },

  // Actualizar una etiqueta específica por ID
  async actualizar(req, res) {
    try {
      const { nombre, color } = req.body;
      const etiquetaActualizada = await Tag.findByIdAndUpdate(
        req.params.id,
        { nombre, color },
        { new: true, runValidators: true }
      );

      if (!etiquetaActualizada) {
        return res
          .status(404)
          .json(formatResponse(404, "Etiqueta no encontrada"));
      }

      res.json(
        formatResponse(
          200,
          "Etiqueta actualizada exitosamente",
          etiquetaActualizada
        )
      );
    } catch (error) {
      console.error("Error al actualizar etiqueta:", error);
      res.status(500).json(formatResponse(500, "Error al actualizar etiqueta"));
    }
  },

  // Eliminar una etiqueta específica por ID
  async eliminar(req, res) {
    try {
      const etiqueta = await Tag.findByIdAndDelete(req.params.id);

      if (!etiqueta) {
        return res
          .status(404)
          .json(formatResponse(404, "Etiqueta no encontrada"));
      }

      res.json(formatResponse(200, "Etiqueta eliminada exitosamente"));
    } catch (error) {
      console.error("Error al eliminar etiqueta:", error);
      res.status(500).json(formatResponse(500, "Error al eliminar etiqueta"));
    }
  },
};

module.exports = tagController;
