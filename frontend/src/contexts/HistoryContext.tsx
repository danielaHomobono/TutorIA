import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Session, HistoryContextType } from '../types';
import { loadHistory, saveHistory, clearStoredHistory, generateSessionId } from '../utils/storage';

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within HistoryProvider');
  }
  return context;
};

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar historial al montar
  useEffect(() => {
    const loadedSessions = loadHistory();
    setSessions(loadedSessions);
    setLoading(false);
  }, []);

  // Guardar en localStorage cuando cambie el historial
  useEffect(() => {
    if (!loading) {
      saveHistory(sessions);
    }
  }, [sessions, loading]);

  /**
   * Agrega una nueva sesión al historial
   */
  const addSession = (sessionData: Omit<Session, 'id' | 'timestamp'>) => {
    const newSession: Session = {
      ...sessionData,
      id: generateSessionId(),
      timestamp: new Date(),
    };

    setSessions(prev => [newSession, ...prev]);
  };

  /**
   * Obtiene una sesión por ID
   */
  const getSessionById = (id: string): Session | undefined => {
    return sessions.find(session => session.id === id);
  };

  /**
   * Limpia todo el historial
   */
  const clearHistory = () => {
    setSessions([]);
    clearStoredHistory();
  };

  const value: HistoryContextType = {
    sessions,
    addSession,
    getSessionById,
    clearHistory,
    loading,
  };

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};
