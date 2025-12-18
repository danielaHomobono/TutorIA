/**
 * Servicio de IA usando Groq (Nivel 1 - Principal)
 * Ultra-rápido, gratis, con Llama 3.3 70B
 */

import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `Eres un tutor educativo experto y apasionado por la enseñanza. Tu objetivo es explicar conceptos de forma clara, adaptada a cada estudiante, y generar interés genuino por aprender.

Características de tu estilo:
- Usas lenguaje apropiado para la edad del estudiante
- Adaptas ejemplos según sus intereses cuando es posible
- Estructuras explicaciones de forma lógica y progresiva
- Incluyes analogías y ejemplos prácticos
- Eres motivador y positivo
- Respondes siempre en español`;

/**
 * Construye un prompt educativo personalizado
 */
function buildEducationalPrompt(topic, age, level, preferences) {
  const { learningStyle = 'visual', visualPreference = true, interests = [] } = preferences;
  
  let prompt = `Explica el concepto de "${topic}" para un estudiante de ${age} años con nivel académico ${level}.\n\n`;
  
  prompt += `REQUISITOS CLAVE:\n`;
  prompt += `- Estilo de aprendizaje: ${learningStyle}\n`;
  
  if (visualPreference) {
    prompt += `- Incluye ejemplos visuales, analogías gráficas o descripciones que ayuden a "ver" el concepto\n`;
  } else {
    prompt += `- Usa explicaciones textuales simples y directas\n`;
  }
  
  // CLAVE: Hacer que los intereses sean OBLIGATORIOS en los ejemplos
  if (interests && interests.length > 0) {
    prompt += `\n🎯 IMPORTANTE - INTERESES DEL ESTUDIANTE:\n`;
    prompt += `Este estudiante es FAN de: ${interests.join(', ')}\n`;
    prompt += `DEBES crear ejemplos y analogías usando estos intereses. No son opcionales.\n`;
    prompt += `Ejemplos:\n`;
    prompt += `- Si le gustan los AUTOS: explica velocidad con aceleración de autos, fuerzas con frenos, etc.\n`;
    prompt += `- Si le gusta el FÚTBOL: usa trayectorias de pelota, ángulos de tiro, estrategias de equipo\n`;
    prompt += `- Si le gusta la MÚSICA: frecuencias, ondas, ritmos, armonías matemáticas\n`;
    prompt += `- Si le gustan los VIDEOJUEGOS: física de personajes, probabilidades, optimización\n\n`;
  }
  
  prompt += `📝 ESTRUCTURA DE LA EXPLICACIÓN:\n`;
  prompt += `1. GANCHO (1-2 oraciones): Conecta el tema con algo que le apasione al estudiante\n`;
  prompt += `2. CONCEPTO PRINCIPAL: Explica de forma clara y directa\n`;
  prompt += `3. EJEMPLO DIDÁCTICO: Usa sus intereses para hacer el concepto tangible y memorable\n`;
  prompt += `4. RESUMEN MEMORABLE: Una frase que capture la esencia\n\n`;
  
  prompt += `FORMATO:\n`;
  prompt += `- Máximo 5 párrafos cortos\n`;
  prompt += `- Usa 2-3 emojis relevantes para hacer más amigable\n`;
  prompt += `- Lenguaje apropiado para ${age} años\n`;
  prompt += `- SIN meta-comentarios como "claro, con gusto" - ve directo al contenido\n`;
  
  return prompt;
}

/**
 * Construye un prompt para generar ejercicios
 */
function buildExercisePrompt(topic, age, level, difficulty, interests = []) {
  let prompt = `Genera UN ejercicio de práctica sobre "${topic}" para un estudiante de ${age} años, nivel académico ${level}, con dificultad ${difficulty}/10.\n\n`;
  
  // Agregar contexto de intereses para ejercicios más relevantes
  if (interests && interests.length > 0) {
    prompt += `🎯 CONTEXTO: Este estudiante le apasiona: ${interests.join(', ')}\n`;
    prompt += `Si es posible, contextualiza el ejercicio usando estos intereses para hacerlo más motivador.\n\n`;
  }
  
  prompt += `IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional antes o después.\n\n`;
  
  prompt += `El JSON debe tener esta estructura exacta:\n`;
  prompt += `{
  "pregunta": "Texto de la pregunta del ejercicio",
  "opciones": [
    "Opción A",
    "Opción B", 
    "Opción C",
    "Opción D"
  ],
  "respuestaCorrecta": "B",
  "explicacion": "Explicación clara de por qué esa es la respuesta correcta"
}\n\n`;

  prompt += `REQUISITOS:\n`;
  prompt += `- La pregunta debe ser clara y apropiada para la edad\n`;
  prompt += `- Las 4 opciones deben ser plausibles pero solo una correcta\n`;
  prompt += `- respuestaCorrecta debe ser "A", "B", "C" o "D"\n`;
  prompt += `- La explicación debe ayudar a entender el concepto, no solo decir "es correcta"\n`;
  prompt += `- Dificultad ${difficulty}/10: ${difficulty <= 3 ? 'básico, conceptual' : difficulty <= 6 ? 'intermedio, aplicación' : 'avanzado, análisis'}\n\n`;
  
  prompt += `Responde SOLO con el JSON, sin \`\`\`json ni texto adicional.`;
  
  return prompt;
}

/**
 * Genera una explicación educativa usando Groq
 */
export async function generateExplanation(topic, age, level, preferences) {
  try {
    const prompt = buildEducationalPrompt(topic, age, level, preferences);
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile', // Modelo gratis más potente de Groq
      temperature: 0.7,
      max_tokens: 800,
      top_p: 0.9
    });

    const content = completion.choices[0].message.content;
    
    if (!content || content.trim().length === 0) {
      throw new Error('Groq returned empty response');
    }

    return content;
  } catch (error) {
    console.error('❌ Error en Groq:', error.message);
    throw error; // Propagar para que aiService.js intente el siguiente nivel
  }
}

/**
 * Genera un ejercicio usando Groq
 */
export async function generateExercise(topic, age, level, difficulty, interests = []) {
  try {
    const prompt = buildExercisePrompt(topic, age, level, difficulty, interests);
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Eres un generador de ejercicios educativos. Respondes ÚNICAMENTE con JSON válido, sin texto adicional.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 500
    });

    let content = completion.choices[0].message.content.trim();
    
    // Limpiar posibles markdown o texto extra
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const exercise = JSON.parse(content);
    
    // Validar estructura
    if (!exercise.pregunta || !exercise.opciones || !exercise.respuestaCorrecta || !exercise.explicacion) {
      throw new Error('Invalid exercise structure from Groq');
    }
    
    if (exercise.opciones.length !== 4) {
      throw new Error('Exercise must have exactly 4 options');
    }
    
    if (!['A', 'B', 'C', 'D'].includes(exercise.respuestaCorrecta)) {
      throw new Error('respuestaCorrecta must be A, B, C, or D');
    }

    return exercise;
  } catch (error) {
    console.error('❌ Error generando ejercicio en Groq:', error.message);
    throw error;
  }
}

/**
 * Verifica si el servicio de Groq está disponible
 */
export function isAvailable() {
  return !!process.env.GROQ_API_KEY;
}
