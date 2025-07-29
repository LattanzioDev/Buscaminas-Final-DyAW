"use strict";

// Valida el nombre del jugador 
function validarNombreJugador(nombre) {
    if (typeof nombre !== "string") {
        return false;
    }
    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,}$/;
    return regex.test(nombre);
}

// Valida el email (formato básico)
function validarEmail(email) {
    var regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
}

// Valida el mensaje del contacto 
function validarMensaje(mensaje) {
    return typeof mensaje === "string" && mensaje.length > 5;
} 