const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, reminderController.crear);
router.get('/', rateLimiter.getLimiter, reminderController.obtenerTodos);
router.get('/:id', rateLimiter.getLimiter, reminderController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, reminderController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, reminderController.eliminar);
module.exports = router;