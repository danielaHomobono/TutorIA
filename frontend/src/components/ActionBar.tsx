import LoadingSpinner from './LoadingSpinner';

interface ActionBarProps {
  onExplain: () => void;
  disabled: boolean;
  loading: boolean;
}

const ActionBar = ({ onExplain, disabled, loading }: ActionBarProps) => {
  return (
    <div className="flex items-center justify-center animate-slideUp" style={{animationDelay: '0.3s'}}>
      <button
        onClick={onExplain}
        disabled={disabled || loading}
        className={`
          w-full sm:w-auto flex items-center justify-center gap-4 px-8 sm:px-12 py-4 sm:py-5 
          rounded-2xl font-bold text-lg sm:text-xl
          transition-all duration-300 transform min-h-[60px] shadow-xl
          ${
            disabled || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white hover:from-primary-600 hover:via-primary-700 hover:to-secondary-600 hover:scale-105 hover:shadow-2xl active:scale-95'
          }
        `}
        aria-busy={loading}
        aria-live="polite"
        aria-disabled={disabled || loading}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" className="text-white" />
            <span>Generando explicación...</span>
          </>
        ) : (
          <>
            <span aria-hidden="true" className="text-2xl animate-bounce-gentle">🧠</span>
            <span>Explicar Tema</span>
            <span aria-hidden="true" className="text-2xl animate-pulse-soft">✨</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ActionBar;
