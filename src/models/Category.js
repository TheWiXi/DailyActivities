const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: String,
    color: {
      type: String,
      default: '#000000'
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
