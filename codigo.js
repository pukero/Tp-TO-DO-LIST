let tareas = [];

function agregarIngresado() {
    let tareaTexto = document.getElementById("tarea").value.trim();
    if (tareaTexto === "") return;

    let timestamp = Date.now();
    let fecha = new Date(timestamp).toLocaleString();

    tareas.push({ 
        texto: tareaTexto, 
        completada: false, 
        fechaCreacion: fecha, 
        timestampCreacion: timestamp, 
        fechaCompletado: null, 
        timestampCompletado: null 
    });

    document.getElementById("tarea").value = "";
    mostrarLista();
}

function mostrarLista() {
    let lista = document.getElementById("Lista");
    lista.innerHTML = "";

    let html = "";

    tareas.forEach((tarea, index) => {
        html += `
            <div>
                <input type="checkbox" id="tarea-${index}" ${tarea.completada ? "checked" : ""} onchange="toggleCompletado(${index})">
                <span class="${tarea.completada ? "checked" : ""}">${tarea.texto}</span>
                <small style="font-size: 12px; color: gray;">(Agregado: ${tarea.fechaCreacion})</small>
                ${tarea.fechaCompletado ? `<br><small style="font-size: 12px; color: green;">(Completado: ${tarea.fechaCompletado})</small>` : ""}
            </div>
        `;
    });

    lista.innerHTML = html;
}

function toggleCompletado(index) {
    tareas[index].completada = !tareas[index].completada;

    if (tareas[index].completada) {
        tareas[index].timestampCompletado = Date.now();
        tareas[index].fechaCompletado = new Date(tareas[index].timestampCompletado).toLocaleString();
    } else {
        tareas[index].timestampCompletado = null;
        tareas[index].fechaCompletado = null;
    }

    mostrarLista();
}

function ocultarLista() {
    document.getElementById("Lista").innerHTML = "";
}

function mostrarTareaMasRapida() {
    let tareaMasRapida = null;
    let menorTiempo = Infinity;

    tareas.forEach(tarea => {
        if (tarea.completada && tarea.timestampCompletado && tarea.timestampCreacion) {
            let tiempo = tarea.timestampCompletado - tarea.timestampCreacion;
            if (tiempo < menorTiempo) {
                menorTiempo = tiempo;
                tareaMasRapida = tarea;
            }
        }
    });

    let resultado = document.getElementById("resultadoRapido");

    if (tareaMasRapida) {
        resultado.innerText = `La tarea más rápida fue "${tareaMasRapida.texto}", completada en ${(menorTiempo / 1000).toFixed(2)} segundos.`;
    } else {
        resultado.innerText = "Todavía no se completó ninguna tarea.";
    }
}
