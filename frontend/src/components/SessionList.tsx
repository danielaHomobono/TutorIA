import type { Session } from '../types';
import SessionCard from './SessionCard';

interface SessionListProps {
  sessions: Session[];
}

const SessionList = ({ sessions }: SessionListProps) => {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No hay sesiones en el historial
        </h3>
        <p className="text-gray-600 mb-4">
          Completa algunos ejercicios en la página del Tutor para ver tus sesiones aquí.
        </p>
        <a
          href="/tutor"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ir al Tutor
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Mostrando {sessions.length} {sessions.length === 1 ? 'sesión' : 'sesiones'}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default SessionList;
