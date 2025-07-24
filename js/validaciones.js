"use strict";
// validaciones.js - Funciones de validación para formularios y entradas

// Valida el nombre del jugador (mínimo 3 letras, solo letras y espacios)
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

// Valida el mensaje del contacto (más de 5 caracteres)
function validarMensaje(mensaje) {
    return typeof mensaje === "string" && mensaje.length > 5;
} 