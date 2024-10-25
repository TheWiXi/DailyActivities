const express = require('express');
const router = express.Router();
const statisitcController = require('../controllers/statisticController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');

// Rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, statisitcController.crear);
router.get('/', rateLimiter.getLimiter, statisitcController.obtenerTodas);
router.get('/:id', rateLimiter.getLimiter, statisitcController.obtenerPorId);
router.put('/:id', rateLimiter.putLimiter, statisitcController.actualizar);
router.delete('/:id', rateLimiter.deleteLimiter, statisitcController.eliminar);

module.exports = router;
