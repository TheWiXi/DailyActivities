const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    actividades_completadas: {
      type: Number,
      default: 0
    },
    objetivos_completados: {
      type: Number,
      default: 0
    },
    tiempo_total_actividades: {
      type: Number, // en minutos
      default: 0
    },
    distribucion_categorias: [{
      categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      tiempo_dedicado: Number
    }]
  }, { timestamps: true });

module.exports = mongoose.model('Statistic', statisticSchema);
