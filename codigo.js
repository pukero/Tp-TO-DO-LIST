let tareas = [];

function agregarIngresado() {
    let tareaTexto = document.getElementById("tarea").value.trim();
    if (tareaTexto === "") return;

    let timestamp = Date.now();
    let fecha = new Date(timestamp).toLocaleString();

    tareas.push({ texto: tareaTexto, completada: false, fechaCreacion: fecha, fechaCompletado: null });

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
    tareas[index].fechaCompletado = tareas[index].completada ? new Date().toLocaleString() : null;
    mostrarLista();
}

function ocultarLista() {
    document.getElementById("Lista").innerHTML = "";
}

