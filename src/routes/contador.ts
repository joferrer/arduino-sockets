type Task = {
  timeoutId: NodeJS.Timeout;
  hora: number;
  minuto: number;
};

const tareas = new Map<string, Task>();

function programarTarea(id: string, hora: number, minuto: number, accion: () => void) {
  const ahora = new Date();
  const destino = new Date();

  destino.setHours(hora, minuto, 0, 0);

  // Si ya pasó hoy, se programa para mañana
  if (destino <= ahora) {
    destino.setDate(destino.getDate() + 1);
  }

  const delay = destino.getTime() - ahora.getTime();

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
