const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas públicas
router.post('/registro', userController.crear);
router.post('/login', userController.iniciarSesion);

module.exports = router;