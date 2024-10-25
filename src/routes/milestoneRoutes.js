const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, milestoneController.crear);
router.get('/', rateLimiter.getLimiter, milestoneController.obtenerTodos);
router.get('/:id', rateLimiter.getLimiter, milestoneController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, milestoneController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, milestoneController.eliminar);

module.exports = router;