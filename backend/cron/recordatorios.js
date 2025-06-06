const cron = require('node-cron');
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');
const enviarCorreo = require('../utils/email');

cron.schedule('*/10 * * * *', async () => {
  const ahora = new Date();
  const enUnaHora = new Date(ahora.getTime() + 60 * 60 * 1000);

  const citas = await Cita.find({
    fecha: ahora.toISOString().split('T')[0],
    confirmado: false
  }).populate('usuario');

  for (const cita of citas) {
    const horaCita = new Date(`${cita.fecha}T${cita.hora}`);
    const diff = horaCita.getTime() - ahora.getTime();
    const minutos = Math.round(diff / 60000);

    if (minutos <= 60 && minutos >= 50) {
      const correo = cita.usuario?.correo;
      if (correo) {
        await enviarCorreo(
          correo,
          '⏰ Recordatorio de cita',
          `Hola ${cita.usuario.nombre}, recuerda que tu cita es a las ${cita.hora}.`
        );
      }
    }
  }

  console.log('📅 Recordatorios revisados.');
});
