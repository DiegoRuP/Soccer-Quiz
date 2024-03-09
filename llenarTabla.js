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

    celdaFutbolero.textContent = "Futbolero";
    celdaPuntajeTitulo.textContent = "Puntaje";

    filaEncabezado.appendChild(celdaFutbolero);
    filaEncabezado.appendChild(celdaPuntajeTitulo);

    filaEncabezado.classList.add("encabezadoTabla"); // Agregar clase de estilo

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

// Llamar a la función para llenar la tabla al cargar la página
llenarTablaPosiciones();