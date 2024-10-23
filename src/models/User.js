const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  contrasena_hash: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  fecha_de_creacion: {
    type: Date,
    default: Date.now
  },
  ultima_sesion: {
    type: Date
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena_hash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena_hash = await bcrypt.hash(this.contrasena_hash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.compararContrasena = async function(contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena_hash);
};

module.exports = mongoose.model('User', userSchema);