interface FeedbackAlertProps {
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
  onClose?: () => void;
  className?: string;
}

const FeedbackAlert = ({ type, message, onClose, className = '' }: FeedbackAlertProps) => {
  const styles = {
    error: 'bg-red-50 border-red-400 text-red-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    success: 'bg-green-50 border-green-400 text-green-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  };

  const icons = {
    error: '❌',
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
  };

  const ariaLabels = {
    error: 'Error',
    info: 'Información',
    success: 'Éxito',
    warning: 'Advertencia',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 sm:p-5 border-l-4 rounded ${styles[type]} ${className}`}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      aria-label={ariaLabels[type]}
    >
      <span className="text-lg sm:text-xl flex-shrink-0" aria-hidden="true">
        {icons[type]}
      </span>
      <p className="flex-1 text-sm sm:text-base font-medium leading-relaxed">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current opacity-60 hover:opacity-100 transition-opacity p-1 flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label="Cerrar alerta"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default FeedbackAlert;
