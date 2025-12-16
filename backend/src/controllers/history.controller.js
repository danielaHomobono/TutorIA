import { ApiError } from '../middleware/errorHandler.js';
import { createEnrichedSession } from '../models/Session.js';

// Almacenamiento en memoria (temporal)
// TODO: Reemplazar con base de datos (MongoDB, PostgreSQL, etc.)
let sessionsStore = [];

/**
 * Controlador: Obtener todas las sesiones
 * GET /api/history
 */
export const getSessions = async (req, res, next) => {
  try {
    // Ordenar por timestamp descendente (más recientes primero)
    const sortedSessions = [...sessionsStore].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.json({
      success: true,
      data: sortedSessions,
      count: sortedSessions.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Obtener una sesión por ID
 * GET /api/history/:id
 */
export const getSessionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const session = sessionsStore.find((s) => s.id === id);

    if (!session) {
      throw new ApiError('Sesión no encontrada', 404);
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Obtener sesiones por ID de estudiante
 * GET /api/history/student/:studentId
 */
export const getSessionsByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { limit = 10 } = req.query;

    // Filtrar sesiones del estudiante
    const studentSessions = sessionsStore
      .filter((s) => s.studentId === studentId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: studentSessions,
      count: studentSessions.length,
      studentId,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Guardar una nueva sesión (con campos enriquecidos)
 * POST /api/history
 */
export const saveSession = async (req, res, next) => {
  try {
    const sessionData = req.body;

    // La validación ya se hizo en el middleware
    // Agregar timestamp si no existe
    if (!sessionData.timestamp) {
      sessionData.timestamp = new Date();
    }

    // Crear sesión enriquecida con valores por defecto
    const enrichedSession = createEnrichedSession(sessionData);

    // Guardar en el almacén
    sessionsStore.push(enrichedSession);

    res.status(201).json({
      success: true,
      data: enrichedSession,
      message: 'Sesión guardada exitosamente',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Eliminar una sesión
 * DELETE /api/history/:id
 */
export const deleteSession = async (req, res, next) => {
  try {
    const { id } = req.params;

    const index = sessionsStore.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new ApiError('Sesión no encontrada', 404);
    }

    sessionsStore.splice(index, 1);

    res.json({
      success: true,
      message: 'Sesión eliminada exitosamente',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Limpiar todo el historial
 * DELETE /api/history
 */
export const clearHistory = async (req, res, next) => {
  try {
    const count = sessionsStore.length;
    sessionsStore = [];

    res.json({
      success: true,
      message: `${count} sesiones eliminadas exitosamente`,
    });
  } catch (error) {
    next(error);
  }
};
