import type {
  ExplainRequest,
  ExplainResponse,
  Explanation,
  GenerateExercisesRequest,
  GenerateExercisesResponse,
  Exercise,
  CheckAnswerRequest,
  CheckAnswerResponse,
} from '../types';

// Simulación de delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data para diferentes temas
const mockExplanations: Record<string, Partial<Explanation>> = {
  'derivadas': {
    summary: 'La derivada representa la tasa de cambio instantánea de una función.',
    steps: [
      {
        id: 1,
        title: 'Concepto fundamental',
        content: 'La derivada mide cómo cambia una función en un punto específico. Es la pendiente de la recta tangente.',
      },
      {
        id: 2,
        title: 'Definición formal',
        content: 'La derivada de f(x) en un punto x₀ se define como el límite del cociente incremental.',
        formula: "f'(x₀) = lim[h→0] (f(x₀+h) - f(x₀))/h",
      },
      {
        id: 3,
        title: 'Reglas básicas',
        content: 'Regla de la potencia: d/dx[xⁿ] = n·xⁿ⁻¹. Regla de la suma: (f+g)\' = f\' + g\'.',
      },
      {
        id: 4,
        title: 'Ejemplo práctico',
        content: 'Si f(x) = x², entonces f\'(x) = 2x. En x=3, la pendiente es f\'(3) = 6.',
      },
    ],
  },
  'cinematica': {
    summary: 'La cinemática estudia el movimiento sin considerar las causas que lo producen.',
    steps: [
      {
        id: 1,
        title: 'Magnitudes fundamentales',
        content: 'Posición (x), velocidad (v) y aceleración (a) son las tres magnitudes básicas.',
      },
      {
        id: 2,
        title: 'Movimiento rectilíneo uniforme',
        content: 'Cuando la velocidad es constante, la posición varía linealmente con el tiempo.',
        formula: 'x = x₀ + v·t',
      },
      {
        id: 3,
        title: 'Movimiento uniformemente acelerado',
        content: 'Con aceleración constante, la velocidad cambia linealmente y la posición cuadráticamente.',
        formula: 'v = v₀ + a·t   ;   x = x₀ + v₀·t + ½·a·t²',
      },
      {
        id: 4,
        title: 'Ejemplo: caída libre',
        content: 'Un objeto que cae desde reposo tiene a = 9.8 m/s². Después de 2s, v = 19.6 m/s y ha caído x = 19.6 m.',
      },
    ],
  },
};

/**
 * Obtiene una explicación del tema solicitado
 * @param request - Datos del tema a explicar
 * @returns Promesa con la explicación generada
 */
export const explain = async (request: ExplainRequest): Promise<ExplainResponse> => {
  try {
    // Simular delay de red
    await delay(1000 + Math.random() * 1000);

    // Validación básica
    if (!request.topic || request.topic.trim().length < 3) {
      return {
        success: false,
        error: 'El tema debe tener al menos 3 caracteres',
      };
    }

    // Buscar mock data o usar genérico
    const topicLower = request.topic.toLowerCase();
    const mockData = mockExplanations[topicLower] || {
      summary: `Explicación sobre ${request.topic} en ${request.subject}.`,
      steps: [
        {
          id: 1,
          title: 'Introducción',
          content: `El tema de ${request.topic} es fundamental en ${request.subject} nivel ${request.level}.`,
        },
        {
          id: 2,
          title: 'Conceptos clave',
          content: 'Los conceptos principales incluyen definiciones básicas y propiedades fundamentales.',
        },
        {
          id: 3,
          title: 'Aplicaciones',
          content: 'Este tema tiene múltiples aplicaciones prácticas en problemas reales.',
        },
      ],
    };

    const explanation: Explanation = {
      subject: request.subject,
      level: request.level,
      topic: request.topic,
      summary: mockData.summary || '',
      steps: mockData.steps || [],
      timestamp: new Date(),
    };

    return {
      success: true,
      data: explanation,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener la explicación',
    };
  }
};

// Mock exercises por tema
const mockExercises: Record<string, Exercise[]> = {
  'derivadas': [
    {
      id: 1,
      question: '¿Cuál es la derivada de f(x) = x³?',
      correctAnswer: '3x²',
      hint: 'Usa la regla de la potencia: d/dx[xⁿ] = n·xⁿ⁻¹',
    },
    {
      id: 2,
      question: 'Si f(x) = 5x² + 2x, ¿cuál es f\'(x)?',
      correctAnswer: '10x + 2',
      hint: 'Deriva término a término usando la regla de la suma',
    },
    {
      id: 3,
      question: '¿Cuál es la derivada de una constante, por ejemplo f(x) = 7?',
      correctAnswer: '0',
      hint: 'Las constantes no cambian, su tasa de cambio es cero',
    },
  ],
  'cinematica': [
    {
      id: 1,
      question: 'Si un auto viaja a 20 m/s constantes, ¿qué distancia recorre en 5 segundos?',
      correctAnswer: '100',
      hint: 'Usa la fórmula: distancia = velocidad × tiempo',
    },
    {
      id: 2,
      question: 'Un objeto cae libremente durante 3 segundos. ¿Cuál es su velocidad final? (g = 10 m/s²)',
      correctAnswer: '30',
      hint: 'v = v₀ + g·t, donde v₀ = 0',
    },
    {
      id: 3,
      question: 'Un móvil acelera a 2 m/s² partiendo del reposo. ¿Qué velocidad tiene después de 4 segundos?',
      correctAnswer: '8',
      hint: 'v = v₀ + a·t',
    },
  ],
};

/**
 * Genera ejercicios sobre un tema
 * @param request - Datos del tema para generar ejercicios
 * @returns Promesa con los ejercicios generados
 */
export const generateExercises = async (
  request: GenerateExercisesRequest
): Promise<GenerateExercisesResponse> => {
  try {
    await delay(800 + Math.random() * 700);

    const count = request.count || 3;
    const topicLower = request.topic.toLowerCase();
    
    // Buscar ejercicios específicos o generar genéricos
    let exercises = mockExercises[topicLower];

    if (!exercises) {
      // Generar ejercicios genéricos
      exercises = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        question: `Pregunta ${i + 1} sobre ${request.topic}`,
        correctAnswer: `respuesta${i + 1}`,
        hint: 'Revisa los conceptos fundamentales de la explicación',
      }));
    }

    // Limitar al número solicitado
    const selectedExercises = exercises.slice(0, count);

    return {
      success: true,
      data: selectedExercises,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al generar ejercicios',
    };
  }
};

/**
 * Verifica si una respuesta es correcta
 * @param request - Datos de la respuesta del usuario
 * @returns Promesa con el resultado de la verificación
 */
export const checkAnswer = async (
  request: CheckAnswerRequest
): Promise<CheckAnswerResponse> => {
  try {
    await delay(300 + Math.random() * 400);

    // Normalizar respuestas (quitar espacios, lowercase)
    const normalizeAnswer = (answer: string) => 
      answer.trim().toLowerCase().replace(/\s+/g, '');

    const userAnswerNorm = normalizeAnswer(request.userAnswer);
    const correctAnswerNorm = normalizeAnswer(request.correctAnswer);

    const isCorrect = userAnswerNorm === correctAnswerNorm;

    // Generar feedback personalizado
    let feedback: string;
    if (isCorrect) {
      const correctMessages = [
        '¡Excelente! Tu respuesta es correcta. 🎉',
        '¡Perfecto! Has acertado. 👏',
        '¡Correcto! Muy bien hecho. ✅',
        '¡Bien hecho! Respuesta correcta. 🌟',
      ];
      feedback = correctMessages[Math.floor(Math.random() * correctMessages.length)];
    } else {
      feedback = `Incorrecto. La respuesta correcta es: ${request.correctAnswer}`;
    }

    return {
      success: true,
      isCorrect,
      feedback,
      correctAnswer: isCorrect ? undefined : request.correctAnswer,
    };
  } catch (error) {
    return {
      success: true,
      isCorrect: false,
      feedback: 'Error al verificar la respuesta',
    };
  }
};

// API del tutor
export const tutorApi = {
  explain,
  generateExercises,
  checkAnswer,
};
