/**
 * Motor de Pedagogía Adaptativa
 * Personaliza explicaciones según perfil del estudiante y contexto
 */

import { StudentProfile, SessionContext } from '../models/StudentProfile.js';

/**
 * Generador de explicaciones adaptativas
 */
export class AdaptiveExplanationEngine {
  constructor(profile, sessionContext) {
    this.profile = profile instanceof StudentProfile ? profile : new StudentProfile(profile);
    this.context = sessionContext instanceof SessionContext ? sessionContext : new SessionContext(sessionContext);
  }

  /**
   * Genera una explicación personalizada
   */
  generateExplanation(subject, level, topic) {
    // Analizar contexto
    const relatedTopics = this.context.findRelatedTopics(topic);
    const isReview = this.profile.hasKnowledge(topic);
    const isDifficult = this.profile.hasDifficulty(topic);

    // Ajustar profundidad según perfil
    const depth = this.determineDepth();
    const language = this.adjustLanguage();

    // Generar resumen adaptado
    const summary = this.generateSummary(topic, subject, isReview, isDifficult);

    // Generar pasos adaptados
    const steps = this.generateSteps(topic, subject, level, depth, relatedTopics);

    return {
      subject,
      level,
      topic,
      summary,
      steps,
      metadata: {
        adaptedFor: {
          age: this.profile.age,
          isYoungStudent: this.profile.isYoungStudent(),
          preferences: this.profile.preferences,
        },
        context: {
          isReview,
          isDifficult,
          relatedTopics,
          weaknesses: this.context.weaknesses,
        },
      },
      timestamp: new Date(),
    };
  }

  /**
   * Determina la profundidad de la explicación
   */
  determineDepth() {
    if (this.profile.isYoungStudent()) return 'simple';
    if (this.profile.preferences.stepByStep) return 'detailed';
    return 'standard';
  }

  /**
   * Ajusta el lenguaje según edad y preferencias
   */
  adjustLanguage() {
    const adjustments = {
      simplified: this.profile.isYoungStudent() || this.profile.preferences.easyReading,
      formal: !this.profile.isYoungStudent() && !this.profile.preferences.easyReading,
      encouraging: this.context.weaknesses.length > 0,
    };
    return adjustments;
  }

  /**
   * Genera un resumen personalizado
   */
  generateSummary(topic, subject, isReview, isDifficult) {
    const subjectName = subject === 'matematica' ? 'Matemática' : 'Física';
    
    let summary = '';

    // Introducción según contexto
    if (isReview) {
      summary += `Ya has trabajado con ${topic} antes. `;
      summary += `Vamos a profundizar y reforzar estos conceptos. `;
    } else if (isDifficult) {
      summary += `Sé que ${topic} puede parecer complicado al principio, `;
      summary += `pero vamos a desglosarlo paso a paso para que lo entiendas claramente. `;
    } else {
      summary += `Hoy vamos a aprender sobre ${topic} en ${subjectName}. `;
    }

    // Agregar conexiones con conocimientos previos
    const related = this.context.findRelatedTopics(topic);
    if (related.length > 0 && !isReview) {
      summary += `Esto se conecta con lo que ya sabes sobre ${related[0]}. `;
    }

    // Agregar motivación según preferencias
    if (this.profile.preferences.realWorldContext) {
      summary += `Verás cómo se aplica en situaciones reales. `;
    }

    return summary.trim();
  }

  /**
   * Genera pasos adaptados al perfil
   */
  generateSteps(topic, subject, level, depth, relatedTopics) {
    const steps = [];

    // Paso 1: Introducción (siempre)
    steps.push(this.createIntroStep(topic, subject, relatedTopics));

    // Paso 2: Conceptos básicos
    steps.push(this.createConceptsStep(topic, subject, depth));

    // Paso 3: Ejemplos (si lo prefiere)
    if (this.profile.preferences.examples) {
      steps.push(this.createExamplesStep(topic, subject));
    }

    // Paso 4: Analogías (si lo prefiere)
    if (this.profile.preferences.analogies) {
      steps.push(this.createAnalogyStep(topic, subject));
    }

    // Paso 5: Aplicaciones
    if (this.profile.preferences.realWorldContext) {
      steps.push(this.createApplicationsStep(topic, subject));
    }

    // Paso 6: Práctica (siempre)
    steps.push(this.createPracticeStep(topic));

    return steps;
  }

  /**
   * Crea paso de introducción
   */
  createIntroStep(topic, subject, relatedTopics) {
    let content = `${topic} es un concepto fundamental en ${subject === 'matematica' ? 'Matemática' : 'Física'}. `;

    if (relatedTopics.length > 0) {
      content += `Se relaciona directamente con ${relatedTopics[0]}, que ya has estudiado. `;
    }

    if (this.profile.isYoungStudent()) {
      content += `Vamos a aprenderlo de forma fácil y divertida.`;
    } else {
      content += `Comenzaremos con los fundamentos y avanzaremos gradualmente.`;
    }

    return {
      id: 1,
      title: '📚 Introducción',
      content,
    };
  }

  /**
   * Crea paso de conceptos clave
   */
  createConceptsStep(topic, subject, depth) {
    let content = `Los conceptos clave de ${topic} incluyen:\n\n`;

    if (depth === 'simple') {
      content += `• Definición simple y clara\n`;
      content += `• Ideas principales\n`;
      content += `• Cómo funciona\n`;
    } else if (depth === 'detailed') {
      content += `• Definición formal y precisa\n`;
      content += `• Propiedades fundamentales\n`;
      content += `• Teoremas y demostraciones\n`;
      content += `• Condiciones y restricciones\n`;
    } else {
      content += `• Definición\n`;
      content += `• Propiedades principales\n`;
      content += `• Relaciones con otros conceptos\n`;
    }

    const formula = subject === 'matematica' 
      ? 'y = f(x)' 
      : 'F = ma';

    return {
      id: 2,
      title: '🔑 Conceptos Clave',
      content,
      formula,
    };
  }

  /**
   * Crea paso de ejemplos
   */
  createExamplesStep(topic, subject) {
    const language = this.profile.isYoungStudent() ? 'sencillos' : 'prácticos';
    
    return {
      id: 3,
      title: '💡 Ejemplos ' + (this.profile.isYoungStudent() ? 'Fáciles' : 'Prácticos'),
      content: `Veamos algunos ejemplos ${language} de cómo aplicar ${topic}:\n\n` +
               `Ejemplo 1: [Situación cotidiana relacionada]\n` +
               `Ejemplo 2: [Problema paso a paso]\n` +
               `Ejemplo 3: [Caso de aplicación real]\n\n` +
               `Nota: Presta atención a cómo se aplica el concepto en cada caso.`,
    };
  }

  /**
   * Crea paso de analogías
   */
  createAnalogyStep(topic, subject) {
    return {
      id: 4,
      title: '🎯 Analogía para Entender Mejor',
      content: `Para entender ${topic} de forma más intuitiva, imagina esto:\n\n` +
               `[Analogía con algo familiar de la vida cotidiana]\n\n` +
               `Esta comparación te ayudará a visualizar cómo funciona el concepto.`,
    };
  }

  /**
   * Crea paso de aplicaciones
   */
  createApplicationsStep(topic, subject) {
    return {
      id: 5,
      title: '🌍 Aplicaciones en la Vida Real',
      content: `${topic} tiene aplicaciones prácticas en:\n\n` +
               `• Ingeniería y tecnología\n` +
               `• Ciencias naturales\n` +
               `• Vida cotidiana\n` +
               `• Industria y economía\n\n` +
               `Estas aplicaciones demuestran por qué es importante dominar este concepto.`,
    };
  }

  /**
   * Crea paso de práctica
   */
  createPracticeStep(topic) {
    const encouragement = this.context.weaknesses.length > 0
      ? '¡No te preocupes si te cuesta al principio! La práctica es clave para mejorar.'
      : '¡Excelente! Ahora es momento de poner en práctica lo aprendido.';

    return {
      id: 6,
      title: '✍️ Practica lo Aprendido',
      content: `${encouragement}\n\n` +
               `Es hora de resolver algunos ejercicios sobre ${topic}. ` +
               `Esto te ayudará a consolidar tu comprensión y ganar confianza.`,
    };
  }
}

/**
 * Generador de ejercicios adaptativos
 */
export class AdaptiveExerciseGenerator {
  constructor(profile, sessionContext) {
    this.profile = profile instanceof StudentProfile ? profile : new StudentProfile(profile);
    this.context = sessionContext instanceof SessionContext ? sessionContext : new SessionContext(sessionContext);
  }

  /**
   * Genera ejercicios personalizados
   */
  generateExercises(subject, level, topic, count = 3) {
    const exercises = [];
    const difficulty = this.determineDifficulty(topic);

    for (let i = 1; i <= count; i++) {
      exercises.push({
        id: i,
        question: this.generateQuestion(topic, subject, i, difficulty),
        correctAnswer: `Respuesta ${i}`,
        hint: this.generateHint(topic, i, difficulty),
        difficulty: difficulty,
        metadata: {
          adaptedFor: this.profile.age ? `${this.profile.age} años` : level,
          focus: this.profile.hasDifficulty(topic) ? 'refuerzo' : 'práctica',
        },
      });
    }

    return exercises;
  }

  /**
   * Determina la dificultad según contexto
   */
  determineDifficulty(topic) {
    if (this.profile.hasDifficulty(topic)) return 'fácil';
    if (this.profile.hasKnowledge(topic)) return 'medio';
    if (this.context.strengths.includes(topic)) return 'difícil';
    return 'medio';
  }

  /**
   * Genera una pregunta adaptada
   */
  generateQuestion(topic, subject, number, difficulty) {
    const difficultyLabels = {
      fácil: 'básico',
      medio: 'estándar',
      difícil: 'avanzado',
    };

    let question = `Ejercicio ${number} (nivel ${difficultyLabels[difficulty]}): `;
    
    if (this.profile.preferences.realWorldContext) {
      question += `En una situación real, `;
    }

    question += `resuelve el siguiente problema sobre ${topic}.`;

    if (this.profile.isYoungStudent()) {
      question += ` Tómate tu tiempo y piensa paso a paso.`;
    }

    return question;
  }

  /**
   * Genera una pista adaptada
   */
  generateHint(topic, number, difficulty) {
    let hint = 'Pista: ';

    if (difficulty === 'fácil') {
      hint += `Recuerda los conceptos básicos de ${topic}. `;
    } else if (difficulty === 'medio') {
      hint += `Aplica la fórmula principal de ${topic}. `;
    } else {
      hint += `Combina los conceptos avanzados que aprendiste. `;
    }

    if (this.profile.preferences.stepByStep) {
      hint += `Hazlo paso a paso y verifica cada cálculo.`;
    }

    return hint;
  }
}
