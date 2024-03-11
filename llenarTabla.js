function llenarTablaPosiciones() {
    var tablaPosiciones = document.getElementById("tablaPosiciones");
    tablaPosiciones.innerHTML = ""; // Limpiar la tabla antes de llenarla
    
    // Obtener los jugadores del localStorage y ordenarlos por puntaje de mayor a menor
    var jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    jugadores.sort((a, b) => b.puntaje - a.puntaje);

    // Mostrar los nombres de los tres primeros jugadores en los elementos con IDs 1ero, 2do y 3ero
    for (let i = 0; i < Math.min(3, jugadores.length); i++) {
        var puesto = i + 1;
        if(puesto==1){
            document.getElementById("1ero").textContent = jugadores[i].nombre;
        }else if(puesto==2){
            document.getElementById("2do").textContent = jugadores[i].nombre;
        }else{
            document.getElementById("3ero").textContent = jugadores[i].nombre;
        }
    }

    // Crear la fila para el encabezado de la tabla
    var filaEncabezado = document.createElement("tr");
    var celdaFutbolero = document.createElement("td");
    var celdaPuntajeTitulo = document.createElement("td");

    celdaFutbolero.classList.add("encabezado-Puntaje");
    celdaPuntajeTitulo.classList.add("encabezado-Puntaje");

    celdaFutbolero.textContent = "Futbolero";
    celdaPuntajeTitulo.textContent = "Puntaje";

    filaEncabezado.appendChild(celdaFutbolero);
    filaEncabezado.appendChild(celdaPuntajeTitulo);

    tablaPosiciones.appendChild(filaEncabezado);


    // Llenar la tabla con los datos de los jugadores
    jugadores.forEach(function(jugador, index) {
        var fila = document.createElement("tr");
        var celdaNombre = document.createElement("td");
        var celdaPuntaje = document.createElement("td");

        celdaNombre.textContent = jugador.nombre;
        celdaPuntaje.textContent = jugador.puntaje;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuntaje);

        tablaPosiciones.appendChild(fila);
    });
}

function llenarTablaPosicionesTiempo() {
    var tablaPosiciones = document.getElementById("tablaPosicionesTiempo");
    tablaPosiciones.innerHTML = ""; // Limpiar la tabla antes de llenarla
    
    // Obtener los jugadores del localStorage y ordenarlos por tiempo de menor a mayor (ascendente)
    var jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    jugadores.sort((a, b) => convertirTiempoASegundos(a.mejorTiempo) - convertirTiempoASegundos(b.mejorTiempo)); // Ordenar de menor a mayor

    // Crear la fila para el encabezado de la tabla
    var filaEncabezado = document.createElement("tr");
    var celdaFutbolero = document.createElement("td");
    var celdaPuntajeTitulo = document.createElement("td");

    // Agregar clases a las celdas del encabezado
    celdaFutbolero.classList.add("encabezado-Tiempo");
    celdaPuntajeTitulo.classList.add("encabezado-Tiempo");

    celdaFutbolero.textContent = "Futbolero";
    celdaPuntajeTitulo.textContent = "Tiempo";

    filaEncabezado.appendChild(celdaFutbolero);
    filaEncabezado.appendChild(celdaPuntajeTitulo);

    tablaPosiciones.appendChild(filaEncabezado);


    // Llenar la tabla con los datos de los jugadores
    jugadores.forEach(function(jugador, index) {
        var fila = document.createElement("tr");
        var celdaNombre = document.createElement("td");
        var celdaTiempo = document.createElement("td");

        celdaNombre.textContent = jugador.nombre;
        celdaTiempo.textContent = jugador.mejorTiempo;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaTiempo);

        tablaPosiciones.appendChild(fila);
    });
}

function convertirTiempoASegundos(tiempo) {
    var partesTiempo = tiempo.split(":");
    var minutos = parseInt(partesTiempo[0]);
    var segundos = parseInt(partesTiempo[1]);
    return minutos * 60 + segundos;
}

// Llamar a la función para llenar la tabla al cargar la página
llenarTablaPosiciones();
llenarTablaPosicionesTiempo();