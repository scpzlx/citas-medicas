const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');

router.post('/', async (req, res) => {
  try {
    const cita = new Cita(req.body);
    await cita.save();
    res.status(201).json(cita);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
});

router.get('/mias/:usuarioId', async (req, res) => {
  try {
    const citas = await Cita.find({ usuario: req.params.usuarioId });
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tus citas' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cita);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Cita eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
});

router.put('/:id/confirmar', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, { confirmado: true }, { new: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
