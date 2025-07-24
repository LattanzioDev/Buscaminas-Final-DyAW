"use strict";
// contacto.js - Validación del formulario de contacto

document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.getElementById("formularioContacto");
    formulario.addEventListener("submit", manejarEnvioContacto);
});

// Maneja el envío del formulario de contacto
function manejarEnvioContacto(evento) {
    evento.preventDefault();
    var nombre = document.getElementById("nombreContacto").value.trim();
    var email = document.getElementById("emailContacto").value.trim();
    var mensaje = document.getElementById("mensajeContacto").value.trim();
    var valido = true;

    // Validar nombre
    if (!validarNombreJugador(nombre)) {
        mostrarError("errorNombreContacto", "Nombre inválido (mínimo 3 letras, solo letras y espacios)");
        valido = false;
    } else {
        mostrarError("errorNombreContacto", "");
    }
    // Validar email
    if (!validarEmail(email)) {
        mostrarError("errorEmailContacto", "Email inválido");
        valido = false;
    } else {
        mostrarError("errorEmailContacto", "");
    }
    // Validar mensaje
    if (!validarMensaje(mensaje)) {
        mostrarError("errorMensajeContacto", "El mensaje debe tener más de 5 caracteres");
        valido = false;
    } else {
        mostrarError("errorMensajeContacto", "");
    }
    if (valido) {
        // Enviar por mailto
        var asunto = encodeURIComponent("Contacto Buscaminas");
        var cuerpo = encodeURIComponent("Nombre: " + nombre + "\nEmail: " + email + "\nMensaje: " + mensaje);
        window.location.href = "mailto:?subject=" + asunto + "&body=" + cuerpo;
    }
}

// Muestra mensaje de error en el input correspondiente
function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
} 