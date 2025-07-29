"use strict";

// Guarda una partida en LocalStorage
function guardarPartidaRanking(nombre, puntaje, gano, tiempo) {
    var ranking = obtenerRanking();
    var fecha = obtenerFechaHoraActual();
    var partida = {
        nombre: nombre,
        puntaje: puntaje,
        gano: gano,
        fecha: fecha,
        tiempo: tiempo
    };
    ranking.push(partida);
    localStorage.setItem("buscaminasRanking", JSON.stringify(ranking));
}

// Obtiene el ranking desde LocalStorage
function obtenerRanking() {
    var datos = localStorage.getItem("buscaminasRanking");
    if (datos) {
        return JSON.parse(datos);
    }
    return [];
}

// Devuelve la fecha y hora actual en formato DD/MM/YYYY
function obtenerFechaHoraActual() {
    var ahora = new Date();
    var dia = ("0" + ahora.getDate()).slice(-2);
    var mes = ("0" + (ahora.getMonth() + 1)).slice(-2);
    var anio = ahora.getFullYear();
    var horas = ("0" + ahora.getHours()).slice(-2);
    var minutos = ("0" + ahora.getMinutes()).slice(-2);
    return dia + "/" + mes + "/" + anio + " " + horas + ":" + minutos;
}

// Muestra el ranking en la tabla del modal
function mostrarRanking(orden) {
    var ranking = obtenerRanking();
    if (orden === "puntaje") {
        ranking.sort(function(a, b) { return b.puntaje - a.puntaje; });
    } else if (orden === "fecha") {
        ranking.sort(function(a, b) { return b.fecha < a.fecha ? 1 : -1; });
    }
    var tabla = document.getElementById("tablaRanking");
    var html = "<tr><th>Jugador</th><th>Puntaje</th><th>Victoria</th><th>Fecha</th><th>Duración (s)</th></tr>";
    for (var i = 0; i < ranking.length; i++) {
        html += "<tr>" +
            "<td>" + ranking[i].nombre + "</td>" +
            "<td>" + ranking[i].puntaje + "</td>" +
            "<td>" + (ranking[i].gano ? "Sí" : "No") + "</td>" +
            "<td>" + ranking[i].fecha + "</td>" +
            "<td>" + ranking[i].tiempo + "</td>" +
            "</tr>";
    }
    tabla.innerHTML = html;
}

document.getElementById("ordenarPorPuntaje").addEventListener("click", function() {
    mostrarRanking("puntaje");
});
document.getElementById("ordenarPorFecha").addEventListener("click", function() {
    mostrarRanking("fecha");
});

document.addEventListener("DOMContentLoaded", function() {
    mostrarRanking("puntaje");
}); 