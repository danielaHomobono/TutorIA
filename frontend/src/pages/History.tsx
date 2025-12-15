import { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import type { Subject, Level } from '../types';
import SessionList from '../components/SessionList';
import HistoryFilters from '../components/HistoryFilters';
import LoadingSpinner from '../components/LoadingSpinner';

const History = () => {
  const { sessions, clearHistory, loadingSessions } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');

  // Filtrar sesiones
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchesSubject = selectedSubject === 'all' || session.subject === selectedSubject;
      const matchesLevel = selectedLevel === 'all' || session.level === selectedLevel;
      return matchesSubject && matchesLevel;
    });
  }, [sessions, selectedSubject, selectedLevel]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalExercises = sessions.reduce((sum, s) => sum + s.score.total, 0);
    const totalCorrect = sessions.reduce((sum, s) => sum + s.score.correct, 0);
    const avgScore = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 100) : 0;

    return {
      totalSessions,
      totalExercises,
      totalCorrect,
      avgScore,
    };
  }, [sessions]);

  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo el historial? Esta acción no se puede deshacer.')) {
      clearHistory();
    }
  };

  if (loadingSessions) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Historial de estudio</h1>
        <p className="text-lg text-gray-600">
          Revisa tus sesiones anteriores y observa tu progreso
        </p>
      </div>

      {/* Stats */}
      {sessions.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalSessions}</div>
            <div className="text-sm text-gray-600">Sesiones</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{stats.totalExercises}</div>
            <div className="text-sm text-gray-600">Ejercicios</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.totalCorrect}</div>
            <div className="text-sm text-gray-600">Correctos</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.avgScore}%</div>
            <div className="text-sm text-gray-600">Promedio</div>
          </div>
        </div>
      )}

      {/* Filters */}
      {sessions.length > 0 && (
        <HistoryFilters
          selectedSubject={selectedSubject}
          selectedLevel={selectedLevel}
          onSubjectChange={setSelectedSubject}
          onLevelChange={setSelectedLevel}
        />
      )}

      {/* Clear History Button */}
      {sessions.length > 0 && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🗑️ Borrar historial
          </button>
        </div>
      )}

      {/* Session List */}
      <SessionList sessions={filteredSessions} />
    </div>
  );
};

export default History;
