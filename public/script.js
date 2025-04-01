
const btnGuardar = document.getElementById("btn-guardar")
const horasContainer = document.getElementById("horas-container")
const dialogFallido = document.getElementById("agregadofallo-dialog")

let horasGuardadas = [];

//TODO: Traer las horas ya guardadas.
const getHorasGuardadas = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["08:00", "12:00", "18:00"]); // Simulación de datos
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

const eliminarHora = (hora) => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(false); // Simulación de éxito
        }, 1000); // Simula una espera de 1 segundo
    }).then((res) => {
        if (res) {
            horasGuardadas = horasGuardadas.filter((h) => h !== hora);
            const span = getSpanHora(hora);
            span.remove();
        }
        else{
            console.error("Error al eliminar la hora");
            dialogFallido.showModal()
        }
    })
}   

function main() {
    getHorasGuardadas()
        .then((horas) => {
            horasGuardadas = horas;
            console.log(horasGuardadas);

            btnGuardar.removeAttribute("disabled")
            horasGuardadas.forEach((hora) => {
                const horaElemento = crearElementoHora(hora);
                horasContainer.innerHTML += horaElemento;
            });
        })
}

main()