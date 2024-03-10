function rellenarCampos() {
    var jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];
  
    if (jugadoresGuardados.length > 0) {
        var ultimoJugador = jugadoresGuardados[jugadoresGuardados.length - 1];
        
        // Rellenar el nombre del jugador
        document.getElementById("nombreJugador").innerHTML = ultimoJugador.nombre;
        console.log("Nombre del jugador:", ultimoJugador.nombre); 
  
        // Rellenar el tiempo que se tardó
        document.getElementById("tiempo").innerHTML = ultimoJugador.tiempo;
        console.log("Tiempo del jugador:", ultimoJugador.tiempo);
  
        // Rellenar la puntuación
        document.getElementById("puntos").innerHTML = "Puntos: "+ultimoJugador.puntaje;
        console.log("Puntuación del jugador:", ultimoJugador.puntaje);
    } else {
        console.log("No hay jugadores almacenados en el array.");
    }
}

rellenarCampos();
