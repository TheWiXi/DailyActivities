const winston = require('winston');
const path = require('path');

// Definir niveles personalizados de log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Definir colores para cada nivel
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta'
};

// Asignar colores a Winston
winston.addColors(colors);

// Formato personalizado para los logs
const format = winston.format.combine(
  // Añadir timestamp
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Añadir información de colores
  winston.format.colorize({ all: true }),
  // Formato de error stack
  winston.format.errors({ stack: true }),
  // Formato personalizado
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
  )
);

// Definir transports (destinos) para los logs
const transports = [
  // Logs de consola
  new winston.transports.Console(),

  // Todos los logs en archivo
  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
    format: winston.format.uncolorize(),
  }),
  
  // Logs de error en archivo
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
    format: winston.format.uncolorize(),
  }),
  
  //info logs
  new winston.transports.File({
    filename: path.join('logs', 'info.log'),
    level: 'info',
    format: winston.format.uncolorize(),
  }),
  
  // Logs HTTP en archivo separado
  new winston.transports.File({
    filename: path.join('logs', 'http.log'),
    level: 'http',
    format: winston.format.uncolorize(),
  })
];

// Crear el logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV,
  levels,
  format,
  transports,
  // No terminar el proceso en caso de error
  exitOnError: false
});

// Función helper para logs de peticiones HTTP
logger.logRequest = (req) => {
  logger.http(`${req.method} ${req.originalUrl}`);
};

// Función helper para logs de respuestas HTTP
logger.logResponse = (req, res) => {
  logger.http(
    `${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`
  );
};

// Función helper para logs de errores con contexto
logger.logError = (error, context = '') => {
  const errorMessage = error.stack || error.message || error;
  logger.error(`${context ? `[${context}] ` : ''}${errorMessage}`);
};

// Crear directorio de logs si no existe
const fs = require('fs');
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// Middleware para Express
logger.expressMiddleware = (req, res, next) => {
  // Log al inicio de la petición
  logger.logRequest(req);

  // Capturar el tiempo de inicio
  const start = Date.now();

  // Cuando la respuesta termine
  res.on('finish', () => {
    // Calcular el tiempo de respuesta
    const duration = Date.now() - start;
    
    // Log de la respuesta con duración
    logger.http(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} - ${duration}ms`
    );
  });

  next();
};

module.exports = logger;