import { Router } from 'express';
import {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} from '../controllers/participants.js';

const router = Router();

router.get('/listado', getParticipants);
router.get('/participante/:id', getParticipantById);
router.post('/registro', createParticipant);
router.put('/participante/:id', updateParticipant);
router.delete('/participante/:id', deleteParticipant);

export default router;
