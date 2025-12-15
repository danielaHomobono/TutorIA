import { useRef, useEffect } from 'react';
import type { Explanation } from '../types';

interface ExplanationPanelProps {
  explanation: Explanation;
}

const ExplanationPanel = ({ explanation }: ExplanationPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-focus cuando se muestra la explicación
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.focus();
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="card p-6 sm:p-8 space-y-8 animate-slideUp focus:outline-none focus:ring-4 focus:ring-primary-200 focus:ring-offset-2"
      role="region"
      aria-label="Explicación del tutor"
      aria-live="polite"
    >
      {/* Header */}
      <div className="border-b border-gradient-to-r from-primary-200 to-secondary-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce-gentle">🎓</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient reading-mode:text-4xl">
              {explanation.topic}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <span>🕰️</span>
            <span>
              {new Date(explanation.timestamp).toLocaleString('es-ES', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-1">💡</span>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed reading-mode:text-xl reading-mode:leading-loose font-medium">
              {explanation.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📝</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 reading-mode:text-2xl reading-mode:mb-6">
            Pasos de la explicación
          </h3>
        </div>
        <ol className="space-y-6 reading-mode:space-y-6" aria-label="Lista de pasos explicativos">
          {explanation.steps.map((step, index) => (
            <li
              key={step.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 sm:p-7 bg-gradient-to-r from-white to-primary-25 rounded-2xl border-l-4 border-primary-500 hover:from-primary-25 hover:to-primary-50 transition-all duration-300 hover:shadow-lg reading-mode:p-6 animate-slideUp"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full text-xl shadow-lg reading-mode:w-12 reading-mode:h-12 reading-mode:text-xl">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-3 text-lg sm:text-xl reading-mode:text-xl reading-mode:mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg reading-mode:text-lg reading-mode:leading-loose">
                  {step.content}
                </p>
                {step.formula && (
                  <div className="mt-4 p-4 sm:p-5 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-xl font-mono text-base sm:text-lg text-primary-800 overflow-x-auto reading-mode:text-lg reading-mode:p-5 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🧮</span>
                      <span className="font-sans font-semibold text-sm text-primary-600">Fórmula:</span>
                    </div>
                    {step.formula}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-200 text-center">
        <div className="bg-gradient-to-r from-success-50 to-primary-50 p-4 rounded-xl border border-success-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <span className="text-lg font-semibold text-gray-700">¡Explicación completada!</span>
          </div>
          <p className="text-base sm:text-lg text-gray-600 reading-mode:text-lg">
            ¿Necesitas más ayuda? Puedes hacer una nueva consulta arriba.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPanel;
