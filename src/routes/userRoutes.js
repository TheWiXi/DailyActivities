const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth'); // Middleware de autenticación JWT
const rateLimiter = require('../middlewares/rateLimiter'); // Middleware de límite de solicitudes


// Rutas públicas
router.post('/',rateLimiter.postLimiter, userController.crear);
router.post('/iniciarSesion',rateLimiter.loginLimiter, userController.iniciarSesion);

// Rutas protegidas (requieren autenticación)
router.get('/validarSesion', auth,rateLimiter.getLimiter, userController.validarSesion);
router.get('/', auth,rateLimiter.getLimiter, userController.obtenerTodos);
router.get('/:id', auth,rateLimiter.getLimiter, userController.obtenerPorId);
router.put('/:id', auth,rateLimiter.putLimiter, userController.actualizar);
router.delete('/:id', auth,rateLimiter.deleteLimiter, userController.eliminar);

module.exports = router;