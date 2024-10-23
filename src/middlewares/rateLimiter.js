const rateLimit = require('express-rate-limit');
const { formatResponse } = require('../utils/responseFormatter');

const loginLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutos
  max: 3,
  message: formatResponse(429, 'Espera 3 minutos antes de volver a intentarlo.')
});

const getLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 25,
  message: formatResponse(429, 'Tasa superada')
});

const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 45,
  message: formatResponse(429, 'Tasa superada')
});

const deleteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 10,
  message: formatResponse(429, 'Tasa superada')
});

const putLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 45,
  message: formatResponse(429, 'Tasa superada')
});

module.exports = {
  loginLimiter,
  getLimiter,
  postLimiter,
  deleteLimiter,
  putLimiter
};