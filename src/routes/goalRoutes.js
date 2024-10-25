const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD para Goals
router.post('/', rateLimiter.postLimiter, goalController.crear);
router.get('/', rateLimiter.getLimiter, goalController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, goalController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, goalController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, goalController.eliminar);

module.exports = router;
