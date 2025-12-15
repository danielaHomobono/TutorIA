import { useState } from 'react';
import type { Exercise } from '../types';
import FeedbackAlert from './FeedbackAlert';

interface ExerciseItemProps {
  exercise: Exercise;
  onAnswerChange: (exerciseId: number, answer: string) => void;
  onCheck: (exerciseId: number) => void;
  disabled?: boolean;
}

const ExerciseItem = ({ exercise, onAnswerChange, onCheck, disabled = false }: ExerciseItemProps) => {
  const [showHint, setShowHint] = useState(false);

  const handleCheck = () => {
    if (exercise.userAnswer?.trim()) {
      onCheck(exercise.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      handleCheck();
    }
  };

  return (
    <div
      className={`
        bg-white border-2 rounded-lg p-5 transition-all
        ${exercise.isCorrect === true ? 'border-green-400 bg-green-50' : ''}
        ${exercise.isCorrect === false ? 'border-red-400 bg-red-50' : 'border-gray-200'}
      `}
    >
      {/* Question */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 text-lg mb-2">{exercise.question}</h4>
        
        {/* Hint Toggle */}
        {exercise.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            aria-expanded={showHint}
          >
            {showHint ? '🔼 Ocultar' : '💡 Ver pista'}
          </button>
        )}
        
        {/* Hint Content */}
        {showHint && exercise.hint && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900">
            💡 {exercise.hint}
          </div>
        )}
      </div>

      {/* Answer Input */}
      <div className="mb-3">
        <label htmlFor={`exercise-${exercise.id}`} className="sr-only">
          Tu respuesta
        </label>
        <div className="flex gap-2">
          <input
            id={`exercise-${exercise.id}`}
            type="text"
            value={exercise.userAnswer || ''}
            onChange={(e) => onAnswerChange(exercise.id, e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || exercise.isCorrect !== undefined}
            placeholder="Escribe tu respuesta aquí..."
            className={`
              flex-1 px-4 py-2 border-2 rounded-lg transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${disabled || exercise.isCorrect !== undefined 
                ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                : 'bg-white text-gray-900'}
              ${exercise.isCorrect === true ? 'border-green-500' : ''}
              ${exercise.isCorrect === false ? 'border-red-500' : 'border-gray-300'}
            `}
            aria-invalid={exercise.isCorrect === false}
          />
          <button
            onClick={handleCheck}
            disabled={disabled || !exercise.userAnswer?.trim() || exercise.isCorrect !== undefined}
            className={`
              px-6 py-2 rounded-lg font-medium transition-all
              ${
                disabled || !exercise.userAnswer?.trim() || exercise.isCorrect !== undefined
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              }
            `}
            aria-label="Verificar respuesta"
          >
            {exercise.isCorrect !== undefined ? '✓' : 'Verificar'}
          </button>
        </div>
      </div>

      {/* Feedback */}
      {exercise.feedback && (
        <FeedbackAlert
          type={exercise.isCorrect ? 'success' : 'error'}
          message={exercise.feedback}
        />
      )}
    </div>
  );
};

export default ExerciseItem;
