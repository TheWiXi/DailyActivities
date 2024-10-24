const mongoose = require('mongoose');

const tagSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    }
  }, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);
  