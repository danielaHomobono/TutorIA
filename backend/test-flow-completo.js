/**
 * Test del flujo completo: Frontend → Backend → Groq
 * Simula cómo el frontend envía datos con intereses
 */

import dotenv from 'dotenv';
dotenv.config();

const API_URL = 'http://localhost:3000/api';

console.log('🧪 TEST: Flujo Completo con Intereses\n');
console.log('='.repeat(60));

async function testCompleteFlow() {
  // Simular datos que vienen del frontend
  const requestData = {
    subject: 'matematica',
    level: 'secundaria',
    topic: 'derivadas',
    profileData: {
      age: 17,
      levelDetail: '4to año secundaria',
      priorKnowledge: ['álgebra', 'funciones'],
      difficulties: ['límites'],
      interests: ['autos', 'Formula 1', 'mecánica'],  // ← INTERESES
      preferences: {
        easyReading: false,
        examples: true,
        analogies: true,
        stepByStep: true,
        realWorldContext: true
      }
    },
    recentSessions: []
  };

  console.log('\n📤 ENVIANDO REQUEST AL BACKEND:');
  console.log(JSON.stringify(requestData, null, 2));

  try {
    const response = await fetch(`${API_URL}/tutor/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('\n❌ Error del servidor:', error);
      return;
    }

    const result = await response.json();

    console.log('\n✅ RESPUESTA RECIBIDA:');
    console.log('\n📖 EXPLICACIÓN GENERADA:');
    console.log('-'.repeat(60));
    console.log(result.data.summary);
    console.log('\n📊 METADATA:');
    console.log('  - Edad adaptada:', result.data.metadata.adaptedFor.age);
    console.log('  - Generado por IA:', result.data.metadata.generatedByAI);
    console.log('  - Personalización aplicada:', result.personalization.applied);

    console.log('\n🔍 VERIFICACIÓN:');
    const explanation = result.data.summary.toLowerCase();
    
    if (explanation.includes('auto') || explanation.includes('carro') || 
        explanation.includes('velocidad') || explanation.includes('aceleración') ||
        explanation.includes('formula') || explanation.includes('carrera')) {
      console.log('  ✅ La IA usó los INTERESES (autos/F1) en la explicación!');
    } else {
      console.log('  ⚠️  No se detectaron referencias a autos/F1 en la explicación');
    }

  } catch (error) {
    console.error('\n❌ Error en la petición:', error.message);
  }
}

// Ejecutar test
console.log('\n🚀 Iniciando test...\n');
testCompleteFlow()
  .then(() => {
    console.log('\n' + '='.repeat(60));
    console.log('✅ TEST COMPLETADO');
  })
  .catch(error => {
    console.error('\n❌ Error:', error);
  });
