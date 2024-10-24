const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth'); // Middleware de autenticación JWT

// Rutas públicas
router.post('/registro', userController.crear);
router.post('/login', userController.iniciarSesion);

// Rutas protegidas (requieren autenticación)
router.get('/validar-sesion', auth, userController.validarSesion);
router.get('/', auth, userController.obtenerTodos);

module.exports = router;