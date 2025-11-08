import { Router } from 'express';
import {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} from '../controllers/participants.js'; // <-- Importa los controladores

const router = Router();

// 👇 ¡Esta es la ruta que estabas probando!
router.get('/listado', getParticipants);

// El resto de tus rutas
router.get('/participante/:id', getParticipantById);
router.post('/registro', createParticipant);
router.put('/participante/:id', updateParticipant);
router.delete('/participante/:id', deleteParticipant);

export default router;