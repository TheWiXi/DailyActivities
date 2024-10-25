const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, categoryController.crear);
router.get('/', rateLimiter.getLimiter, categoryController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, categoryController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, categoryController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, categoryController.eliminar);

module.exports = router;
