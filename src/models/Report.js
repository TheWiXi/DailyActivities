const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tipo: {
    type: String,
    enum: ['diario', 'semanal', 'mensual'],
    required: true
  },
  fecha_inicio: {
    type: Date,
    required: true
  },
  fecha_fin: {
    type: Date,
    required: true
  },
  resumen: {
    actividades_totales: Number,
    actividades_completadas: Number,
    objetivos_alcanzados: Number,
    tiempo_total_dedicado: Number,
    categoria_mas_trabajada: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  detalles: {
    actividades: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    }],
    objetivos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal'
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);