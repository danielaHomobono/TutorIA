/**
 * Motor de Pedagogía Adaptativa
 * Personaliza explicaciones según perfil del estudiante y contexto
 */

import { StudentProfile, SessionContext } from '../models/StudentProfile.js';
import * as aiService from '../services/aiService.js';

/**
 * Generador de explicaciones adaptativas
 */
export class AdaptiveExplanationEngine {
  constructor(profile, sessionContext) {
    this.profile = profile instanceof StudentProfile ? profile : new StudentProfile(profile);
    this.context = sessionContext instanceof SessionContext ? sessionContext : new SessionContext(sessionContext);
  }

  /**
   * Genera una explicación personalizada usando IA
   */
  async generateExplanation(subject, level, topic) {
    // Analizar contexto
    const relatedTopics = this.context.findRelatedTopics(topic);
    const isReview = this.profile.hasKnowledge(topic);
    const isDifficult = this.profile.hasDifficulty(topic);

    // Ajustar profundidad según perfil
    const depth = this.determineDepth();

    // Llamar a la IA para generar contenido personalizado
    const aiResponse = await aiService.generateExplanation(
      topic,
      subject,
      level,
      this.profile
    );

    // Extraer el contenido de la respuesta (puede venir de Groq, Together AI o Fallback)
    const aiExplanation = aiResponse.content;

    // Parsear la respuesta de la IA en formato estructurado
    const { summary, steps } = this.parseAIResponse(aiExplanation, topic, subject);

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
        generatedByAI: true,
      },
      timestamp: new Date(),
    };
  }

  /**
   * Parsea la respuesta de la IA en formato estructurado
   */
  parseAIResponse(aiText, topic, subject) {
    // Dividir en párrafos
    const paragraphs = aiText.split('\n\n').filter(p => p.trim());

    // Primer párrafo como resumen
    const summary = paragraphs[0] || `Explicación sobre ${topic} en ${subject}.`;

    // Convertir resto en steps
    const steps = [];
    let stepId = 1;

    paragraphs.slice(1).forEach((para, index) => {
      // Detectar si tiene título (línea que termina en :)
      const lines = para.split('\n');
      let title = `Paso ${stepId}`;
      let content = para;

      if (lines[0].includes(':') || lines[0].match(/^\d+\./)) {
        title = lines[0].replace(/^\d+\.?\s*/, '').replace(/:$/, '').trim();
        content = lines.slice(1).join('\n').trim() || lines[0];
      }

      steps.push({
        id: stepId++,
        title: this.addEmojiToTitle(title, index),
        content: content.trim(),
      });
    });

    // Si no hay steps, crear uno básico
    if (steps.length === 0) {
      steps.push({
        id: 1,
        title: '📚 Explicación Completa',
        content: aiText,
      });
    }

    return { summary, steps };
  }

  /**
   * Agrega emoji apropiado al título
   */
  addEmojiToTitle(title, index) {
    const emojis = ['📚', '🔑', '💡', '🎯', '🌍', '✍️', '🔬', '📐'];
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes('introduc') || lowerTitle.includes('inicio')) return '📚 ' + title;
    if (lowerTitle.includes('concept') || lowerTitle.includes('clave')) return '🔑 ' + title;
    if (lowerTitle.includes('ejemplo')) return '💡 ' + title;
    if (lowerTitle.includes('analog') || lowerTitle.includes('metáfora')) return '🎯 ' + title;
    if (lowerTitle.includes('aplicac') || lowerTitle.includes('real')) return '🌍 ' + title;
    if (lowerTitle.includes('práctic') || lowerTitle.includes('ejercicio')) return '✍️ ' + title;

    // Default: usar emoji según índice
    return emojis[index % emojis.length] + ' ' + title;
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
   * Genera ejercicios personalizados usando IA
   */
  async generateExercises(subject, level, topic, count = 3) {
    const difficulty = this.determineDifficulty(topic);

    // Llamar a la IA para generar ejercicios
    const aiResponse = await aiService.generateExercises(
      topic,
      subject,
      level,
      this.profile,
      count
    );

    // Extraer los ejercicios de la respuesta
    const exercises = aiResponse.exercises;

    // Agregar metadata a cada ejercicio
    return exercises.map((exercise, index) => ({
      ...exercise,
      difficulty,
      metadata: {
        adaptedFor: this.profile.age ? `${this.profile.age} años` : level,
        focus: this.profile.hasDifficulty(topic) ? 'refuerzo' : 'práctica',
      },
    }));
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
}
