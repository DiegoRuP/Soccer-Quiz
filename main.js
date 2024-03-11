//CONTROL DE AUDIO Y DE BOTON

var audio = document.getElementById("mainSong");
var iconoMusica = document.getElementById("iconoMusica");


function toggleAudio() {
    audio.volume = 0.5;
    
    if (audio.paused) {
        audio.play();
        iconoMusica.classList.remove("fa-volume-xmark");
        iconoMusica.classList.add("fa-volume-high");
    } else {
        audio.pause();
        iconoMusica.classList.remove("fa-volume-high");
        iconoMusica.classList.add("fa-volume-xmark");
    }
}


//RECIBIR DATOS DEL JUGADOR EN LOCAL STORAGE

function recibirDatos() {

    var jugador = document.getElementById('jugador').value;
    jugador = jugador.toLowerCase();
    var dorsal = document.getElementById('dorsal').value;

    if(jugador === "" || dorsal === "") {

        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos requeridos.',
        });

        
        return;

    } else {

        var jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];

        // Buscar si el jugador ya existe en la lista
        var jugadorExistente = jugadoresGuardados.find(function(jugadorGuardado) {
            return jugadorGuardado.nombre === jugador && jugadorGuardado.dorsal === dorsal;

        });

        if (jugadorExistente) {
            console.log("HOOOOLA")
            Swal.fire({
                icon: 'success',
                title: 'Jugador Existente',
                html: 'El puntaje actual es: ' + jugadorExistente.puntaje + '<br>' + 'Tiempo: ' + jugadorExistente.tiempo,
                timer: 5000, // 5 segundos
                timerProgressBar: true, // Barra de progreso
                showConfirmButton: false // Ocultar el botón de confirmación
            });
            
            //GUARDAR CAMBIOS 
            localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));

        } else {

            var nuevoJugador = {
                nombre: jugador,
                puntaje: 0,
                dorsal: dorsal,
                tiempo: 0,
                mejorTiempo: 0
            };

            // Agregar el nuevo jugador a la lista
            jugadoresGuardados.push(nuevoJugador);

            // Guardar la lista actualizada en el localStorage
            localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));

        }

        setTimeout(function() {
            window.location.href = "juego.html";
        }, 5000); // 5 segundos
    }

}