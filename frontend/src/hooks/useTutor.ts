import { useState } from 'react';
import type { Subject, Level, Explanation, Exercise } from '../types';
import { tutorApi } from '../services/tutorApi';

export const useTutor = () => {
  const [subject, setSubject] = useState<Subject>('matematica');
  const [level, setLevel] = useState<Level>('secundaria');
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Valida que todos los campos requeridos estén completos
   */
  const isValid = (): boolean => {
    return topic.trim().length >= 3;
  };

  /**
   * Limpia el error actual
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Resetea la explicación actual
   */
  const clearExplanation = () => {
    setExplanation(null);
  };

  /**
   * Solicita una explicación al tutor
   */
  const explain = async () => {
    // Validación local
    if (!isValid()) {
      setError('Por favor ingresa un tema válido (mínimo 3 caracteres)');
      return;
    }

    // Limpiar estados previos
    setError(null);
    setExplanation(null);
    setExercises([]);
    setLoading(true);

    try {
      const response = await tutorApi.explain({
        subject,
        level,
        topic: topic.trim(),
      });

      if (response.success && response.data) {
        setExplanation(response.data);
      } else {
        setError(response.error || 'Error al obtener la explicación');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Genera ejercicios sobre el tema actual
   */
  const generateExercises = async () => {
    if (!isValid()) {
      setError('Por favor ingresa un tema válido primero');
      return;
    }

    setError(null);
    setLoadingExercises(true);

    try {
      const response = await tutorApi.generateExercises({
        subject,
        level,
        topic: topic.trim(),
        count: 3,
      });

      if (response.success && response.data) {
        setExercises(response.data);
      } else {
        setError(response.error || 'Error al generar ejercicios');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoadingExercises(false);
    }
  };

  /**
   * Actualiza la respuesta del usuario en un ejercicio
   */
  const updateExerciseAnswer = (exerciseId: number, answer: string) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId
          ? { ...ex, userAnswer: answer, isCorrect: undefined, feedback: undefined }
          : ex
      )
    );
  };

  /**
   * Verifica la respuesta de un ejercicio específico
   */
  const checkAnswer = async (exerciseId: number) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (!exercise || !exercise.userAnswer?.trim()) {
      return;
    }

    try {
      const response = await tutorApi.checkAnswer({
        exerciseId,
        userAnswer: exercise.userAnswer,
        correctAnswer: exercise.correctAnswer,
      });

      if (response.success) {
        setExercises(prev =>
          prev.map(ex =>
            ex.id === exerciseId
              ? {
                  ...ex,
                  isCorrect: response.isCorrect,
                  feedback: response.feedback,
                }
              : ex
          )
        );
      }
    } catch (err) {
      console.error('Error checking answer:', err);
    }
  };

  /**
   * Verifica todas las respuestas de los ejercicios
   */
  const checkAllAnswers = async () => {
    const promises = exercises
      .filter(ex => ex.userAnswer?.trim() && ex.isCorrect === undefined)
      .map(ex => checkAnswer(ex.id));

    await Promise.all(promises);
  };

  /**
   * Limpia los ejercicios actuales
   */
  const clearExercises = () => {
    setExercises([]);
  };

  return {
    // Estado
    subject,
    level,
    topic,
    explanation,
    exercises,
    loading,
    loadingExercises,
    error,

    // Setters
    setSubject,
    setLevel,
    setTopic,

    // Acciones
    explain,
    generateExercises,
    updateExerciseAnswer,
    checkAnswer,
    checkAllAnswers,
    clearError,
    clearExplanation,
    clearExercises,

    // Utilidades
    isValid,
  };
};
