//PARA ACTUALIZAR EL TIEMPO
const contadorTiempo = document.getElementById("contadorTiempo");

let segundos = 0;

function actualizarTiempo() {
    segundos++;
    const minutos = Math.floor(segundos / 60);
    const segRestantes = segundos % 60;
    const tiempoFormateado = `${minutos}:${segRestantes < 10 ? '0' : ''}${segRestantes}`;
    contadorTiempo.textContent = tiempoFormateado;
}

// Iniciar el contador de tiempo
setInterval(actualizarTiempo, 1000);


const cajaimagenes = document.getElementById("cajaimagenes");
const cajasoltar = document.getElementById("cajasoltar");

const jugadoresEquipos = {
  "cr7.png": "AlNassr", 
  "messi.png": "Miami", 
  "haaland.png": "City",
  "dibu.png": "Aston",
  "chicharo.png": "Chivas",
  "marco.png": "Strikers", 
  "benzema.png": "AlItthad",
  "mbappe.png": "PSG", 
  "bellingham.png": "Madrid"
};

function obtenerImagenesAleatorias() {
  const jugadores = Object.keys(jugadoresEquipos);
  const jugadoresAleatorios = [];
  
  // Escoger 3 jugadores aleatorios con su respectivo equipo
  while (jugadoresAleatorios.length < 3) {
    const jugadorAleatorio = jugadores[Math.floor(Math.random() * jugadores.length)];
    if (!jugadoresAleatorios.includes(jugadorAleatorio)) {
      jugadoresAleatorios.push(jugadorAleatorio);
    }
  }
  
  return jugadoresAleatorios.map(jugador => {
    return {
      imagen: jugador,
      equipo: jugadoresEquipos[jugador]
    };
  });
}

//Mostrar las imagenes de los jugadores
function mostrarImagenesAleatorias() {
  const jugadoresConEquipos = obtenerImagenesAleatorias();
  cajaimagenes.innerHTML = "";
  cajasoltar.innerHTML = "";
  jugadoresConEquipos.forEach(jugador => {
    const imgJugador = document.createElement("img");
    imgJugador.src = `src/${jugador.imagen}`;
    imgJugador.alt = "Jugador";
    cajaimagenes.appendChild(imgJugador);

    const imgEquipo = document.createElement("img");
    imgEquipo.src = `src/Banquillos/${jugador.equipo}.png`;
    imgEquipo.alt = "Equipo";
    cajasoltar.appendChild(imgEquipo);
  });
}

mostrarImagenesAleatorias();



