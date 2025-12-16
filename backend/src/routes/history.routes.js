import express from 'express';
import {
  getSessions,
  getSessionById,
  getSessionsByStudent,
  saveSession,
  deleteSession,
  clearHistory,
} from '../controllers/history.controller.js';
import { validateSessionData, validateParamId } from '../middleware/validators.js';

const router = express.Router();

/**
 * GET /api/history
 * Obtiene todas las sesiones del historial
 */
router.get('/', getSessions);

/**
 * POST /api/history
 * Guarda una nueva sesión en el historial
 */
router.post('/', validateSessionData, saveSession);

/**
 * DELETE /api/history/all
 * Limpia todo el historial
 */
router.delete('/all', clearHistory);

/**
 * GET /api/history/student/:studentId
 * Obtiene todas las sesiones de un estudiante específico
 */
router.get('/student/:studentId', validateParamId('studentId'), getSessionsByStudent);

/**
 * GET /api/history/:id
 * Obtiene una sesión específica por ID
 */
router.get('/:id', validateParamId('id'), getSessionById);

/**
 * DELETE /api/history/:id
 * Elimina una sesión específica
 */
router.delete('/:id', validateParamId('id'), deleteSession);

export default router;
