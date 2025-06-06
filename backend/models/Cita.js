const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  motivo: { type: String, required: true },
  confirmado: { type: Boolean, default: false },
  correo: { type: String, required: true }, // Agregamos campo correo
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Cita', citaSchema);
