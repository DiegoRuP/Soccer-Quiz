//PARA ACTUALIZAR EL TIEMPO
const contadorTiempo = document.getElementById("contadorTiempo");
let segundos = 0;
let cont = 0;
let puntos = 0;

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
let jugadoresConEquipos = [
  { imagen: "bellingham.png", equipo: "Madrid", audio: "audio/bellingham.wav", audioError: "audio/error.mp3", nombre: "Bellingham", auidioNombre: "audio/bellinghamVoz.mp3" },
  { imagen: "benzema.png", equipo: "AlItthad", audio: "audio/benzema.wav", audioError: "audio/error.mp3", nombre: "Benzema", auidioNombre: "audio/benzemaVoz.mp3" },
  { imagen: "chicharo.png", equipo: "Chivas", audio: "audio/chicharo.wav", audioError: "audio/error.mp3", nombre: "Chicharito", auidioNombre: "audio/chicharoVoz.mp3" },
  { imagen: "cr7.png", equipo: "AlNassr", audio: "audio/cr7.wav", audioError: "audio/error.mp3", nombre: "Cristiano Ronaldo", auidioNombre: "audio/cr7Voz.mp3" },
  { imagen: "dibu.png", equipo: "Aston", audio: "audio/dibu.wav", audioError: "audio/error.mp3", nombre: "Dibu Martinez", auidioNombre: "audio/dibuVoz.mp3" },
  { imagen: "haaland.png", equipo: "City", audio: "audio/haaland.wav", audioError: "audio/error.mp3", nombre: "Haaland", auidioNombre: "audio/haalandVoz.mp3" },
  { imagen: "marco.png", equipo: "Strikers", audio: "audio/marco.wav", audioError: "audio/error.mp3", nombre: "Marco Fabian", auidioNombre: "audio/marcoVoz.mp3" },
  { imagen: "mbappe.png", equipo: "PSG", audio: "audio/mbappe.wav", audioError: "audio/error.mp3", nombre: "Mbappe", auidioNombre: "audio/mbappeVoz.mp3" },
  { imagen: "messi.png", equipo: "Miami", audio: "audio/messi.wav", audioError: "audio/error.mp3", nombre: "Messi", auidioNombre: "audio/messiVoz.mp3" }
];

function obtenerImagenesAleatorias() {
  const jugadoresAleatorios = [];
  
  // Escoger 3 jugadores aleatorios con su respectivo equipo
  while (jugadoresAleatorios.length < 3) {
    const jugadorAleatorio = jugadoresConEquipos[Math.floor(Math.random() * jugadoresConEquipos.length)];
    if (!jugadoresAleatorios.some(jugador => jugador.imagen === jugadorAleatorio.imagen)) {
      jugadoresAleatorios.push(jugadorAleatorio);
    }
  }
  
  return jugadoresAleatorios;
}

function cambiarOrdenAleatorio(elementos) {
  for (let i = elementos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
  }
  return elementos;
}


//Mostrar las imagenes de los jugadores
function mostrarImagenesAleatorias() {
  cajaimagenes.innerHTML = "";
  cajasoltar.innerHTML = "";
  
  const jugadoresConEquiposActualizado = obtenerImagenesAleatorias();
  
  jugadoresConEquiposActualizado.forEach((jugador, index) => {
    const imgJugador = document.createElement("img");
    imgJugador.src = `src/${jugador.imagen}`;
    imgJugador.alt = "Jugador";
    imgJugador.draggable = true;
    imgJugador.id = `jugador_${index}`; // Asignar un ID único
    imgJugador.setAttribute("data-equipo", jugador.equipo);
    imgJugador.addEventListener("dragstart", iniciarArrastre);
    cajaimagenes.appendChild(imgJugador);

    const imgEquipo = document.createElement("img");
    imgEquipo.src = `src/Banquillos/${jugador.equipo}.png`;
    imgEquipo.alt = "Equipo";
    imgEquipo.setAttribute("data-equipo", jugador.equipo);
    imgEquipo.addEventListener("dragover", permitirSoltar);
    imgEquipo.addEventListener("drop", soltar);
    cajasoltar.appendChild(imgEquipo);
  });

  // Obtener todas las imágenes de equipos dentro de cajasoltar
  const imagenesEquipos = Array.from(cajasoltar.querySelectorAll("img"));

  // Cambiar el orden de las imágenes aleatoriamente
  const imagenesAleatorias = cambiarOrdenAleatorio(imagenesEquipos);

  // Volver a agregar las imágenes en el orden aleatorio
  imagenesAleatorias.forEach(imgEquipo => {
    cajasoltar.appendChild(imgEquipo);
  });
}

function iniciarArrastre(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function permitirSoltar(event) {
  event.preventDefault();
}

function actualizarPuntos() {
  const pts = document.getElementById("puntaje");
  pts.innerHTML = "Puntos: " + puntos;

  var jugadoresGuardados = JSON.parse(localStorage.getItem('jugadores')) || [];

  if (jugadoresGuardados.length > 0) {
      var ultimoJugador = jugadoresGuardados[jugadoresGuardados.length - 1];
      
      // Actualizar el puntaje del último jugador en el array
      ultimoJugador.puntaje = puntos;

      // Obtener el último tiempo registrado
      var ultimoTiempo = contadorTiempo.textContent;

      if (cont === 6) {
          // Asignar el tiempo al último objeto en el array
          ultimoJugador.tiempo = ultimoTiempo;

          // Guardar cambios en el localStorage
          localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));

      } else {
          // Guardar cambios en el localStorage (solo si no es el final del juego)
          localStorage.setItem('jugadores', JSON.stringify(jugadoresGuardados));
      }
  } else {
      console.log("No hay jugadores almacenados en el array.");
  }
}



function soltar(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var elementoArrastrado = document.getElementById(data);
  
  if (elementoArrastrado) {
    if (event.target.hasAttribute("data-equipo")) {
      var equipoJugador = elementoArrastrado.getAttribute("data-equipo");
      var equipoCaja = event.target.getAttribute("data-equipo");

      if (equipoJugador === equipoCaja) {
        console.log("correcto");
        cont++;
        puntos = puntos + 3;
        actualizarPuntos();
        elementoArrastrado.draggable = false;
        elementoArrastrado.hidden = true;
        event.target.hidden = true;

        //reproducir el sonido
        var jugadorSoltado = jugadoresConEquipos.find(jugador => jugador.imagen === elementoArrastrado.src.split('/').pop());
        if (jugadorSoltado && jugadorSoltado.audio) {
          const audioJugador = new Audio(jugadorSoltado.audio);
          audioJugador.play();

          //mostrar nombre del jugador
          if (jugadorSoltado.nombre) {
            const nombreJugadorElement = document.getElementById("nombreJugador");
            nombreJugadorElement.innerHTML = jugadorSoltado.nombre;
        
            setTimeout(() => {
                nombreJugadorElement.innerHTML = ""; //limpiar etiqueta despues de 8 segundos
            }, 8000);
          }
        }
      
        //repoducir sonido con el nombre del jugador
        setTimeout(function() {
          if (jugadorSoltado && jugadorSoltado.auidioNombre) {
            const audioJugador = new Audio(jugadorSoltado.auidioNombre);
            audioJugador.play();
          }
        }, 8000);

        // Eliminar el jugador del array principal
        jugadoresConEquipos = jugadoresConEquipos.filter(jugador => jugador.imagen !== elementoArrastrado.src.split('/').pop());
        
        if (cont === 3) {
          console.log("Nivel Completado");
          
          // Esperar 2 segundos antes de mostrar la siguiente ronda
          setTimeout(() => {
            mostrarImagenesAleatorias();
          }, 3000);

        } else if(cont === 6){
          
          setTimeout(() => {
          console.log("felicidades se acabo el juego");
          window.location.href = "felicidades.html";

          // Esperar 2 segundos antes de redirigir a la página de felicitaciones
          }, 4000);
        }
      } else {
        console.log("incorrecto");
        if (puntos >= 2) {
          puntos = puntos - 2;
        } else {
          puntos = 0;
        }
        actualizarPuntos();

        //repoducir sonido de error
        var jugadorSoltadoError = jugadoresConEquipos.find(jugador => jugador.imagen === elementoArrastrado.src.split('/').pop());
        if (jugadorSoltadoError && jugadorSoltadoError.audioError) {
          const audioError = new Audio(jugadorSoltadoError.audioError);
          audioError.play();
        }

      }
    } 
  } 
}




actualizarPuntos();
mostrarImagenesAleatorias();