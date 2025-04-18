//TODO: Estilar dialogs!

//const btnGuardar = document.getElementById("btn-guardar")
const svgbtn = document.getElementById("btn-svg")
const feedback = document.getElementById("feedback")
const formulario = document.getElementById("formulario")
const btnAgregar = document.getElementById("btn-agregar")
const horasContainer = document.getElementById("horas-container")
//const dialogFallido = document.getElementById("agregadofallo-dialog")

let horasGuardadas = [];

//TODO: Traer las horas ya guardadas.
const getHorasGuardadas = async () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            // Simulación de una llamada a la API para obtener las horas guardadas
            resolve(["08:00", "12:00", "18:00"]); // Simulación de datos

            // Si la llamada a la API falla, puedes rechazar la promesa
            //reject(new Error("Error al obtener las horas guardadas"));
        }, 1000); // Simula una espera de 1 segundo
    });
}

const crearElementoHora = (hora) => {
    const horaElemento = `<span id="span-${hora}" class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">
                    ${hora}
                    <button id="dtl-${hora}" type="button" onclick="eliminarHora('${hora}')" class="inline-flex items-center p-1 ms-2 text-sm text-yellow-400 bg-transparent rounded-xs hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300" data-dismiss-target="#badge-dismiss-yellow" aria-label="Remove">
                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Remove badge</span>
                    </button>
                    </span>
                    `

    return horaElemento
}

const getDltBtn = (hora) => {
    const btn = document.getElementById(`dtl-${hora}`);
    return btn
}

const getSpanHora = (hora) => {
    const span = document.getElementById(`span-${hora}`);
    return span
}

//TODO: Implementar la eliminación de la hora y el feedback correspondiente.
const eliminarHora = (hora) => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(true); // Simulación de éxito
        }, 1000); // Simula una espera de 1 segundo
    }).then((res) => {
        if (res) {
            horasGuardadas = horasGuardadas.filter((h) => h !== hora);
            const span = getSpanHora(hora);
            span.remove();
        }
        else{
            console.error("Error al eliminar la hora");
            feedback.setAttribute("class", "text-red-500 text-sm font-medium mt-2")
            feedback.innerHTML = "Oh no! No se pudo eliminar la hora! Intenta de nuevo."
            //dialogFallido.showModal()
        }
    })
}   

const guardarHora = (hora) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true); // Simulación de éxito
        }, 1000); // Simula una espera de 1 segundo
    }).then((res) => {
        if (res) {
            horasGuardadas.push(hora);
            const horaElemento = crearElementoHora(hora);
            horasContainer.innerHTML += horaElemento;
        }
        else{
            console.error("Error al guardar la hora");
            feedback.setAttribute("class", "text-red-500 text-sm font-medium mt-2")
            feedback.innerHTML = "Oh no! No se pudo guardar la hora! Intenta de nuevo."
            //dialogFallido.showModal()
        }
    })
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    btnAgregar.setAttribute("disabled", "true")
    svgbtn.setAttribute("class", "animate-spin")
    const hora = document.getElementById("time").value; // Obtener el valor de la hora ingresada

    if (horasGuardadas.includes(hora)) {
        feedback.setAttribute("class", "text-orange-400 text-sm font-medium mt-2")
        feedback.innerHTML = "Esa hora ya la guardaste!"
        //dialogFallido.showModal()

        svgbtn.setAttribute("class", "")
        btnAgregar.removeAttribute("disabled")
        return; // Salir si la hora ya está guardada
    }
    //TODO: Implementar el guardar Hora
    guardarHora(hora).then(() => {
        console.log("Hora guardada:", hora);
        btnAgregar.removeAttribute("disabled")

        feedback.setAttribute("class", "text-green-500 text-sm font-medium mt-2")
        feedback.innerHTML = "Hora guardada!"
        //dialogFallido.showModal()
        

    } ).catch((error) => {
        console.error("Error al guardar la hora:", error);
        feedback.setAttribute("class", "text-red-500 text-sm font-medium mt-2")
        feedback.innerHTML = "Oh no! No se pudo guardar la hora! Intenta de nuevo."
        //dialogFallido.showModal()
    }).finally(() => {
        svgbtn.setAttribute("class", "")
        btnAgregar.removeAttribute("disabled")

        setTimeout(() => {
            feedback.setAttribute("class", "hidden")
        }, 2000)
    })
})

function main() {
    getHorasGuardadas()
        .then((horas) => {
            horasGuardadas = horas;
            console.log(horasGuardadas);
            
            btnAgregar.removeAttribute("disabled")
            horasGuardadas.forEach((hora) => {
                const horaElemento = crearElementoHora(hora);
                horasContainer.innerHTML += horaElemento;
            });
        }).catch((error) => {
            console.error("Error al obtener las horas guardadas:", error);
            feedback.setAttribute("class", "text-red-500 text-sm font-medium mt-2")
            feedback.innerHTML = "Oh no! No se pudo cargar las horas guardadas! Revisa la conexión al servidor."
            //dialogFallido.showModal()
        });
}

main()