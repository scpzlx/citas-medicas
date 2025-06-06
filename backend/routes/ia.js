const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');
const { verificarToken, soloAdmin } = require('../middleware/auth');

// Ruta de análisis para admin
router.get('/', verificarToken, soloAdmin, async (req, res) => {
  try {
    const citas = await Cita.find();
    const analisis = analizarCitas(citas);
    res.json({ resultado: analisis });
  } catch (err) {
    res.status(500).json({ error: 'Error al analizar citas' });
  }
});

// Ruta de análisis para cliente
router.get('/mias', verificarToken, async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.usuario.id });
    const analisis = analizarCitas(citas);
    res.json({ resultado: analisis });
  } catch (err) {
    res.status(500).json({ error: 'Error al analizar tus citas' });
  }
});

function analizarCitas(citas) {
  if (!citas || citas.length === 0) return ['No hay citas suficientes para analizar.'];

  const total = citas.length;
  const confirmadas = citas.filter(c => c.confirmado).length;
  const pendientes = total - confirmadas;
  const porcentajeAsistencia = ((confirmadas / total) * 100).toFixed(1);

  const fechas = citas.map(c => new Date(`${c.fecha}T${c.hora}`));
  const horas = fechas.map(f => f.getHours());
  const horaPromedio = Math.round(horas.reduce((a, b) => a + b, 0) / horas.length);

  const horaSugerida =
    horaPromedio < 10 ? '08:00 AM' :
    horaPromedio < 14 ? '12:00 PM' :
    horaPromedio < 18 ? '04:00 PM' :
    '06:00 PM';

  return [
    `Total de citas registradas: ${total}`,
    `Citas confirmadas (asistencias): ${confirmadas}`,
    `Citas no confirmadas: ${pendientes}`,
    `Tasa de asistencia: ${porcentajeAsistencia}%`,
    `Horario más frecuente de cita: ${horaPromedio}:00 hrs`,
    `🧠 Recomendación IA: Intenta programar tus próximas citas alrededor de las ${horaSugerida}`
  ];
}

module.exports = router;
