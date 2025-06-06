// backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Registrar nuevo usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  if (!nombre || !correo || !password || !rol) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, correo, password, rol });
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor al registrar' });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const usuario = await Usuario.findOne({ correo, password });
    if (!usuario) return res.status(401).json({ error: 'Credenciales incorrectas' });

    res.json({ mensaje: 'Login correcto', usuario });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor al iniciar sesión' });
  }
});

module.exports = router;
