import * as groqService from './groqService.js';
import * as togetherService from './togetherService.js';

const LOG_AI_SOURCE = true;

console.log('\n Sistema de IA:');
console.log('  Groq:', groqService.isAvailable() ? ' OK' : ' NO');
console.log('  Together:', togetherService.isAvailable() ? ' OK' : ' NO');
console.log('  Fallback: OK\n');

export async function generateExplanation(topic, subject, level, profile = {}) {
  const { age = 16, preferences = {}, interests = [] } = profile;
  
  // Agregar interests a preferences para que groqService los use
  const enrichedPreferences = { ...preferences, interests };

  if (groqService.isAvailable()) {
    try {
      if (LOG_AI_SOURCE) console.log('[1] Groq...');
      const content = await groqService.generateExplanation(topic, age, level, enrichedPreferences);
      if (LOG_AI_SOURCE) console.log('[1] OK');
      return { content, source: 'groq', model: 'llama-3.3-70b' };
    } catch (e) {
      console.error('[1] Error:', e.message);
    }
  }

  if (togetherService.isAvailable()) {
    try {
      if (LOG_AI_SOURCE) console.log('[2] Together...');
      const content = await togetherService.generateExplanation(topic, age, level, enrichedPreferences);
      if (LOG_AI_SOURCE) console.log('[2] OK');
      return { content, source: 'together', model: 'llama-3-70b' };
    } catch (e) {
      console.error('[2] Error:', e.message);
    }
  }

  if (LOG_AI_SOURCE) console.log('[3] Fallback');
  return { content: makeFallback(topic, subject, level, profile), source: 'local', model: 'fallback' };
}

export async function generateExercises(topic, subject, level, profile = {}, count = 3) {
  const { age = 16, interests = [] } = profile;
  const exercises = [];

  if (groqService.isAvailable()) {
    try {
      if (LOG_AI_SOURCE) console.log('[1] Ejercicios Groq...');
      for (let i = 0; i < count; i++) {
        const difficulty = calcDiff(level, i, count);
        const ex = await groqService.generateExercise(topic, age, level, difficulty, interests);
        exercises.push({ id: i + 1, question: ex.pregunta, options: ex.opciones, correctAnswer: ex.respuestaCorrecta, explanation: ex.explicacion, difficulty });
      }
      if (LOG_AI_SOURCE) console.log(`[1] ${exercises.length} OK`);
      return { exercises, source: 'groq', model: 'llama-3.3-70b' };
    } catch (e) {
      console.error('[1] Error:', e.message);
      exercises.length = 0;
    }
  }

  if (togetherService.isAvailable()) {
    try {
      if (LOG_AI_SOURCE) console.log('[2] Ejercicios Together...');
      for (let i = 0; i < count; i++) {
        const difficulty = calcDiff(level, i, count);
        const ex = await togetherService.generateExercise(topic, age, level, difficulty);
        exercises.push({ id: i + 1, question: ex.pregunta, options: ex.opciones, correctAnswer: ex.respuestaCorrecta, explanation: ex.explicacion, difficulty });
      }
      if (LOG_AI_SOURCE) console.log(`[2] ${exercises.length} OK`);
      return { exercises, source: 'together', model: 'llama-3-70b' };
    } catch (e) {
      console.error('[2] Error:', e.message);
      exercises.length = 0;
    }
  }

  if (LOG_AI_SOURCE) console.log('[3] Ejercicios Fallback');
  return { exercises: makeFallbackEx(topic, subject, level, count), source: 'local', model: 'fallback' };
}

function calcDiff(level, idx, total) {
  const base = { primaria: 2, secundaria: 5, universitaria: 7 }[level] || 5;
  return Math.min(10, base + Math.floor((idx / total) * 3));
}

function makeFallback(topic, subject, level, profile = {}) {
  const sub = { matematica: 'Matemática', fisica: 'Física', quimica: 'Química', biologia: 'Biología' }[subject] || 'la materia';
  const young = profile.age && profile.age < 16;
  let txt = young ? `Hola! Hoy vamos a aprender sobre **${topic}**.\n\n` : `# ${topic}\n\nExplicación de ${topic} en ${sub} nivel ${level}.\n\n`;
  txt += `## Conceptos clave\n\nFundamentos de ${topic}:\n\n`;
  txt += `- Definición básica\n- Propiedades principales\n- Aplicaciones prácticas\n\n`;
  txt += `## Ejemplo\n\nPara entender ${topic}, imagina una situación cotidiana donde aplicamos este concepto.\n\n`;
  txt += `---\n\n_Configurar GROQ_API_KEY en .env para contenido generado por IA_`;
  return txt;
}

function makeFallbackEx(topic, subject, level, count) {
  const exercises = [];
  for (let i = 0; i < count; i++) {
    exercises.push({
      id: i + 1,
      question: `¿Concepto ${i + 1} de ${topic}?`,
      options: ['Definición', 'Propiedades', 'Aplicaciones', 'Todas'],
      correctAnswer: 'D',
      explanation: `Todas son correctas sobre ${topic}.`,
      difficulty: calcDiff(level, i, count)
    });
  }
  return exercises;
}

export default { generateExplanation, generateExercises };