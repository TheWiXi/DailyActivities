const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      trim: true
    },
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

module.exports = mongoose.model('Tag', tagSchema);
  