"use strict";

function inicializarEventos() {
    var tableroDiv = document.getElementById("tablero");
    tableroDiv.addEventListener("click", manejarClickCelda);
    tableroDiv.addEventListener("contextmenu", manejarClickDerechoCelda);
    tableroDiv.addEventListener("dblclick", manejarChordingCelda);
    document.getElementById("botonReiniciar").addEventListener("click", reiniciarPartida);
    document.addEventListener("keydown", manejarTecla);
}

// Maneja el click izquierdo en una celda
function manejarClickCelda(evento) {
    var objetivo = evento.target;
    if (!objetivo.classList.contains("celda")) {
        return;
    }
    var fila = parseInt(objetivo.getAttribute("data-fila"), 10);
    var columna = parseInt(objetivo.getAttribute("data-columna"), 10);
    if (primerClick) {
        iniciarPartida(fila, columna);
        iniciarTemporizador();
    }
    revelarCelda(fila, columna);
    renderizarTablero();
    actualizarContadorMinas();
}

// Maneja el click derecho para colocar/quitar bandera
function manejarClickDerechoCelda(evento) {
    evento.preventDefault();
    var objetivo = evento.target;
    if (!objetivo.classList.contains("celda")) {
        return;
    }
    var fila = parseInt(objetivo.getAttribute("data-fila"), 10);
    var columna = parseInt(objetivo.getAttribute("data-columna"), 10);
    alternarBandera(fila, columna);
    renderizarTablero();
    actualizarContadorMinas();
}

// Maneja el doble click (chording)
function manejarChordingCelda(evento) {
    var objetivo = evento.target;
    if (!objetivo.classList.contains("celda")) {
        return;
    }
    var fila = parseInt(objetivo.getAttribute("data-fila"), 10);
    var columna = parseInt(objetivo.getAttribute("data-columna"), 10);
    chording(fila, columna);
    renderizarTablero();
    actualizarContadorMinas();
}

// Maneja el reinicio de partida
function reiniciarPartida() {
    inicializarJuego();
    reiniciarUI();
}

// Maneja la barra espaciadora para reiniciar
function manejarTecla(evento) {
    if (evento.code === "Space" || evento.keyCode === 32) {
        reiniciarPartida();
    }
}

// Inicia el temporizador al primer click
function iniciarTemporizador() {
    if (temporizador) {
        clearInterval(temporizador);
    }
    temporizador = setInterval(function() {
        tiempo++;
        actualizarTemporizador();
    }, 1000);
}

// Manejador para selección de dificultad
function inicializarSelectorDificultad() {
    var selector = document.getElementById("selectorDificultad");
    if (selector) {
        selector.addEventListener("change", function() {
            cambiarDificultad(selector.value);
        });
    }
}

// Mostrar modal de nombre de jugador al inicio
function pedirNombreJugador() {
    mostrarModalNombre();
    var formulario = document.getElementById("formularioNombre");
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();
        var input = document.getElementById("inputNombre");
        var nombre = input.value.trim();
        if (validarNombreJugador(nombre)) {
            nombreJugador = nombre;
            ocultarModalNombre();
        } else {
            document.getElementById("errorNombre").textContent = "Nombre inválido (mínimo 3 letras)";
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarJuego();
    reiniciarUI();
    inicializarEventos();
    inicializarSelectorDificultad();
    pedirNombreJugador();
}); 