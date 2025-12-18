/**
 * Tipos y modelos para el sistema de personalización pedagógica
 */

/**
 * Preferencias de aprendizaje del estudiante
 */
export const LearningPreferences = {
  easyReading: false,      // Usar lenguaje simplificado y accesible
  examples: true,          // Incluir ejemplos prácticos
  analogies: true,         // Usar analogías y metáforas
  stepByStep: true,        // Desglosar en pasos detallados
  visualAids: false,       // Sugerir diagramas/gráficos (para futuro)
  realWorldContext: true,  // Conectar con situaciones cotidianas
};

/**
 * Perfil completo del estudiante
 */
export class StudentProfile {
  constructor(data = {}) {
    this.age = data.age || null;                           // Edad del estudiante (opcional)
    this.levelDetail = data.levelDetail || '';              // "1er año", "cálculo I", etc.
    this.priorKnowledge = data.priorKnowledge || [];        // Temas ya conocidos
    this.difficulties = data.difficulties || [];            // Conceptos problemáticos
    this.interests = data.interests || [];                  // Intereses personales (autos, deportes, etc.)
    this.preferences = {
      ...LearningPreferences,
      ...(data.preferences || {}),
    };
  }

  /**
   * Determina si el estudiante es joven (lenguaje más simple)
   */
  isYoungStudent() {
    return this.age && this.age < 16;
  }

  /**
   * Determina si el estudiante prefiere explicaciones detalladas
   */
  needsDetailedExplanations() {
    return this.preferences.stepByStep || this.preferences.examples;
  }

  /**
   * Verifica si un tema está en conocimientos previos
   */
  hasKnowledge(topic) {
    return this.priorKnowledge.some(
      (known) => known.toLowerCase().includes(topic.toLowerCase())
    );
  }

  /**
   * Verifica si un concepto es difícil para el estudiante
   */
  hasDifficulty(concept) {
    return this.difficulties.some(
      (diff) => diff.toLowerCase().includes(concept.toLowerCase())
    );
  }
}

/**
 * Contexto del historial de sesiones
 */
export class SessionContext {
  constructor(sessions = []) {
    this.sessions = sessions;
    this.topics = this.extractTopics();
    this.weaknesses = this.extractWeaknesses();
    this.strengths = this.extractStrengths();
  }

  /**
   * Extrae todos los temas vistos
   */
  extractTopics() {
    return [...new Set(this.sessions.map((s) => s.topic))];
  }

  /**
   * Identifica conceptos con bajo score (debilidades)
   */
  extractWeaknesses() {
    return this.sessions
      .filter((s) => s.score && s.score.percentage < 60)
      .map((s) => s.topic);
  }

  /**
   * Identifica conceptos con alto score (fortalezas)
   */
  extractStrengths() {
    return this.sessions
      .filter((s) => s.score && s.score.percentage >= 80)
      .map((s) => s.topic);
  }

  /**
   * Obtiene las N sesiones más recientes
   */
  getRecent(count = 5) {
    return this.sessions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, count);
  }

  /**
   * Encuentra temas relacionados ya estudiados
   */
  findRelatedTopics(currentTopic) {
    // Búsqueda simple por palabras clave
    const keywords = currentTopic.toLowerCase().split(' ');
    return this.topics.filter((topic) =>
      keywords.some((keyword) => topic.toLowerCase().includes(keyword))
    );
  }
}

/**
 * Validador de perfil del estudiante
 */
export function validateStudentProfile(data) {
  const errors = [];

  if (data.age !== undefined && data.age !== null) {
    if (typeof data.age !== 'number' || data.age < 5 || data.age > 100) {
      errors.push('Age debe ser un número entre 5 y 100');
    }
  }

  if (data.priorKnowledge && !Array.isArray(data.priorKnowledge)) {
    errors.push('priorKnowledge debe ser un array');
  }

  if (data.difficulties && !Array.isArray(data.difficulties)) {
    errors.push('difficulties debe ser un array');
  }

  if (data.preferences && typeof data.preferences !== 'object') {
    errors.push('preferences debe ser un objeto');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
