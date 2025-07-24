"use strict";
// ui.js - Funciones para actualizar la interfaz de usuario del Buscaminas

// Renderiza el tablero en el DOM
function renderizarTablero() {
    var contenedor = document.getElementById("tablero");
    contenedor.innerHTML = "";
    contenedor.style.gridTemplateColumns = "repeat(" + columnas + ", 36px)";
    contenedor.style.gridTemplateRows = "repeat(" + filas + ", 36px)";
    var i, j, celda, divCelda;
    for (i = 0; i < filas; i++) {
        for (j = 0; j < columnas; j++) {
            celda = tablero[i][j];
            divCelda = document.createElement("div");
            divCelda.className = "celda";
            divCelda.setAttribute("data-fila", i);
            divCelda.setAttribute("data-columna", j);
            if (celda.revelada) {
                divCelda.className += " revelada";
                if (celda.esMina) {
                    divCelda.className += " mina";
                    divCelda.textContent = "💣";
                } else if (celda.minasCerca > 0) {
                    divCelda.className += " numero" + celda.minasCerca;
                    divCelda.textContent = celda.minasCerca;
                }
            } else if (celda.bandera) {
                divCelda.className += " bandera";
                divCelda.textContent = "🚩";
            }
            contenedor.appendChild(divCelda);
        }
    }
}

// Actualiza el contador de minas restantes
function actualizarContadorMinas() {
    var contador = document.getElementById("contadorMinas");
    contador.textContent = minasRestantes;
}

// Actualiza el temporizador
function actualizarTemporizador() {
    var temporizadorSpan = document.getElementById("temporizador");
    var texto = ("000" + tiempo).slice(-3);
    temporizadorSpan.textContent = texto;
}

// Reinicia la UI del tablero y contadores
function reiniciarUI() {
    renderizarTablero();
    actualizarContadorMinas();
    actualizarTemporizador();
}

// Alterna entre modo oscuro y claro
function alternarModoOscuro() {
    var body = document.body;
    var modoActual = body.getAttribute("data-modo");
    if (modoActual === "oscuro") {
        body.setAttribute("data-modo", "claro");
        localStorage.setItem("buscaminasModo", "claro");
    } else {
        body.setAttribute("data-modo", "oscuro");
        localStorage.setItem("buscaminasModo", "oscuro");
    }
}

// Aplica el modo guardado en localStorage
function aplicarModoGuardado() {
    var modo = localStorage.getItem("buscaminasModo");
    if (modo === "oscuro") {
        document.body.setAttribute("data-modo", "oscuro");
    } else {
        document.body.setAttribute("data-modo", "claro");
    }
}

document.getElementById("botonModo").addEventListener("click", alternarModoOscuro);
document.addEventListener("DOMContentLoaded", aplicarModoGuardado); 