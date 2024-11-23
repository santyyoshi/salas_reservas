const express = require('express');
const app = express();
const cors = require('cors');
const salasRouter = require('./routes/salas');
const reservasRouter = require('./routes/reservas');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/salas', salasRouter);
app.use('/reservas', reservasRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
