import type { Level } from '../types';

interface LevelSelectorProps {
  selected: Level;
  onChange: (level: Level) => void;
  disabled?: boolean;
}

const LevelSelector = ({ selected, onChange, disabled = false }: LevelSelectorProps) => {
  const levels: { value: Level; label: string }[] = [
    { value: 'secundaria', label: 'Secundaria' },
    { value: 'universidad', label: 'Universidad' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-labelledby="level-label">
        {levels.map((level, index) => (
          <label
            key={level.value}
            className={`
              flex items-center gap-4 px-6 py-4 rounded-2xl border-2 cursor-pointer 
              transition-all duration-300 min-h-[60px] w-full transform
              focus-within:ring-4 focus-within:ring-primary-200 focus-within:ring-offset-2
              animate-slideUp
              ${
                selected === level.value
                  ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-lg scale-105'
                  : 'border-gray-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:border-primary-200 hover:bg-gradient-to-r hover:from-primary-25 hover:to-primary-50 hover:shadow-md hover:scale-102'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <input
              type="radio"
              name="level"
              value={level.value}
              checked={selected === level.value}
              onChange={() => onChange(level.value)}
              disabled={disabled}
              className="sr-only"
              aria-label={level.label}
            />
            <span
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                selected === level.value ? 'border-primary-500 bg-primary-500' : 'border-gray-400'
              }`}
              aria-hidden="true"
            >
              {selected === level.value && (
                <span className="w-3 h-3 rounded-full bg-white animate-pulse-soft"></span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl">{level.value === 'secundaria' ? '🎓' : '🏦'}</span>
              <span className="font-semibold text-lg">{level.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
