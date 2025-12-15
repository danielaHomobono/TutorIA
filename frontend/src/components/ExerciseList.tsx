import type { Exercise } from '../types';
import ExerciseItem from './ExerciseItem';
import LoadingSpinner from './LoadingSpinner';

interface ExerciseListProps {
  exercises: Exercise[];
  onAnswerChange: (exerciseId: number, answer: string) => void;
  onCheckAnswer: (exerciseId: number) => void;
  onCheckAll: () => void;
  loading?: boolean;
}

const ExerciseList = ({
  exercises,
  onAnswerChange,
  onCheckAnswer,
  onCheckAll,
  loading = false,
}: ExerciseListProps) => {
  if (exercises.length === 0) {
    return null;
  }

  // Calcular estadísticas
  const totalExercises = exercises.length;
  const answeredExercises = exercises.filter(ex => ex.isCorrect !== undefined).length;
  const correctExercises = exercises.filter(ex => ex.isCorrect === true).length;

  const allAnswered = answeredExercises === totalExercises;
  const someUnanswered = exercises.some(ex => ex.userAnswer?.trim() && ex.isCorrect === undefined);

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">📝 Ejercicios de práctica</h3>
          <p className="text-sm text-gray-600">
            Resuelve los ejercicios para verificar tu comprensión del tema
          </p>
        </div>
        {answeredExercises > 0 && (
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {correctExercises}/{totalExercises}
            </div>
            <div className="text-sm text-gray-600">correctas</div>
          </div>
        )}
      </div>

      {/* Exercises List */}
      <ol className="space-y-4" aria-label="Lista de ejercicios">
        {exercises.map((exercise, index) => (
          <li key={exercise.id} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full mt-5">
              {index + 1}
            </div>
            <div className="flex-1">
              <ExerciseItem
                exercise={exercise}
                onAnswerChange={onAnswerChange}
                onCheck={onCheckAnswer}
                disabled={loading}
              />
            </div>
          </li>
        ))}
      </ol>

      {/* Check All Button */}
      {someUnanswered && !allAnswered && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onCheckAll}
            disabled={loading}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-lg
              transition-all transform
              ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-lg'
              }
            `}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <span>✓</span>
                <span>Corregir todo</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Summary Message */}
      {allAnswered && (
        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-medium">
            {correctExercises === totalExercises
              ? '🎉 ¡Perfecto! Has completado todos los ejercicios correctamente.'
              : `Has completado todos los ejercicios. ${correctExercises} de ${totalExercises} correctas.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
