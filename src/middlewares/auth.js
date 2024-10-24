const jwt = require('jsonwebtoken');
const { formatResponse } = require('../utils/responseFormatter');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json(
        formatResponse(401, 'No se proporcionó token de autenticación')
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;

    // Verificar expiración de sesión (30 minutos)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json(
        formatResponse(401, 'Sesión expirada')
      );
    }

    next();
  } catch (error) {
    res.status(401).json(
      formatResponse(401, 'Token inválido')
    );
  }
};

module.exports = auth;