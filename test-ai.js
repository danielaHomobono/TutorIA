/**
 * Script de prueba para verificar que la IA genera respuestas diferentes
 * según la edad del estudiante
 */

// Test 1: Estudiante de 15 años
const test1 = {
  subject: 'matematica',
  level: 'secundaria',
  topic: 'derivadas',
  profileData: {
    age: 15,
    levelDetail: '3er año',
    priorKnowledge: ['funciones'],
    difficulties: [],
    preferences: {
      easyReading: true,
      examples: true,
      analogies: true,
      stepByStep: true,
      realWorldContext: true,
    },
  },
};

// Test 2: Estudiante de 20 años
const test2 = {
  subject: 'matematica',
  level: 'universidad',
  topic: 'derivadas',
  profileData: {
    age: 20,
    levelDetail: 'cálculo I',
    priorKnowledge: ['límites', 'funciones'],
    difficulties: [],
    preferences: {
      easyReading: false,
      examples: true,
      analogies: false,
      stepByStep: false,
      realWorldContext: false,
    },
  },
};

async function testAPI() {
  console.log('🧪 PRUEBA: Verificar personalización por edad\n');
  console.log('=' .repeat(60));

  // Test 1: 15 años
  console.log('\n📝 Test 1: Estudiante de 15 años');
  console.log('-'.repeat(60));
  try {
    const response1 = await fetch('http://localhost:3000/api/tutor/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test1),
    });
    const data1 = await response1.json();
    
    if (data1.success) {
      console.log('✅ Respuesta recibida');
      console.log('Resumen:', data1.data.summary.substring(0, 150) + '...');
      console.log('Total de pasos:', data1.data.steps.length);
      console.log('Adaptado para:', data1.data.metadata.adaptedFor.age, 'años');
    } else {
      console.log('❌ Error:', data1.error);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }

  // Esperar 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test 2: 20 años
  console.log('\n📝 Test 2: Estudiante de 20 años');
  console.log('-'.repeat(60));
  try {
    const response2 = await fetch('http://localhost:3000/api/tutor/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test2),
    });
    const data2 = await response2.json();
    
    if (data2.success) {
      console.log('✅ Respuesta recibida');
      console.log('Resumen:', data2.data.summary.substring(0, 150) + '...');
      console.log('Total de pasos:', data2.data.steps.length);
      console.log('Adaptado para:', data2.data.metadata.adaptedFor.age, 'años');
    } else {
      console.log('❌ Error:', data2.error);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Pruebas completadas');
  console.log('💡 Verifica que las explicaciones sean diferentes según la edad');
}

testAPI();
