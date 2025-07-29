"use strict";

// Muestra el modal de mensaje (victoria/derrota)
function mostrarModalMensaje(mensaje) {
    var modal = document.getElementById("modalMensaje");
    var mensajeSpan = document.getElementById("mensajeResultado");
    mensajeSpan.textContent = mensaje;
    modal.classList.remove("oculto");
}

// Oculta el modal de mensaje
function ocultarModalMensaje() {
    var modal = document.getElementById("modalMensaje");
    modal.classList.add("oculto");
}

document.getElementById("botonCerrarModal").addEventListener("click", ocultarModalMensaje);

// Muestra el modal de ranking
function mostrarModalRanking() {
    var modal = document.getElementById("modalRanking");
    modal.classList.remove("oculto");
}

// Oculta el modal de ranking
function ocultarModalRanking() {
    var modal = document.getElementById("modalRanking");
    modal.classList.add("oculto");
}

document.getElementById("botonRanking").addEventListener("click", mostrarModalRanking);
document.getElementById("botonCerrarRanking").addEventListener("click", ocultarModalRanking);

// Muestra el modal para ingresar nombre de jugador
function mostrarModalNombre() {
    var modal = document.getElementById("modalNombre");
    modal.classList.remove("oculto");
}

// Oculta el modal de nombre
function ocultarModalNombre() {
    var modal = document.getElementById("modalNombre");
    modal.classList.add("oculto");
} 