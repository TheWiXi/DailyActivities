const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_curso', 'completada'],
    default: 'pendiente'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  },
  fecha_inicio: {
    type: Date,
    required: true
  },
  fecha_fin: {
    type: Date
  },
  duracion_estimada: {
    type: Number, // en minutos
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  etiquetas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  colaboradores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);