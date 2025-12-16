/**
 * Middleware de validaciones
 * Funciones reutilizables para validar datos de entrada
 */

import { ApiError } from './errorHandler.js';
import { validateStudentProfile } from '../models/StudentProfile.js';
import { validateSession } from '../models/Session.js';

/**
 * Middleware: Valida datos de perfil del estudiante
 */
export function validateProfileData(req, res, next) {
  const { profileData } = req.body;

  if (!profileData) {
    // Es opcional, continuar
    return next();
  }

  const validation = validateStudentProfile(profileData);
  if (!validation.valid) {
    return next(new ApiError(`Datos de perfil inválidos: ${validation.errors.join(', ')}`, 400));
  }

  next();
}

/**
 * Middleware: Valida request de explicación
 */
export function validateExplainRequest(req, res, next) {
  const { subject, level, topic } = req.body;

  if (!subject || !level || !topic) {
    return next(new ApiError('Faltan campos requeridos: subject, level, topic', 400));
  }

  if (!['matematica', 'fisica'].includes(subject)) {
    return next(new ApiError('subject debe ser "matematica" o "fisica"', 400));
  }

  if (!['secundaria', 'universidad'].includes(level)) {
    return next(new ApiError('level debe ser "secundaria" o "universidad"', 400));
  }

  if (typeof topic !== 'string' || topic.trim().length < 3) {
    return next(new ApiError('topic debe ser un string de al menos 3 caracteres', 400));
  }

  next();
}

/**
 * Middleware: Valida request de ejercicios
 */
export function validateExercisesRequest(req, res, next) {
  const { subject, level, topic, count } = req.body;

  if (!subject || !level || !topic) {
    return next(new ApiError('Faltan campos requeridos: subject, level, topic', 400));
  }

  if (!['matematica', 'fisica'].includes(subject)) {
    return next(new ApiError('subject debe ser "matematica" o "fisica"', 400));
  }

  if (!['secundaria', 'universidad'].includes(level)) {
    return next(new ApiError('level debe ser "secundaria" o "universidad"', 400));
  }

  if (count !== undefined && (count < 1 || count > 10)) {
    return next(new ApiError('count debe estar entre 1 y 10', 400));
  }

  next();
}

/**
 * Middleware: Valida request de verificación de respuesta
 */
export function validateCheckAnswerRequest(req, res, next) {
  const { exerciseId, userAnswer, correctAnswer } = req.body;

  if (!exerciseId || !userAnswer || !correctAnswer) {
    return next(new ApiError('Faltan campos requeridos: exerciseId, userAnswer, correctAnswer', 400));
  }

  next();
}

/**
 * Middleware: Valida datos de sesión para guardar
 */
export function validateSessionData(req, res, next) {
  const sessionData = req.body;

  const validation = validateSession(sessionData);
  if (!validation.valid) {
    return next(new ApiError(`Datos de sesión inválidos: ${validation.errors.join(', ')}`, 400));
  }

  next();
}

/**
 * Middleware: Valida ID de parámetro
 */
export function validateParamId(paramName = 'id') {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return next(new ApiError(`${paramName} es requerido y debe ser un string válido`, 400));
    }

    next();
  };
}
