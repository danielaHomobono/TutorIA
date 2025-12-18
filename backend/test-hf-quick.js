/**
 * Prueba rápida del servicio de IA con HTTP directo
 */

import dotenv from 'dotenv';
dotenv.config();

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_MODEL_ID = 'openai-community/gpt2';
const HF_API_URL = `https://router.huggingface.co/models/${HF_MODEL_ID}`;

async function testQuick() {
  console.log('🧪 Prueba rápida de Hugging Face\n');
  console.log('Token:', HF_API_TOKEN ? '✅ Configurado' : '❌ No configurado');
  console.log('Modelo:', HF_MODEL_ID);
  console.log('='.repeat(60) + '\n');

  const prompt = 'Explica qué son las derivadas en matemáticas de forma simple para un estudiante de 15 años.';

  try {
    console.log('📤 Enviando petición...');
    
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          return_full_text: false,
        },
        options: {
          wait_for_model: true,
        },
      }),
    });

    console.log('Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      return;
    }

    const data = await response.json();
    console.log('\n✅ Respuesta recibida:\n');
    console.log('-'.repeat(60));
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      console.log(data[0].generated_text);
    } else if (data.generated_text) {
      console.log(data.generated_text);
    } else {
      console.log('Respuesta completa:', JSON.stringify(data, null, 2));
    }
    
    console.log('-'.repeat(60));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testQuick();
