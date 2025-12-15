import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import SubjectTabs from '../components/SubjectTabs';
import LevelSelector from '../components/LevelSelector';
import TopicInput from '../components/TopicInput';
import ActionBar from '../components/ActionBar';
import ExplanationPanel from '../components/ExplanationPanel';
import ExerciseList from '../components/ExerciseList';
import FeedbackAlert from '../components/FeedbackAlert';
import LoadingSpinner from '../components/LoadingSpinner';

const Tutor = () => {
  const location = useLocation();
  const {
    subject,
    level,
    topic,
    explanation,
    exercises,
    loading,
    loadingExercises,
    error,
    setSubject,
    setLevel,
    setTopic,
    explain,
    generateExercises,
    updateExerciseAnswer,
    checkAnswer,
    checkAllAnswers,
    clearError,
    isValid,
  } = useApp();

  // Cargar datos de la sesión si vienen del historial (retry)
  useEffect(() => {
    const state = location.state as { subject?: string; level?: string; topic?: string } | null;
    if (state?.subject && state?.level && state?.topic) {
      setSubject(state.subject as any);
      setLevel(state.level as any);
      setTopic(state.topic);
    }
  }, [location.state, setSubject, setLevel, setTopic]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="text-5xl sm:text-6xl animate-bounce-gentle">🧠</span>
            <span className="text-4xl sm:text-5xl animate-pulse-soft">✨</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Tutor IA</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Selecciona la materia, el nivel y el tema que deseas aprender
          </p>
        </div>

        {/* Main Form */}
        <div className="card p-6 sm:p-8 mb-8 space-y-8 animate-slideUp">
          {/* Subject Selection */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              📚 <span>Materia</span>
            </h2>
            <SubjectTabs
              selected={subject}
              onChange={setSubject}
              disabled={loading}
            />
          </div>

          {/* Level Selection */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              🎯 <span>Nivel</span>
            </h2>
            <LevelSelector
              selected={level}
              onChange={setLevel}
              disabled={loading}
            />
          </div>

          {/* Topic Input */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              💡 <span>Tema</span>
            </h2>
            <TopicInput
              value={topic}
              onChange={setTopic}
              onSubmit={explain}
              disabled={loading}
            />
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-gray-100">
            <ActionBar
              onExplain={explain}
              disabled={!isValid() || loading}
              loading={loading}
            />
          </div>
        </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <FeedbackAlert
            type="error"
            message={error}
            onClose={clearError}
          />
        </div>
      )}

        {/* Explanation Result */}
        {explanation && (
          <div className="mb-8 animate-slideUp">
            <ExplanationPanel explanation={explanation} />
            
            {/* Generate Exercises Button */}
            {exercises.length === 0 && (
              <div className="mt-8 text-center">
                <button
                  onClick={generateExercises}
                  disabled={loadingExercises}
                  className={`
                    inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg
                    transition-all duration-300 transform shadow-lg
                    ${
                      loadingExercises
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 hover:scale-105 hover:shadow-xl'
                    }
                  `}
                >
                  {loadingExercises ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Generando ejercicios...</span>
                    </>
                  ) : (
                    <>
                      <span>📝</span>
                      <span>Generar ejercicios</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exercises Section */}
        {exercises.length > 0 && (
          <div className="mb-8 animate-slideUp">
            <ExerciseList
              exercises={exercises}
              onAnswerChange={updateExerciseAnswer}
              onCheckAnswer={checkAnswer}
              onCheckAll={checkAllAnswers}
              loading={loadingExercises}
            />
          </div>
        )}

        {/* Help Text */}
        {!explanation && !loading && (
          <div className="text-center animate-slideUp" style={{animationDelay: '0.3s'}}>
            <div className="card p-6 max-w-2xl mx-auto">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Consejo</h3>
              <p className="text-gray-600">
                Prueba con <span className="font-semibold text-primary-600">"derivadas"</span> o <span className="font-semibold text-primary-600">"cinemática"</span> para ver ejemplos detallados
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutor;
