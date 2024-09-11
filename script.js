// Cargar las reservas desde el Local Storage cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
  const reservasGuardadas = localStorage.getItem('reservas');
  if (reservasGuardadas) {
    reservas.push(...JSON.parse(reservasGuardadas)); // Cargar reservas almacenadas
  }
  actualizarColores(); // Actualizar los botones de horas al cargar la página
});

const reservas = [];

// Función para reservar una hora
function reservarCita() {
  const nombre = document.getElementById('nombre').value;
  const selectedDate = document.getElementById('fecha').value;
  const selectedTime = document.getElementById('hora').value;

  if (reservas.some(reserva => reserva.fecha === selectedDate && reserva.hora === selectedTime)) {
    alert('La fecha y hora seleccionadas ya están reservadas. Por favor, elige otra.');
    return;
  }

  if (nombre && selectedDate && selectedTime) {
    const message = `¡Reserva realizada con éxito!\n\nSe ha programado una cita a nombre de ${nombre} para el día ${selectedDate} a las ${selectedTime} en ${document.getElementById('nombre-estetica').textContent} LASH STUDIO.`;
    const whatsappLink = `https://wa.me/5214922045101?text=${encodeURIComponent(message)}`;
    
    // Abrir enlace en otra ventana
    window.open(whatsappLink, '_blank');
    
    // Marcar la hora y fecha como reservada y guardarla en Local Storage
    reservas.push({ fecha: selectedDate, hora: selectedTime });
    localStorage.setItem('reservas', JSON.stringify(reservas)); // Guardar en Local Storage
    actualizarColores();
  } else {
    alert('Por favor, completa todos los campos para reservar tu cita.');
  }
}

// Función para seleccionar la hora
function seleccionarHora(hora) {
  document.getElementById('hora').value = hora;
}

// Función para actualizar colores y deshabilitar botones de horas reservadas
function actualizarColores() {
  const botonesHoras = document.querySelectorAll('#horario-buttons button');
  const fechaSeleccionada = document.getElementById('fecha').value;

  botonesHoras.forEach((boton) => {
    const horaBoton = boton.value;

    if (reservas.some(reserva => reserva.fecha === fechaSeleccionada && reserva.hora === horaBoton)) {
      boton.classList.add('reservado-gris');
      boton.classList.remove('libre');
      boton.disabled = true; 
    } else {
      boton.classList.add('libre');
      boton.classList.remove('reservado-gris');
      boton.disabled = false; 
    }
  });
}

// Actualizar los colores y el estado de los botones cuando se selecciona una nueva fecha
document.getElementById('fecha').addEventListener('change', actualizarColores);
