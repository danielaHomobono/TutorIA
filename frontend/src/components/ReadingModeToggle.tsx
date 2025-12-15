import { useReadingMode } from '../hooks/useReadingMode';

const ReadingModeToggle = () => {
  const { isReadingMode, toggleReadingMode } = useReadingMode();

  return (
    <button
      onClick={toggleReadingMode}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
        ${
          isReadingMode
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
      `}
      aria-pressed={isReadingMode}
      aria-label={isReadingMode ? 'Desactivar modo lectura fácil' : 'Activar modo lectura fácil'}
      title={isReadingMode ? 'Desactivar modo lectura fácil' : 'Activar modo lectura fácil'}
    >
      <span className="text-xl" aria-hidden="true">
        {isReadingMode ? '👓' : '📖'}
      </span>
      <span className="hidden sm:inline">
        {isReadingMode ? 'Modo lectura: ON' : 'Modo lectura'}
      </span>
    </button>
  );
};

export default ReadingModeToggle;
