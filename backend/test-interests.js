/**
 * Script de prueba para validar explicaciones personalizadas con intereses
 * Prueba cómo la IA usa los intereses del estudiante para crear ejemplos didácticos
 */

import dotenv from 'dotenv';
import * as groqService from './src/services/groqService.js';

dotenv.config();

console.log('🧪 TEST: Explicaciones Personalizadas con Intereses\n');
console.log('=' .repeat(60));

async function testWithInterests() {
  const topic = 'derivadas';
  const age = 17;
  const level = 'secundaria';
  
  // Test 1: Estudiante fanático de AUTOS
  console.log('\n🏎️  TEST 1: Estudiante FAN de AUTOS');
  console.log('-'.repeat(60));
  
  const preferences1 = {
    interests: ['autos', 'carreras', 'mecánica']
  };
  
  try {
    const explanation1 = await groqService.generateExplanation(topic, age, level, preferences1);
    console.log('\n📖 EXPLICACIÓN:\n');
    console.log(explanation1);
    console.log('\n✅ Tokens generados:', explanation1.length);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  // Test 2: Estudiante fanático de FÚTBOL
  console.log('\n\n⚽ TEST 2: Estudiante FAN de FÚTBOL');
  console.log('-'.repeat(60));
  
  const preferences2 = {
    interests: ['fútbol', 'deportes']
  };
  
  try {
    const explanation2 = await groqService.generateExplanation(topic, age, level, preferences2);
    console.log('\n📖 EXPLICACIÓN:\n');
    console.log(explanation2);
    console.log('\n✅ Tokens generados:', explanation2.length);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  // Test 3: Estudiante fanático de VIDEOJUEGOS
  console.log('\n\n🎮 TEST 3: Estudiante FAN de VIDEOJUEGOS');
  console.log('-'.repeat(60));
  
  const preferences3 = {
    interests: ['videojuegos', 'Minecraft', 'Fortnite']
  };
  
  try {
    const explanation3 = await groqService.generateExplanation(topic, age, level, preferences3);
    console.log('\n📖 EXPLICACIÓN:\n');
    console.log(explanation3);
    console.log('\n✅ Tokens generados:', explanation3.length);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  // Test 4: Ejercicio con contexto de AUTOS
  console.log('\n\n🏁 TEST 4: Ejercicio contextualizado con AUTOS');
  console.log('-'.repeat(60));
  
  try {
    const exercise = await groqService.generateExercise(
      'velocidad y aceleración',
      17,
      'secundaria',
      5,
      ['autos', 'Formula 1']
    );
    
    console.log('\n📝 EJERCICIO:\n');
    console.log('PREGUNTA:', exercise.pregunta);
    console.log('\nOPCIONES:');
    exercise.opciones.forEach((op, i) => console.log(`  ${String.fromCharCode(65+i)}) ${op}`));
    console.log('\n✅ RESPUESTA CORRECTA:', exercise.respuestaCorrecta);
    console.log('💡 EXPLICACIÓN:', exercise.explicacion);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar tests
if (groqService.isAvailable()) {
  console.log('✅ Groq API Key detectada\n');
  testWithInterests()
    .then(() => {
      console.log('\n\n' + '='.repeat(60));
      console.log('✅ TESTS COMPLETADOS');
      console.log('Verifica cómo la IA usó los intereses en los ejemplos!');
    })
    .catch(error => {
      console.error('\n❌ Error general:', error);
    });
} else {
  console.error('❌ GROQ_API_KEY no configurada en .env');
  process.exit(1);
}
