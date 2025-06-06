// backend/utils/analisisIA.js

function analizarCitas(citas) {
  const resultados = {
    riesgoAusencia: false,
    sugerenciasHorarios: [],
    urgencias: [],
  };

  // 1. Verifica si hay muchas cancelaciones
  const canceladas = citas.filter(c => c.cancelada === true);
  if (canceladas.length >= 2) {
    resultados.riesgoAusencia = true;
  }

  // 2. Sugerencias de horarios poco comunes
  const conteoHoras = {};
  citas.forEach(c => {
    conteoHoras[c.hora] = (conteoHoras[c.hora] || 0) + 1;
  });
  for (let hora in conteoHoras) {
    if (conteoHoras[hora] <= 1) {
      resultados.sugerenciasHorarios.push(hora);
    }
  }

  // 3. Clasifica urgencias según palabras clave
  const urgentes = ['urgente', 'emergencia', 'fiebre', 'dolor', 'infección'];
  citas.forEach(c => {
    if (urgentes.some(palabra => c.motivo.toLowerCase().includes(palabra))) {
      resultados.urgencias.push({
        id: c._id,
        motivo: c.motivo,
        fecha: c.fecha,
        hora: c.hora,
      });
    }
  });

  return resultados;
}

module.exports = { analizarCitas };
