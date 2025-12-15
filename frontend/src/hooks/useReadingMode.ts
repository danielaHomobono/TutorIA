import { useState, useEffect } from 'react';

const READING_MODE_KEY = 'tutoria_reading_mode';

/**
 * Hook para gestionar el modo de lectura fácil
 */
export const useReadingMode = () => {
  const [isReadingMode, setIsReadingMode] = useState(() => {
    try {
      const stored = localStorage.getItem(READING_MODE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(READING_MODE_KEY, String(isReadingMode));
      // Actualizar clase en el body para estilos globales
      if (isReadingMode) {
        document.body.classList.add('reading-mode');
      } else {
        document.body.classList.remove('reading-mode');
      }
    } catch (error) {
      console.error('Error saving reading mode:', error);
    }
  }, [isReadingMode]);

  const toggleReadingMode = () => {
    setIsReadingMode(prev => !prev);
  };

  return {
    isReadingMode,
    toggleReadingMode,
  };
};
