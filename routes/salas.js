const express = require('express');
const router = express.Router();

let salas = [];

router.get('/', (req, res) => {
  res.json(salas);
});

router.post('/', (req, res) => {
  const { nombre, capacidad, estado } = req.body;
  if (!nombre || !capacidad || estado === undefined) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }
  const nuevaSala = { id: salas.length + 1, nombre, capacidad, estado };
  salas.push(nuevaSala);
  res.status(201).json(nuevaSala);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, estado } = req.body;
  const sala = salas.find((s) => s.id === parseInt(id));
  if (!sala) return res.status(404).json({ mensaje: 'Sala no encontrada' });

  sala.nombre = nombre ?? sala.nombre;
  sala.capacidad = capacidad ?? sala.capacidad;
  sala.estado = estado ?? sala.estado;
  res.json(sala);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  salas = salas.filter((s) => s.id !== parseInt(id));
  res.json({ mensaje: 'Sala eliminada' });
});

module.exports = router;
