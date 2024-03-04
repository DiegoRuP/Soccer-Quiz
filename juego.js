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
setInterval(actualizarTiempo, 1000);

//PARA APARECER 3 JUGADORES DE FORMA ALEATORIA
const cajaimagenes = document.getElementById("cajaimagenes");

const imagenesJugadores = [
  "src/bellingham.png",
  "src/benzema.png",
  "src/chicharo.png",
  "src/cr7.png",
  "src/dibu.png",
  "src/haaland.png",
  "src/marco.png",
  "src/mbappe.png",
  "src/messi.png"
];

function obtenerImagenesAleatorias() {
  const imagenesAleatorias = imagenesJugadores.slice();
  for (let i = imagenesAleatorias.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imagenesAleatorias[i], imagenesAleatorias[j]] = [imagenesAleatorias[j], imagenesAleatorias[i]];
  }
  return imagenesAleatorias.slice(0, 3);
}

function mostrarImagenesAleatorias() {
  const imagenesAleatorias = obtenerImagenesAleatorias();
    cajaimagenes.innerHTML = "";
    imagenesAleatorias.forEach(imagen => {
    const img = document.createElement("img");
    img.src = imagen;
    img.alt = "Jugador";
    cajaimagenes.appendChild(img);
  });
}
mostrarImagenesAleatorias();

