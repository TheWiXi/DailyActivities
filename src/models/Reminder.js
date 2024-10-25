const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha_recordatorio: {
    type: Date,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'cancelado'],
    default: 'pendiente'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);