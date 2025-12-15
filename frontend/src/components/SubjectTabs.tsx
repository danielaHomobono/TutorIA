import type { Subject } from '../types';

interface SubjectTabsProps {
  selected: Subject;
  onChange: (subject: Subject) => void;
  disabled?: boolean;
}

const SubjectTabs = ({ selected, onChange, disabled = false }: SubjectTabsProps) => {
  const subjects: { value: Subject; label: string; emoji: string }[] = [
    { value: 'matematica', label: 'Matemática', emoji: '📐' },
    { value: 'fisica', label: 'Física', emoji: '⚡' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" role="tablist" aria-label="Seleccionar materia">
      {subjects.map((subject, index) => (
        <button
          key={subject.value}
          role="tab"
          aria-selected={selected === subject.value}
          aria-controls={`panel-${subject.value}`}
          onClick={() => onChange(subject.value)}
          disabled={disabled}
          className={`
            flex items-center justify-center gap-3 px-6 py-4 sm:py-5 rounded-2xl font-semibold 
            transition-all duration-300 min-h-[60px] w-full transform
            focus:outline-none focus:ring-4 focus:ring-primary-200 focus:ring-offset-2
            animate-slideUp
            ${
              selected === subject.value
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl scale-105 border-2 border-primary-300'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:shadow-lg hover:scale-102 border-2 border-gray-200 hover:border-primary-200'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={{animationDelay: `${index * 0.1}s`}}
        >
          <span aria-hidden="true" className="text-2xl animate-bounce-gentle">{subject.emoji}</span>
          <span className="text-lg sm:text-xl">{subject.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SubjectTabs;
