import { useApp } from '../contexts/AppContext';

/**
 * Componente para configurar las preferencias de aprendizaje
 * Permite personalizar cómo se presentan las explicaciones
 */
export default function PreferencesSettings() {
  const { preferences, updatePreferences } = useApp();

  const togglePreference = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  const preferenceOptions = [
    {
      key: 'easyReading' as const,
      icon: '📖',
      title: 'Lenguaje Simplificado',
      description: 'Usa palabras sencillas y oraciones cortas',
    },
    {
      key: 'examples' as const,
      icon: '💡',
      title: 'Ejemplos Prácticos',
      description: 'Incluye ejercicios resueltos paso a paso',
    },
    {
      key: 'analogies' as const,
      icon: '🔗',
      title: 'Analogías y Metáforas',
      description: 'Relaciona conceptos con situaciones cotidianas',
    },
    {
      key: 'stepByStep' as const,
      icon: '📝',
      title: 'Pasos Detallados',
      description: 'Desglosa procedimientos en pequeños pasos',
    },
    {
      key: 'realWorldContext' as const,
      icon: '🌍',
      title: 'Contexto del Mundo Real',
      description: 'Conecta con aplicaciones prácticas',
    },
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ⚙️ Preferencias de Aprendizaje
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Personaliza cómo quieres que se presenten las explicaciones
        </p>
      </div>

      <div className="space-y-4">
        {preferenceOptions.map((option) => (
          <div
            key={option.key}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            {/* Icono */}
            <div className="text-3xl shrink-0">
              {option.icon}
            </div>

            {/* Contenido */}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">
                {option.title}
              </h4>
              <p className="text-sm text-gray-600">
                {option.description}
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => togglePreference(option.key)}
              className={`
                relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${preferences[option.key] ? 'bg-blue-600' : 'bg-gray-200'}
              `}
              role="switch"
              aria-checked={preferences[option.key]}
              aria-label={`Toggle ${option.title}`}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                  transition duration-200 ease-in-out
                  ${preferences[option.key] ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Resumen de preferencias activas */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Preferencias activas:</span>{' '}
          {Object.values(preferences).filter(Boolean).length} de {Object.keys(preferences).length}
        </p>
      </div>
    </div>
  );
}
