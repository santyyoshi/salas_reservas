const express = require('express');
const router = express.Router();

let reservas = [];

router.get('/', (req, res) => {
  res.json(reservas);
});

router.post('/', (req, res) => {
  const { salaId, nombreReservante, inicio, fin } = req.body

  const solapamiento = reservas.some(
    (r) =>
      r.salaId === salaId &&
      ((inicio >= r.inicio && inicio < r.fin) || (fin > r.inicio && fin <= r.fin))
  );

  if (solapamiento) {
    return res.status(400).json({ mensaje: 'Conflicto de horario' });
  }

  const nuevaReserva = {
    id: reservas.length + 1,
    salaId,
    nombreReservante,
    inicio,
    fin,
  };

  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { inicio, fin } = req.body;

  const reserva = reservas.find((r) => r.id === parseInt(id));
  if (!reserva) return res.status(404).json({ mensaje: 'Reserva no encontrada' });

  reserva.inicio = inicio ?? reserva.inicio;
  reserva.fin = fin ?? reserva.fin;

  res.json(reserva);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  reservas = reservas.filter((r) => r.id !== parseInt(id));
  res.json({ mensaje: 'Reserva cancelada' });
});

module.exports = router;
