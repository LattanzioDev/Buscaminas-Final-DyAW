"use strict";

document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.getElementById("formularioContacto");
    var modo = localStorage.getItem("buscaminasModo");
    if (modo === "oscuro") {
        document.body.setAttribute("data-modo", "oscuro");
    } else {
        document.body.setAttribute("data-modo", "claro");
    }
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
        // Construir mailto
        var asunto = encodeURIComponent("Contacto Buscaminas");
        var cuerpo = encodeURIComponent(
            "Nombre: " + nombre +
            "\nEmail: " + email +
            "\nMensaje: " + mensaje
        );
        // Crear un enlace temporal y hacer click
        var mailto = "mailto:valenlattanzio@gmail.com?subject=" + asunto + "&body=" + cuerpo;
        var enlace = document.createElement("a");
        enlace.href = mailto;
        enlace.style.display = "none";
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);

        setTimeout(function() {
            alert("Si no se abrió tu cliente de correo, por favor envía el mensaje manualmente a: valenlattanzio@gmail.com");
        }, 1000);
    }
}

// Muestra mensaje de error en el input correspondiente
function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;

}
