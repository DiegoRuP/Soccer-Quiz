

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
    var dorsal = document.getElementById('dorsal').value;

    if(jugador === "" || dorsal === "") {

        alert("Por favor, completa todos los campos requeridos.");
        return false;

    } else {

        localStorage.jugador = document.getElementById("jugador").value;
        localStorage.dorsal = document.getElementById("dorsal").value;
        localStorage.puntaje = 0;

        jugador = localStorage.jugador;
        dorsal = localStorage.dorsal;
        puntaje = localStorage.puntaje;
        

        window.open("juego.html");
    }

}
