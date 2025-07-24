"use strict";
// coreJuego.js - Lógica principal del Buscaminas
// Todas las variables globales del juego
var tablero = [];
var filas = 8;
var columnas = 8;
var minas = 10;
var minasRestantes = 10;
var banderasColocadas = 0;
var juegoTerminado = false;
var primerClick = true;
var temporizador = null;
var tiempo = 0;
var nombreJugador = "";
var dificultad = "facil";

// Estructura de una celda del tablero
function crearCelda(fila, columna) {
    // Devuelve un objeto celda con sus propiedades
    var celda = {
        fila: fila,
        columna: columna,
        esMina: false,
        revelada: false,
        bandera: false,
        minasCerca: 0
    };
    return celda;
}

// Genera el tablero vacío
function generarTablero() {
    var i, j;
    tablero = [];
    for (i = 0; i < filas; i++) {
        var filaTablero = [];
        for (j = 0; j < columnas; j++) {
            filaTablero.push(crearCelda(i, j));
        }
        tablero.push(filaTablero);
    }
}

// Coloca minas aleatoriamente en el tablero
function colocarMinas(filaInicial, columnaInicial) {
    // No colocar mina en la celda del primer click ni en sus adyacentes
    var minasColocadas = 0;
    while (minasColocadas < minas) {
        var f = Math.floor(Math.random() * filas);
        var c = Math.floor(Math.random() * columnas);
        if (!tablero[f][c].esMina && !(Math.abs(f - filaInicial) <= 1 && Math.abs(c - columnaInicial) <= 1)) {
            tablero[f][c].esMina = true;
            minasColocadas++;
        }
    }
}

// Calcula el número de minas adyacentes para cada celda
function calcularMinasCerca() {
    var i, j, df, dc, f, c, minasCerca;
    for (i = 0; i < filas; i++) {
        for (j = 0; j < columnas; j++) {
            minasCerca = 0;
            for (df = -1; df <= 1; df++) {
                for (dc = -1; dc <= 1; dc++) {
                    if (df === 0 && dc === 0) {
                        continue;
                    }
                    f = i + df;
                    c = j + dc;
                    if (f >= 0 && f < filas && c >= 0 && c < columnas && tablero[f][c].esMina) {
                        minasCerca++;
                    }
                }
            }
            tablero[i][j].minasCerca = minasCerca;
        }
    }
}

// Inicializa el juego: genera tablero y resetea variables
function inicializarJuego() {
    generarTablero();
    minasRestantes = minas;
    banderasColocadas = 0;
    juegoTerminado = false;
    primerClick = true;
    tiempo = 0;
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
}

// Llama a esta función tras el primer click para colocar minas y calcular números
function iniciarPartida(fila, columna) {
    colocarMinas(fila, columna);
    calcularMinasCerca();
    primerClick = false;
}

// Revela una celda y ejecuta la expansión si es necesario
function revelarCelda(fila, columna) {
    var celda = tablero[fila][columna];
    if (celda.revelada || celda.bandera || juegoTerminado) {
        return;
    }
    celda.revelada = true;
    if (celda.esMina) {
        // Si es mina, termina el juego
        terminarJuego(false);
        return;
    }
    if (celda.minasCerca === 0) {
        expandirCeldas(fila, columna);
    }
    if (verificarVictoria()) {
        terminarJuego(true);
    }
}

// Expande recursivamente las celdas vacías sin minas cercanas
function expandirCeldas(fila, columna) {
    var df, dc, f, c;
    for (df = -1; df <= 1; df++) {
        for (dc = -1; dc <= 1; dc++) {
            if (df === 0 && dc === 0) {
                continue;
            }
            f = fila + df;
            c = columna + dc;
            if (f >= 0 && f < filas && c >= 0 && c < columnas) {
                var celdaVecina = tablero[f][c];
                if (!celdaVecina.revelada && !celdaVecina.bandera && !celdaVecina.esMina) {
                    celdaVecina.revelada = true;
                    if (celdaVecina.minasCerca === 0) {
                        expandirCeldas(f, c);
                    }
                }
            }
        }
    }
}

// Marca o desmarca una bandera en la celda
function alternarBandera(fila, columna) {
    var celda = tablero[fila][columna];
    if (celda.revelada || juegoTerminado) {
        return;
    }
    if (celda.bandera) {
        celda.bandera = false;
        banderasColocadas--;
        minasRestantes++;
    } else {
        celda.bandera = true;
        banderasColocadas++;
        minasRestantes--;
    }
}

// Verifica si el jugador ha ganado
function verificarVictoria() {
    var i, j;
    for (i = 0; i < filas; i++) {
        for (j = 0; j < columnas; j++) {
            var celda = tablero[i][j];
            if (!celda.esMina && !celda.revelada) {
                return false;
            }
        }
    }
    return true;
}

// Calcula el puntaje de la partida
function calcularPuntaje() {
    // Ejemplo: mayor puntaje por victoria rápida y menos banderas usadas
    var base = 1000;
    var penalizacionTiempo = tiempo * 2;
    var penalizacionBanderas = banderasColocadas * 5;
    var puntaje = base - penalizacionTiempo - penalizacionBanderas;
    if (puntaje < 0) {
        puntaje = 0;
    }
    return puntaje;
}

// Cambia la dificultad del juego
function cambiarDificultad(nuevaDificultad) {
    if (nuevaDificultad === "facil") {
        filas = 8;
        columnas = 8;
        minas = 10;
        dificultad = "facil";
    } else if (nuevaDificultad === "medio") {
        filas = 12;
        columnas = 12;
        minas = 25;
        dificultad = "medio";
    } else if (nuevaDificultad === "dificil") {
        filas = 16;
        columnas = 16;
        minas = 40;
        dificultad = "dificil";
    }
    inicializarJuego();
    reiniciarUI();
}

// Modificar terminarJuego para guardar en ranking
function terminarJuego(gano) {
    var i, j;
    juegoTerminado = true;
    for (i = 0; i < filas; i++) {
        for (j = 0; j < columnas; j++) {
            var celda = tablero[i][j];
            if (celda.esMina) {
                celda.revelada = true;
            }
        }
    }
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
    // Guardar en ranking
    var puntaje = calcularPuntaje();
    guardarPartidaRanking(nombreJugador, puntaje, gano, tiempo);
    // Mostrar modal de victoria o derrota desde modales.js
    if (gano) {
        mostrarModalMensaje("¡Ganaste la partida!");
        reproducirSonidoVictoria();
    } else {
        mostrarModalMensaje("¡Perdiste! Pisaste una mina.");
        reproducirSonidoDerrota();
    }
}

// Reproducir sonidos
function reproducirSonidoVictoria() {
    var audio = document.getElementById("sonidoVictoria");
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}
function reproducirSonidoDerrota() {
    var audio = document.getElementById("sonidoDerrota");
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Chording: revela celdas adyacentes si hay tantas banderas como minas cerca
function chording(fila, columna) {
    var celda = tablero[fila][columna];
    if (!celda.revelada || celda.minasCerca === 0) {
        return;
    }
    var banderasCerca = 0;
    var df, dc, f, c;
    for (df = -1; df <= 1; df++) {
        for (dc = -1; dc <= 1; dc++) {
            if (df === 0 && dc === 0) {
                continue;
            }
            f = fila + df;
            c = columna + dc;
            if (f >= 0 && f < filas && c >= 0 && c < columnas) {
                if (tablero[f][c].bandera) {
                    banderasCerca++;
                }
            }
        }
    }
    if (banderasCerca === celda.minasCerca) {
        for (df = -1; df <= 1; df++) {
            for (dc = -1; dc <= 1; dc++) {
                if (df === 0 && dc === 0) {
                    continue;
                }
                f = fila + df;
                c = columna + dc;
                if (f >= 0 && f < filas && c >= 0 && c < columnas) {
                    if (!tablero[f][c].revelada && !tablero[f][c].bandera) {
                        revelarCelda(f, c);
                    }
                }
            }
        }
    }
}
// ... El resto de la lógica se completará en los siguientes pasos ... 