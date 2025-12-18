/**
 * Servicio de IA usando Together AI (Nivel 2 - Backup)
 * Se usa cuando Groq falla o está saturado
 */

// TODO: Instalar together-ai cuando se necesite
// npm install together-ai

/**
 * Genera una explicación usando Together AI
 * Por ahora retorna null para indicar que no está disponible
 */
export async function generateExplanation(topic, age, level, preferences) {
  if (!process.env.TOGETHER_API_KEY) {
    throw new Error('Together AI not configured');
  }

  // TODO: Implementar cuando se obtenga API key de Together AI
  // const Together = (await import('together-ai')).default;
  // const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });
  
  throw new Error('Together AI not implemented yet');
}

/**
 * Genera un ejercicio usando Together AI
 */
export async function generateExercise(topic, age, level, difficulty) {
  if (!process.env.TOGETHER_API_KEY) {
    throw new Error('Together AI not configured');
  }

  throw new Error('Together AI not implemented yet');
}

/**
 * Verifica si Together AI está disponible
 */
export function isAvailable() {
  return false; // Por ahora no está implementado
}
