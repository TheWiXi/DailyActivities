const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');


// Rutas protegidas con autenticación
router.use(auth);
// Rutas CRUD básicas
router.post('/', rateLimiter.postLimiter, activityController.crear);
router.get('/', rateLimiter.getLimiter, activityController.obtenerTodas);

module.exports = router;