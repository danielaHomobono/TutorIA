import express from 'express';
import {
  explainTopic,
  generateExercises,
  checkAnswer,
} from '../controllers/tutor.controller.js';
import {
  validateExplainRequest,
  validateExercisesRequest,
  validateCheckAnswerRequest,
  validateProfileData,
} from '../middleware/validators.js';

const router = express.Router();

/**
 * POST /api/tutor/explain
 * Explica un tema educativo
 */
router.post('/explain', validateExplainRequest, validateProfileData, explainTopic);

/**
 * POST /api/tutor/exercises
 * Genera ejercicios sobre un tema
 */
router.post('/exercises', validateExercisesRequest, validateProfileData, generateExercises);

/**
 * POST /api/tutor/check
 * Verifica la respuesta de un ejercicio
 */
router.post('/check', validateCheckAnswerRequest, checkAnswer);

export default router;
