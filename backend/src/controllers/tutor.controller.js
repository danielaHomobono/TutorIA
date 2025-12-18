import { ApiError } from '../middleware/errorHandler.js';
import { StudentProfile, SessionContext, validateStudentProfile } from '../models/StudentProfile.js';
import { AdaptiveExplanationEngine, AdaptiveExerciseGenerator } from '../utils/adaptivePedagogy.js';

/**
 * Controlador: Explicar un tema (con personalización)
 * POST /api/tutor/explain
 * Body: { 
 *   subject, level, topic,
 *   profileData?: { age, levelDetail, priorKnowledge, difficulties, preferences },
 *   recentSessions?: []
 * }
 */
export const explainTopic = async (req, res, next) => {
  try {
    const { subject, level, topic, profileData, recentSessions } = req.body;

    // Las validaciones ya se hicieron en el middleware
    // Crear perfil y contexto
    const profile = new StudentProfile(profileData || {});
    const context = new SessionContext(recentSessions || []);

    // Generar explicación adaptativa usando IA
    const engine = new AdaptiveExplanationEngine(profile, context);
    const explanation = await engine.generateExplanation(subject, level, topic);

    res.json({
      success: true,
      data: explanation,
      personalization: {
        applied: !!profileData,
        contextUsed: recentSessions?.length || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Generar ejercicios (con personalización)
 * POST /api/tutor/exercises
 * Body: { 
 *   subject, level, topic, count,
 *   profileData?: { age, levelDetail, priorKnowledge, difficulties, preferences },
 *   recentSessions?: []
 * }
 */
export const generateExercises = async (req, res, next) => {
  try {
    const { subject, level, topic, count = 3, profileData, recentSessions } = req.body;

    // Las validaciones ya se hicieron en el middleware
    // Crear perfil y contexto
    const profile = new StudentProfile(profileData || {});
    const context = new SessionContext(recentSessions || []);

    // Generar ejercicios adaptativos usando IA
    const generator = new AdaptiveExerciseGenerator(profile, context);
    const exercises = await generator.generateExercises(subject, level, topic, count);

    res.json({
      success: true,
      data: exercises,
      personalization: {
        applied: !!profileData,
        difficulty: exercises[0]?.difficulty,
        contextUsed: recentSessions?.length || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador: Verificar respuesta
 * POST /api/tutor/check
 * Body: { exerciseId, userAnswer, correctAnswer }
 */
export const checkAnswer = async (req, res, next) => {
  try {
    const { exerciseId, userAnswer, correctAnswer } = req.body;

    // Las validaciones ya se hicieron en el middleware
    // Normalizar respuestas (trim, lowercase, etc.)
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.trim().toLowerCase();

    // Comparación simple
    const isCorrect = normalizedUser === normalizedCorrect;

    // TODO: Aquí podrías usar IA para dar feedback más inteligente
    const feedback = isCorrect
      ? '¡Correcto! Excelente trabajo. 🎉'
      : `Incorrecto. La respuesta correcta es: ${correctAnswer}`;

    res.json({
      success: true,
      isCorrect,
      feedback,
      correctAnswer: isCorrect ? undefined : correctAnswer,
    });
  } catch (error) {
    next(error);
  }
};
