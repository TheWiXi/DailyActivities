const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, reportController.crear);
router.get('/', rateLimiter.getLimiter, reportController.obtenerTodos);
router.get('/:id', rateLimiter.getLimiter, reportController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, reportController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, reportController.eliminar);

module.exports = router;