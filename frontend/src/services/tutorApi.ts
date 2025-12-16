import type {
  ExplainRequest,
  ExplainResponse,
  GenerateExercisesRequest,
  GenerateExercisesResponse,
  CheckAnswerRequest,
  CheckAnswerResponse,
} from '../types';

// URL base del backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Obtiene una explicación del tema solicitado desde el backend
 * @param request - Datos del tema a explicar con contexto del estudiante
 * @returns Promesa con la explicación generada
 */
export const explain = async (request: ExplainRequest): Promise<ExplainResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error del servidor' }));
      return {
        success: false,
        error: errorData.error || `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    
    // Convertir timestamp string a Date
    if (data.data?.timestamp) {
      data.data.timestamp = new Date(data.data.timestamp);
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener la explicación',
    };
  }
};

/**
 * Genera ejercicios sobre un tema desde el backend
 * @param request - Datos del tema para generar ejercicios con contexto del estudiante
 * @returns Promesa con los ejercicios generados
 */
export const generateExercises = async (
  request: GenerateExercisesRequest
): Promise<GenerateExercisesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error del servidor' }));
      return {
        success: false,
        error: errorData.error || `Error ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al generar ejercicios',
    };
  }
};

/**
 * Verifica si una respuesta es correcta usando el backend
 * @param request - Datos de la respuesta del usuario
 * @returns Promesa con el resultado de la verificación
 */
export const checkAnswer = async (
  request: CheckAnswerRequest
): Promise<CheckAnswerResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tutor/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error del servidor' }));
      return {
        success: true,
        isCorrect: false,
        feedback: errorData.error || 'Error al verificar la respuesta',
      };
    }

    const data = await response.json();

    return {
      success: true,
      isCorrect: data.isCorrect,
      feedback: data.feedback,
      correctAnswer: data.isCorrect ? undefined : request.correctAnswer,
    };
  } catch (error) {
    return {
      success: true,
      isCorrect: false,
      feedback: error instanceof Error ? error.message : 'Error al verificar la respuesta',
    };
  }
};

// API del tutor
export const tutorApi = {
  explain,
  generateExercises,
  checkAnswer,
};
