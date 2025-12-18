// Tipos de materias disponibles
export type Subject = 'matematica' | 'fisica';

// Niveles educativos
export type Level = 'secundaria' | 'universidad';

// Preferencias de aprendizaje
export interface LearningPreferences {
  easyReading: boolean;      // Usar lenguaje simplificado
  examples: boolean;          // Incluir ejemplos prácticos
  analogies: boolean;         // Usar analogías y metáforas
  stepByStep: boolean;        // Desglosar en pasos detallados
  realWorldContext: boolean;  // Conectar con situaciones reales
}

// Perfil del estudiante
export interface StudentProfile {
  age: number | null;              // Edad del estudiante
  levelDetail: string;             // Detalle del nivel (ej. "3er año")
  priorKnowledge: string[];        // Temas ya conocidos
  difficulties: string[];          // Conceptos problemáticos
  interests: string[];             // Intereses personales (autos, deportes, música, etc.)
}

// Paso individual de una explicación
export interface ExplanationStep {
  id: number;
  title: string;
  content: string;
  formula?: string;
}

// Explicación completa del tutor
export interface Explanation {
  subject: Subject;
  level: Level;
  topic: string;
  summary: string;
  steps: ExplanationStep[];
  timestamp: Date;
}

// Estado del tutor
export interface TutorState {
  subject: Subject;
  level: Level;
  topic: string;
  explanation: Explanation | null;
  loading: boolean;
  error: string | null;
}

// Respuesta de la API
export interface ExplainResponse {
  success: boolean;
  data?: Explanation;
  error?: string;
}

// Request para explicación
export interface ExplainRequest {
  subject: Subject;
  level: Level;
  topic: string;
  profileData?: {
    age: number | null;
    levelDetail: string;
    priorKnowledge: string[];
    difficulties: string[];
    preferences: LearningPreferences;
  };
  recentSessions?: Session[];
}

// Ejercicio individual
export interface Exercise {
  id: number;
  question: string;
  correctAnswer: string;
  hint?: string;
  userAnswer?: string;
  isCorrect?: boolean;
  feedback?: string;
}

// Respuesta del usuario a un ejercicio
export interface ExerciseAnswer {
  exerciseId: number;
  answer: string;
}

// Request para generar ejercicios
export interface GenerateExercisesRequest {
  subject: Subject;
  level: Level;
  topic: string;
  count?: number;
  profileData?: {
    age: number | null;
    levelDetail: string;
    priorKnowledge: string[];
    difficulties: string[];
    preferences: LearningPreferences;
  };
  recentSessions?: Session[];
}

// Response para generar ejercicios
export interface GenerateExercisesResponse {
  success: boolean;
  data?: Exercise[];
  error?: string;
}

// Request para verificar respuesta
export interface CheckAnswerRequest {
  exerciseId: number;
  userAnswer: string;
  correctAnswer: string;
}

// Response para verificar respuesta
export interface CheckAnswerResponse {
  success: boolean;
  isCorrect: boolean;
  feedback: string;
  correctAnswer?: string;
}

// Sesión de estudio (historial)
export interface Session {
  id: string;
  subject: Subject;
  level: Level;
  topic: string;
  explanation: Explanation;
  exercises: Exercise[];
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  timestamp: Date;
}

// Contexto de historial
export interface HistoryContextType {
  sessions: Session[];
  addSession: (session: Omit<Session, 'id' | 'timestamp'>) => void;
  getSessionById: (id: string) => Session | undefined;
  clearHistory: () => void;
  loading: boolean;
}
