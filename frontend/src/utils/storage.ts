import type { Session } from '../types';

const HISTORY_STORAGE_KEY = 'tutoria_history';

/**
 * Carga el historial desde localStorage
 */
export const loadHistory = (): Session[] => {
  try {
    const data = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!data) return [];

    const sessions = JSON.parse(data) as Session[];
    
    // Convertir timestamps de string a Date
    return sessions.map(session => ({
      ...session,
      timestamp: new Date(session.timestamp),
      explanation: {
        ...session.explanation,
        timestamp: new Date(session.explanation.timestamp),
      },
    }));
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

/**
 * Guarda el historial en localStorage
 */
export const saveHistory = (sessions: Session[]): void => {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

/**
 * Limpia el historial de localStorage
 */
export const clearStoredHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};

/**
 * Genera un ID único para una sesión
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
