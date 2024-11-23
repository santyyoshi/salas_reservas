const apiUrl = 'http://localhost:3000';

const saveSala = async () => {
  const nombre = document.getElementById('nombre-sala').value;
  const capacidad = document.getElementById('capacidad-sala').value;
  const estado = document.getElementById('estado-sala').value;
  
  await fetch(`${apiUrl}/salas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, capacidad, estado: estado === 'true' }),
  });
  
  obtenerSalas();
}

async function obtenerSalas() {
  const res = await fetch(`${apiUrl}/salas`);
  const salas = await res.json();
  
  const lista = document.getElementById('lista-salas');
  lista.innerHTML = '';
  salas.forEach((sala) => {
    const item = document.createElement('li');
    item.textContent = `${sala.nombre} - Capacidad: ${sala.capacidad} - Estado: ${sala.estado ? 'Activo' : 'Inactivo'}`;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'action-btn edit-btn';
    editBtn.onclick = () => editarSala(sala);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.onclick = () => eliminarSala(sala.id);

    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    lista.appendChild(item);
  });
  const select = document.getElementById('sala-id');
  select.innerHTML = '';
  salas.forEach((sala) => {
    if (sala.estado) {
      const option = document.createElement('option');
      option.value = sala.id;
      option.textContent = sala.nombre;
      select.appendChild(option);
    }
  });
}

async function editarSala(sala) {
  const nombre = prompt('Nuevo nombre:', sala.nombre);
  const capacidad = prompt('Nueva capacidad:', sala.capacidad);
  const estado = confirm('¿Está activa esta sala?');
  
  if (nombre && capacidad) {
    await fetch(`${apiUrl}/salas/${sala.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, capacidad, estado }),
    });
    obtenerSalas();
  }
}

async function eliminarSala(id) {
  if (confirm('¿Estás seguro de eliminar esta sala?')) {
    await fetch(`${apiUrl}/salas/${id}`, { method: 'DELETE' });
    obtenerSalas();
  }
}


const saveReserva = async () => {
  const nombreReservante = document.getElementById('nombre-reservante').value;
  const salaId = document.getElementById('sala-id').value;
  const inicio = document.getElementById('inicio-reserva').value;
  const fin = document.getElementById('fin-reserva').value;
  
  await fetch(`${apiUrl}/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salaId, nombreReservante, inicio, fin }),
  });
  
  obtenerReservas();
}


async function obtenerReservas() {
  const res = await fetch(`${apiUrl}/reservas`);
  const reservas = await res.json();
  
  const lista = document.getElementById('lista-reservas');
  lista.innerHTML = '';
  reservas.forEach((reserva) => {
    const item = document.createElement('li');
    item.textContent = `Reserva en Sala ${reserva.salaId} por ${reserva.nombreReservante}, de ${reserva.inicio} a ${reserva.fin}`;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'action-btn edit-btn';
    editBtn.onclick = () => editarReserva(reserva);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.className = 'action-btn delete-btn';
    deleteBtn.onclick = () => eliminarReserva(reserva.id);

    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
    lista.appendChild(item);
  });
}

async function editarReserva(reserva) {
  const nombreReservante = prompt('Nuevo nombre del reservante:', reserva.nombreReservante);
  const inicio = prompt('Nueva fecha de inicio:', reserva.inicio);
  const fin = prompt('Nueva fecha de fin:', reserva.fin);

  if (nombreReservante && inicio && fin) {
    await fetch(`${apiUrl}/reservas/${reserva.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreReservante, inicio, fin }),
    });
    obtenerReservas();
  }
}

async function eliminarReserva(id) {
  if (confirm('¿Estás seguro de eliminar esta reserva?')) {
    await fetch(`${apiUrl}/reservas/${id}`, { method: 'DELETE' });
    obtenerReservas();
  }
}

obtenerSalas();
obtenerReservas();
