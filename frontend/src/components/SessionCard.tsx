import { useNavigate } from 'react-router-dom';
import type { Session } from '../types';

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Navegar a la página del tutor con los datos de la sesión
    navigate('/tutor', {
      state: {
        subject: session.subject,
        level: session.level,
        topic: session.topic,
      },
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const subjectEmoji = session.subject === 'matematica' ? '📐' : '⚡';

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">
              {subjectEmoji}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{session.topic}</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {session.subject === 'matematica' ? 'Matemática' : 'Física'}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
              {session.level === 'secundaria' ? 'Secundaria' : 'Universidad'}
            </span>
            <span className="text-gray-500">
              {new Date(session.timestamp).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Score Badge */}
        <div
          className={`flex flex-col items-center justify-center w-20 h-20 border-2 rounded-lg ${getScoreBgColor(
            session.score.percentage
          )}`}
        >
          <div className={`text-2xl font-bold ${getScoreColor(session.score.percentage)}`}>
            {session.score.percentage}%
          </div>
          <div className="text-xs text-gray-600">
            {session.score.correct}/{session.score.total}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={handleRetry}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <span>🔄</span>
          <span>Reintentar</span>
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          title="Ver detalles"
        >
          👁️
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
