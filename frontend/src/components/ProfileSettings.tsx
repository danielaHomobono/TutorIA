import { useState } from 'react';
import { useApp } from '../contexts/AppContext';

/**
 * Componente para configurar el perfil del estudiante
 * Permite editar edad, nivel detallado, conocimientos previos y dificultades
 */
export default function ProfileSettings() {
  const { 
    studentProfile, 
    updateStudentProfile, 
    addPriorKnowledge, 
    addDifficulty, 
    removeDifficulty 
  } = useApp();

  const [newKnowledge, setNewKnowledge] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('');

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateStudentProfile({
      age: value === '' ? null : parseInt(value, 10),
    });
  };

  const handleLevelDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStudentProfile({
      levelDetail: e.target.value,
    });
  };

  const handleAddKnowledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKnowledge.trim()) {
      addPriorKnowledge(newKnowledge.trim());
      setNewKnowledge('');
    }
  };

  const handleAddDifficulty = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDifficulty.trim()) {
      addDifficulty(newDifficulty.trim());
      setNewDifficulty('');
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🎓 Perfil del Estudiante
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Configura tu perfil para recibir explicaciones adaptadas a tu nivel y necesidades
        </p>
      </div>

      {/* Edad */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Edad
        </label>
        <input
          id="age"
          type="number"
          min="6"
          max="99"
          value={studentProfile.age ?? ''}
          onChange={handleAgeChange}
          placeholder="Ej: 15"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="mt-1 text-xs text-gray-500">
          Nos ayuda a adaptar el lenguaje a tu edad
        </p>
      </div>

      {/* Nivel Detallado */}
      <div>
        <label htmlFor="levelDetail" className="block text-sm font-medium text-gray-700 mb-2">
          Nivel Detallado
        </label>
        <input
          id="levelDetail"
          type="text"
          value={studentProfile.levelDetail}
          onChange={handleLevelDetailChange}
          placeholder="Ej: 3er año de secundaria, 1er semestre de universidad"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="mt-1 text-xs text-gray-500">
          Especifica tu año o semestre actual
        </p>
      </div>

      {/* Conocimientos Previos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conocimientos Previos
        </label>
        
        {/* Lista de conocimientos */}
        {studentProfile.priorKnowledge.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {studentProfile.priorKnowledge.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Formulario para agregar */}
        <form onSubmit={handleAddKnowledge} className="flex gap-2">
          <input
            type="text"
            value={newKnowledge}
            onChange={(e) => setNewKnowledge(e.target.value)}
            placeholder="Ej: álgebra, trigonometría..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Agregar
          </button>
        </form>
        <p className="mt-1 text-xs text-gray-500">
          Temas que ya dominas (se agregan automáticamente al explicar)
        </p>
      </div>

      {/* Dificultades */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Temas Difíciles
        </label>
        
        {/* Lista de dificultades */}
        {studentProfile.difficulties.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {studentProfile.difficulties.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
              >
                {topic}
                <button
                  onClick={() => removeDifficulty(topic)}
                  className="ml-1 hover:text-orange-900 transition-colors"
                  aria-label={`Quitar ${topic}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Formulario para agregar */}
        <form onSubmit={handleAddDifficulty} className="flex gap-2">
          <input
            type="text"
            value={newDifficulty}
            onChange={(e) => setNewDifficulty(e.target.value)}
            placeholder="Ej: límites, integrales..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Agregar
          </button>
        </form>
        <p className="mt-1 text-xs text-gray-500">
          Conceptos con los que tienes problemas (recibirás explicaciones más detalladas)
        </p>
      </div>
    </div>
  );
}
