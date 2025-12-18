/**
 * Script de prueba directa de Hugging Face API
 */

import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_MODEL_ID = process.env.HF_MODEL_ID;

console.log('🧪 Prueba directa de Hugging Face API\n');
console.log('Token configurado:', HF_API_TOKEN ? '✅ Sí' : '❌ No');
console.log('Modelo:', HF_MODEL_ID);
console.log('='.repeat(60) + '\n');

async function testHF() {
  if (!HF_API_TOKEN) {
    console.error('❌ HF_API_TOKEN no configurado');
    return;
  }

  const hf = new HfInference(HF_API_TOKEN);

  const prompt = `Eres un tutor educativo experto en Matemática nivel secundaria.
El estudiante tiene 15 años. Usa un lenguaje simple, claro y amigable.

Ahora explica el tema: "derivadas" en Matemática.

Genera una explicación clara y completa que incluya:
1. Un resumen introductorio
2. Conceptos clave
3. Ejemplos prácticos

Responde en español de forma directa, sin meta-comentarios:
`;

  console.log('📝 Enviando prompt a GPT-2...\n');
  
  try {
    const response = await hf.textGeneration({
      model: HF_MODEL_ID,
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        return_full_text: false
      }
    });

    console.log('✅ Respuesta recibida:\n');
    console.log('-'.repeat(60));
    console.log(response.generated_text);
    console.log('-'.repeat(60));
    console.log('\n✅ Prueba exitosa');
  } catch (error) {
    console.error('❌ Error al llamar a Hugging Face:');
    console.error('Tipo de error:', error.name);
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    
    console.log('\n💡 Posibles causas:');
    console.log('  1. Token inválido o expirado');
    console.log('  2. Modelo no disponible o en cold start');
    console.log('  3. Rate limit excedido');
    console.log('  4. Modelo requiere permiso especial');
  }
}

testHF();
