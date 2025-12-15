interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const TopicInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Ej: derivadas, cinemática, ecuaciones cuadráticas...',
}: TopicInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  const isValid = value.trim().length >= 3;

  return (
    <div className="space-y-4 animate-slideUp" style={{animationDelay: '0.2s'}}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">
          💡
        </div>
        <input
          id="topic-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          className={`
            w-full pl-14 pr-12 py-4 sm:py-5 text-lg sm:text-xl border-2 rounded-2xl transition-all duration-300
            min-h-[60px] font-medium
            focus:outline-none focus:ring-4 focus:ring-primary-200 focus:ring-offset-2
            placeholder:text-gray-400 placeholder:font-normal
            ${
              disabled
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200'
                : 'bg-white/80 backdrop-blur-sm text-gray-900'
            }
            ${
              value && !isValid
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : isValid
                ? 'border-success-400 focus:border-success-500 focus:ring-success-200'
                : 'border-gray-200 focus:border-primary-500'
            }
          `}
          aria-invalid={value.length > 0 && !isValid}
          aria-describedby="topic-hint topic-error"
          aria-required="true"
        />
        {value && !disabled && (
          <button
            onClick={() => onChange('')}
            disabled={disabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 rounded-full hover:bg-gray-100"
            aria-label="Limpiar campo de tema"
            type="button"
          >
            ✕
          </button>
        )}
        {isValid && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 text-success-500 text-xl animate-pulse-soft">
            ✓
          </div>
        )}
      </div>
      
      <div id="topic-hint" className="space-y-2">
        {value && !isValid && (
          <div id="topic-error" className="flex items-center gap-2 text-red-600 font-medium animate-slideUp" role="alert">
            <span className="text-lg">⚠️</span>
            <span>Mínimo 3 caracteres</span>
          </div>
        )}
        {isValid && (
          <div className="flex items-center gap-2 text-success-600 font-medium animate-slideUp">
            <span className="text-lg">✓</span>
            <span>¡Perfecto! Presiona Enter o haz clic en "Explicar"</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-lg">📝</span>
          <span>Ingresa el tema que deseas que el tutor te explique</span>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
