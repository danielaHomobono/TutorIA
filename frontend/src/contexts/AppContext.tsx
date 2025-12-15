import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Subject, Level, Explanation, Exercise, Session } from '../types';
import { loadHistory, saveHistory, clearStoredHistory, generateSessionId } from '../utils/storage';
import { tutorApi } from '../services/tutorApi';

/**
 * Estado global de la aplicación
 */
interface AppState {
  // Estado del tutor
  subject: Subject;
  level: Level;
  topic: string;
  explanation: Explanation | null;
  exercises: Exercise[];
  
  // Historial de sesiones
  sessions: Session[];
  
  // Estados de carga
  loading: boolean;
  loadingExercises: boolean;
  loadingSessions: boolean;
  
  // Manejo de errores global
  error: string | null;
}

/**
 * Acciones disponibles en el contexto
 */
interface AppActions {
  // Acciones del tutor
  setSubject: (subject: Subject) => void;
  setLevel: (level: Level) => void;
  setTopic: (topic: string) => void;
  explain: () => Promise<void>;
  generateExercises: () => Promise<void>;
  updateExerciseAnswer: (exerciseId: number, answer: string) => void;
  checkAnswer: (exerciseId: number) => Promise<void>;
  checkAllAnswers: () => Promise<void>;
  clearExplanation: () => void;
  clearError: () => void;
  isValid: () => boolean;
  
  // Acciones del historial
  addSession: (session: Omit<Session, 'id' | 'timestamp'>) => void;
  deleteSession: (id: string) => void;
  clearHistory: () => void;
  getSessionById: (id: string) => Session | undefined;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Hook para acceder al contexto de la aplicación
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider principal de la aplicación
 * Combina el estado del tutor con el historial de sesiones
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  // Estado del tutor
  const [subject, setSubject] = useState<Subject>('matematica');
  const [level, setLevel] = useState<Level>('secundaria');
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  
  // Historial de sesiones
  const [sessions, setSessions] = useState<Session[]>([]);
  
  // Estados de carga
  const [loading, setLoading] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  
  // Manejo de errores
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // EFECTOS: Cargar y guardar historial
  // ============================================
  
  useEffect(() => {
    const loadedSessions = loadHistory();
    setSessions(loadedSessions);
    setLoadingSessions(false);
  }, []);

  useEffect(() => {
    if (!loadingSessions) {
      saveHistory(sessions);
    }
  }, [sessions, loadingSessions]);

  // ============================================
  // ACCIONES DEL TUTOR
  // ============================================

  /**
   * Valida que el tema sea válido
   */
  const isValid = useCallback((): boolean => {
    return topic.trim().length >= 3;
  }, [topic]);

  /**
   * Limpia el error actual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Resetea la explicación actual
   */
  const clearExplanation = useCallback(() => {
    setExplanation(null);
    setExercises([]);
  }, []);

  /**
   * Solicita una explicación al tutor
   */
  const explain = useCallback(async () => {
    if (!isValid()) {
      setError('Por favor ingresa un tema válido (mínimo 3 caracteres)');
      return;
    }

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
        
        // Agregar automáticamente al historial
        addSession({
          subject,
          level,
          topic: topic.trim(),
          explanation: response.data,
          exercises: [],
          score: {
            correct: 0,
            total: 0,
            percentage: 0,
          },
        });
      } else {
        setError(response.error || 'Error al obtener la explicación');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado al conectar con el servidor';
      setError(errorMessage);
      console.error('Error en explain:', err);
    } finally {
      setLoading(false);
    }
  }, [subject, level, topic, isValid]);

  /**
   * Genera ejercicios sobre el tema actual
   */
  const generateExercises = useCallback(async () => {
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
        
        // Actualizar la sesión actual con los ejercicios
        setSessions(prev => {
          const updated = [...prev];
          if (updated.length > 0 && updated[0].topic === topic.trim() && response.data) {
            updated[0] = { 
              ...updated[0], 
              exercises: response.data,
              score: {
                correct: 0,
                total: response.data.length,
                percentage: 0,
              }
            };
          }
          return updated;
        });
      } else {
        setError(response.error || 'Error al generar ejercicios');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado al generar ejercicios';
      setError(errorMessage);
      console.error('Error en generateExercises:', err);
    } finally {
      setLoadingExercises(false);
    }
  }, [subject, level, topic, isValid]);

  /**
   * Actualiza la respuesta del usuario en un ejercicio
   */
  const updateExerciseAnswer = useCallback((exerciseId: number, answer: string) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId
          ? { ...ex, userAnswer: answer, isCorrect: undefined, feedback: undefined }
          : ex
      )
    );
  }, []);

  /**
   * Verifica la respuesta de un ejercicio específico
   */
  const checkAnswer = useCallback(async (exerciseId: number) => {
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
      const errorMessage = err instanceof Error ? err.message : 'Error al verificar respuesta';
      setError(errorMessage);
      console.error('Error checking answer:', err);
    }
  }, [exercises]);

  /**
   * Verifica todas las respuestas de los ejercicios
   */
  const checkAllAnswers = useCallback(async () => {
    const promises = exercises
      .filter(ex => ex.userAnswer?.trim() && ex.isCorrect === undefined)
      .map(ex => checkAnswer(ex.id));

    await Promise.all(promises);
  }, [exercises, checkAnswer]);

  // ============================================
  // ACCIONES DEL HISTORIAL
  // ============================================

  /**
   * Agrega una nueva sesión al historial
   */
  const addSession = useCallback((sessionData: Omit<Session, 'id' | 'timestamp'>) => {
    const newSession: Session = {
      ...sessionData,
      id: generateSessionId(),
      timestamp: new Date(),
    };

    setSessions(prev => [newSession, ...prev]);
  }, []);

  /**
   * Elimina una sesión del historial
   */
  const deleteSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  }, []);

  /**
   * Limpia todo el historial
   */
  const clearHistory = useCallback(() => {
    setSessions([]);
    clearStoredHistory();
  }, []);

  /**
   * Obtiene una sesión por ID
   */
  const getSessionById = useCallback((id: string): Session | undefined => {
    return sessions.find(session => session.id === id);
  }, [sessions]);

  // ============================================
  // CONTEXTO
  // ============================================

  const value: AppContextType = {
    // Estado
    subject,
    level,
    topic,
    explanation,
    exercises,
    sessions,
    loading,
    loadingExercises,
    loadingSessions,
    error,
    
    // Acciones del tutor
    setSubject,
    setLevel,
    setTopic,
    explain,
    generateExercises,
    updateExerciseAnswer,
    checkAnswer,
    checkAllAnswers,
    clearExplanation,
    clearError,
    isValid,
    
    // Acciones del historial
    addSession,
    deleteSession,
    clearHistory,
    getSessionById,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
