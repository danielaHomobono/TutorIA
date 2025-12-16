/**
 * Modelo de Session enriquecido con campos de personalización
 */

/**
 * Valida el objeto de preferencias de aprendizaje
 */
export function validatePreferences(preferences) {
  if (!preferences || typeof preferences !== 'object') {
    return { valid: false, error: 'preferences debe ser un objeto' };
  }

  const validKeys = ['easyReading', 'examples', 'analogies', 'stepByStep', 'visualAids', 'realWorldContext'];
  const keys = Object.keys(preferences);

  for (const key of keys) {
    if (!validKeys.includes(key)) {
      return { valid: false, error: `Clave inválida en preferences: ${key}` };
    }
    if (typeof preferences[key] !== 'boolean') {
      return { valid: false, error: `El valor de ${key} debe ser boolean` };
    }
  }

  return { valid: true };
}

/**
 * Valida las métricas de desempeño
 */
export function validatePerformanceMetrics(metrics) {
  if (!metrics || typeof metrics !== 'object') {
    return { valid: false, error: 'Métricas de desempeño deben ser un objeto' };
  }

  const { correctRate, retryCount, timeSpent } = metrics;

  if (correctRate !== undefined) {
    if (typeof correctRate !== 'number' || correctRate < 0 || correctRate > 100) {
      return { valid: false, error: 'correctRate debe ser un número entre 0 y 100' };
    }
  }

  if (retryCount !== undefined) {
    if (!Number.isInteger(retryCount) || retryCount < 0) {
      return { valid: false, error: 'retryCount debe ser un entero no negativo' };
    }
  }

  if (timeSpent !== undefined) {
    if (!Number.isInteger(timeSpent) || timeSpent < 0) {
      return { valid: false, error: 'timeSpent debe ser un entero no negativo (en segundos)' };
    }
  }

  return { valid: true };
}

/**
 * Valida una sesión completa
 */
export function validateSession(session) {
  const errors = [];

  // Campos obligatorios
  if (!session.subject || !['matematica', 'fisica'].includes(session.subject)) {
    errors.push('subject debe ser "matematica" o "fisica"');
  }

  if (!session.level || !['secundaria', 'universidad'].includes(session.level)) {
    errors.push('level debe ser "secundaria" o "universidad"');
  }

  if (!session.topic || typeof session.topic !== 'string' || session.topic.trim().length < 3) {
    errors.push('topic debe ser un string de al menos 3 caracteres');
  }

  if (!session.explanation || typeof session.explanation !== 'object') {
    errors.push('explanation es requerida y debe ser un objeto');
  }

  if (!Array.isArray(session.exercises)) {
    errors.push('exercises debe ser un array');
  }

  if (!session.score || typeof session.score !== 'object') {
    errors.push('score es requerido');
  } else {
    const { correct, total, percentage } = session.score;
    if (typeof correct !== 'number' || correct < 0) {
      errors.push('score.correct debe ser un número no negativo');
    }
    if (typeof total !== 'number' || total < 0) {
      errors.push('score.total debe ser un número no negativo');
    }
    if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
      errors.push('score.percentage debe ser un número entre 0 y 100');
    }
  }

  // Campos opcionales nuevos
  if (session.studentId !== undefined) {
    if (typeof session.studentId !== 'string' || session.studentId.trim().length === 0) {
      errors.push('studentId debe ser un string no vacío');
    }
  }

  if (session.preferences !== undefined) {
    const prefValidation = validatePreferences(session.preferences);
    if (!prefValidation.valid) {
      errors.push(prefValidation.error);
    }
  }

  if (session.performanceMetrics !== undefined) {
    const metricsValidation = validatePerformanceMetrics(session.performanceMetrics);
    if (!metricsValidation.valid) {
      errors.push(metricsValidation.error);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Crea un objeto de sesión enriquecido con valores por defecto
 */
export function createEnrichedSession(data) {
  return {
    id: data.id,
    studentId: data.studentId || null,
    subject: data.subject,
    level: data.level,
    topic: data.topic,
    explanation: data.explanation,
    exercises: data.exercises || [],
    score: data.score || { correct: 0, total: 0, percentage: 0 },
    preferences: data.preferences || null,
    performanceMetrics: data.performanceMetrics || {
      correctRate: data.score?.percentage || 0,
      retryCount: 0,
      timeSpent: 0,
    },
    timestamp: data.timestamp || new Date(),
  };
}
