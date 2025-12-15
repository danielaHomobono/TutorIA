import type { Subject, Level } from '../types';

interface HistoryFiltersProps {
  selectedSubject: Subject | 'all';
  selectedLevel: Level | 'all';
  onSubjectChange: (subject: Subject | 'all') => void;
  onLevelChange: (level: Level | 'all') => void;
}

const HistoryFilters = ({
  selectedSubject,
  selectedLevel,
  onSubjectChange,
  onLevelChange,
}: HistoryFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Filtrar sesiones</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject Filter */}
        <div>
          <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Materia
          </label>
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value as Subject | 'all')}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas las materias</option>
            <option value="matematica">📐 Matemática</option>
            <option value="fisica">⚡ Física</option>
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Nivel
          </label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value as Level | 'all')}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los niveles</option>
            <option value="secundaria">Secundaria</option>
            <option value="universidad">Universidad</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;
