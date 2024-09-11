// Configuración de Firebase
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Función para reservar cita
function reservarCita() {
    var nombre = document.getElementById('nombre').value;
    var fecha = document.getElementById('fecha').value;
    var hora = document.getElementById('hora').value;

    if (!nombre || !fecha || !hora) {
        alert("Por favor, completa todos los campos");
        return;
    }

    var reservasRef = database.ref('reservas');
    reservasRef.orderByChild('fecha_hora').equalTo(fecha + ' ' + hora).once('value', function(snapshot) {
        if (snapshot.exists()) {
            alert('Ya existe una reserva en esta fecha y hora.');
        } else {
            // Guardar la nueva reserva en Firebase
            var nuevaReservaRef = reservasRef.push();
            nuevaReservaRef.set({
                nombre: nombre,
                fecha: fecha,
                hora: hora,
                fecha_hora: fecha + ' ' + hora
            });

            // Crear el mensaje para WhatsApp
            var message = `¡Reserva realizada con éxito!\n\nSe ha programado una cita a nombre de ${nombre} para el día ${fecha} a las ${hora} en AM LASH STUDIO.`;
            var whatsappLink = `https://wa.me/5214922045101?text=${encodeURIComponent(message)}`;

            // Abrir enlace de WhatsApp
            window.open(whatsappLink, '_blank');

            alert('¡Reserva realizada con éxito!');
        }
    });
}

// Función para seleccionar la hora desde los botones
function seleccionarHora(hora) {
    document.getElementById('hora').value = hora;
}
los botones
function seleccionarHora(hora) {
    document.getElementById('hora').value = hora;
}
