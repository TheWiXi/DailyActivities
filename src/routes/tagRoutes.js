const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, tagController.crear);
router.get('/', rateLimiter.getLimiter, tagController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, tagController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, tagController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, tagController.eliminar);

module.exports = router;
