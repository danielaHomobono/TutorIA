/**
 * Test simple de Groq API
 */

import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Test de Groq API\n');
console.log('API Key:', process.env.GROQ_API_KEY ? '✅ Configurada' : '❌ No encontrada');
console.log('='.repeat(60) + '\n');

async function testGroq() {
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY no configurada');
    return;
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const prompt = `Explica el concepto de "derivadas" en Matemática para un estudiante de 15 años.

Requisitos:
- Máximo 3 párrafos cortos
- Lenguaje simple y claro
- Incluye 1 ejemplo práctico
- Usa 1-2 emojis

Estructura:
1. Introducción simple
2. Explicación del concepto
3. Ejemplo real`;

    console.log('📤 Enviando petición a Groq (Llama 3.3 70B)...\n');

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Eres un tutor educativo experto. Explicas conceptos de forma clara y adaptada. Respondes en español.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 600
    });

    console.log('✅ Respuesta recibida:\n');
    console.log('-'.repeat(60));
    console.log(completion.choices[0].message.content);
    console.log('-'.repeat(60));
    console.log('\n✅ ¡Test exitoso! Groq funciona correctamente');
    console.log('\nEstadísticas:');
    console.log('  - Tokens usados:', completion.usage?.total_tokens || 'N/A');
    console.log('  - Modelo:', completion.model);
    console.log('  - Velocidad: Ultra-rápida ⚡');

  } catch (error) {
    console.error('\n❌ Error al llamar a Groq:');
    console.error('Tipo:', error.name);
    console.error('Mensaje:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testGroq();
