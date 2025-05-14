import dayjs  from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type Task = {
  timeoutId: NodeJS.Timeout;
  hora: number;
  minuto: number;
};

const tareas = new Map<string, Task>();

function programarTarea(id: string, hora: number, minuto: number, accion: () => void) {
  const ahora = dayjs().tz('America/Bogota'); // hora actual en Colombia
  let destino = dayjs().tz('America/Bogota').hour(hora).minute(minuto).second(0).millisecond(0);

  
  //destino.setHours(hora, minuto, 0, 0);

  // Si ya pasó hoy, se programa para mañana
  if (destino.isBefore(ahora)) {
    destino = destino.add(1, 'day'); // programar para el día siguiente si ya pasó
  }
    console.log(`(${ahora.format()}) -Programando tarea ${id} para ${hora}:${minuto} (${destino.format()})`);

   const delay = destino.valueOf() - ahora.valueOf();

  const timeoutId = setTimeout(() => {
    accion();
    //tareas.delete(id); // Eliminar después de ejecutarse
    // En lugar de eliminar, reprogramamos para el día siguiente
    programarTarea(id, hora, minuto, accion);
  }, delay);

  tareas.set(id, { timeoutId, hora, minuto });
}

function cancelarTarea(id: string): boolean {
  const tarea = tareas.get(id);
  if (!tarea) return false;

  clearTimeout(tarea.timeoutId);
  tareas.delete(id);
  return true;
}

function listarTareas() {
  return Array.from(tareas.entries()).map(([id, { hora, minuto }]) => ({
    id,
    hora,
    minuto,
  }));
}

export { programarTarea, cancelarTarea, listarTareas };
