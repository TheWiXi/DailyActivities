const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: 500
  },
  fechaInicio: {
    type: Date,
    default: Date.now
  },
  fechaFin: {
    type: Date,
    required: true
  },
  progreso: {
    type: Number,
    default: 0, // Porcentaje de progreso, entre 0 y 100
    min: 0,
    max: 100
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  hitos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
