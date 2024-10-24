const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { formatResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const userController = {
  // Crear usuario
  async crear(req, res) {
    try {
      const { nombre, apellido, email, contrasena } = req.body;
      
      const usuarioExistente = await User.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json(
          formatResponse(400, 'El email ya está registrado')
        );
      }

      const usuario = new User({
        nombre,
        apellido,
        email,
        contrasena_hash: contrasena
      });

      await usuario.save();

      // Excluir contraseña de la respuesta
      const usuarioResponse = usuario.toObject();
      delete usuarioResponse.contrasena_hash;

      res.status(201).json(
        formatResponse(201, 'Usuario creado exitosamente', usuarioResponse)
      );
    } catch (error) {
      logger.error('Error al crear usuario:', error);
      res.status(500).json(
        formatResponse(500, 'Error al crear usuario')
      );
    }
  }
};

module.exports = userController;