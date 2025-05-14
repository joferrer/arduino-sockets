import { Router } from "express";
import { cancelarTarea, listarTareas, programarTarea } from "./contador";
import { WsServer } from "../server/wsServer";

export const router = Router()

router.post('/programar', (req, res) => {
  const { id, hora, minuto } = req.body;

  if (!id || hora === undefined || minuto === undefined) {
     res.status(400).json({ error: 'Faltan campos: id, hora, minuto' });
     return;
  }

  programarTarea(id, hora, minuto, () => {
    
    console.log(`Tarea ejecutada: ${id} a las ${hora}:${minuto}`);
    // TODO: Aquí hay que definir el msg que envia al arduino.
    WsServer.sendToAll(`Tarea ejecutada: ${id} a las ${hora}:${minuto}`);
    
  });

  res.json({ mensaje: `Tarea ${id} programada para ${hora}:${minuto}` });
});

router.post('/cancelar', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ error: 'Falta id' });
    return;
}

  const cancelada = cancelarTarea(id);
  if (!cancelada) {
     res.status(404).json({ error: 'Tarea no encontrada' });
    return;

  }

  res.json({ mensaje: `Tarea ${id} cancelada` });
});

router.get('/horas', (_req, res) => {
  res.json(listarTareas());
});