const Category = require('../models/Category');
const { formatResponse } = require('../utils/responseFormatter');

const categoryController = {
  // Crear categoría
  async crear(req, res) {
    try {
      const { nombre, descripcion, color } = req.body;
      const nuevaCategoria = new Category({
        nombre,
        descripcion,
        color,
        usuario: req.user.id // Se asume que el usuario está autenticado
      });

      await nuevaCategoria.save();

      res.status(201).json(
        formatResponse(201, 'Categoría creada exitosamente', nuevaCategoria)
      );
    } catch (error) {
      console.error('Error al crear categoría:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear categoría')
      );
    }
  },

  // Obtener todas las categorías de un usuario
  async obtenerTodas(req, res) {
    try {
      const categorias = await Category.find({ usuario: req.user.id });
      res.json(
        formatResponse(200, 'Categorías obtenidas exitosamente', categorias)
      );
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener categorías')
      );
    }
  },

  // Obtener una categoría específica por ID
  async obtenerPorId(req, res) {
    try {
      const categoria = await Category.findById(req.params.id);

      if (!categoria) {
        return res.status(404).json(
          formatResponse(404, 'Categoría no encontrada')
        );
      }

      res.json(
        formatResponse(200, 'Categoría obtenida exitosamente', categoria)
      );
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      res.status(500).json(
        formatResponse(500, 'Error al obtener categoría')
      );
    }
  },

  // Actualizar una categoría específica por ID
  async actualizar(req, res) {
    try {
      const { nombre, descripcion, color } = req.body;
      const categoriaActualizada = await Category.findByIdAndUpdate(
        req.params.id,
        { nombre, descripcion, color },
        { new: true, runValidators: true }
      );

      if (!categoriaActualizada) {
        return res.status(404).json(
          formatResponse(404, 'Categoría no encontrada')
        );
      }

      res.json(
        formatResponse(200, 'Categoría actualizada exitosamente', categoriaActualizada)
      );
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      res.status(500).json(
        formatResponse(500, 'Error al actualizar categoría')
      );
    }
  },

  // Eliminar una categoría específica por ID
  async eliminar(req, res) {
    try {
      const categoria = await Category.findByIdAndDelete(req.params.id);

      if (!categoria) {
        return res.status(404).json(
          formatResponse(404, 'Categoría no encontrada')
        );
      }

      res.json(
        formatResponse(200, 'Categoría eliminada exitosamente')
      );
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      res.status(500).json(
        formatResponse(500, 'Error al eliminar categoría')
      );
    }
  }
};

module.exports = categoryController;
