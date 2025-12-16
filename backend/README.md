# TutorIA Backend API

Backend del sistema TutorIA - API REST para generación de explicaciones educativas y ejercicios.

## 🚀 Tecnologías

- **Node.js** con ES Modules
- **Express 5** - Framework web
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

## 📁 Estructura del proyecto

```
backend/
├── src/
│   ├── controllers/      # Lógica de negocio
│   │   ├── tutor.controller.js
│   │   └── history.controller.js
│   ├── routes/          # Definición de rutas
│   │   ├── tutor.routes.js
│   │   └── history.routes.js
│   ├── middleware/      # Middlewares personalizados
│   │   └── errorHandler.js
│   ├── utils/          # Utilidades
│   └── server.js       # Punto de entrada
├── .env                # Variables de entorno
├── .gitignore
└── package.json
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus configuraciones
```

## ▶️ Ejecución

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Tutor

#### Explicar un tema
```
POST /api/tutor/explain
Content-Type: application/json

{
  "subject": "matematica" | "fisica",
  "level": "secundaria" | "universidad",
  "topic": "string",
  
  // OPCIONAL: Datos de personalización
  "profileData": {
    "age": 15,                    // Edad del estudiante (opcional)
    "levelDetail": "3er año",     // Detalle del nivel (opcional)
    "priorKnowledge": [           // Temas ya conocidos (opcional)
      "ecuaciones lineales",
      "fracciones"
    ],
    "difficulties": [             // Conceptos difíciles (opcional)
      "factorización"
    ],
    "preferences": {              // Preferencias de aprendizaje (opcional)
      "easyReading": true,        // Lenguaje simplificado
      "examples": true,           // Incluir ejemplos
      "analogies": true,          // Usar analogías
      "stepByStep": true,         // Pasos detallados
      "realWorldContext": true    // Contexto real
    }
  },
  
  // OPCIONAL: Sesiones recientes para contexto
  "recentSessions": [
    {
      "topic": "ecuaciones lineales",
      "score": { "percentage": 85 },
      "timestamp": "2025-12-15T..."
    }
  ]
}

Response:
{
  "success": true,
  "data": {
    "subject": "matematica",
    "level": "secundaria",
    "topic": "ecuaciones cuadráticas",
    "summary": "Ya has trabajado con ecuaciones lineales antes. Vamos a profundizar...",
    "steps": [
      {
        "id": 1,
        "title": "📚 Introducción",
        "content": "..."
      },
      {
        "id": 2,
        "title": "🔑 Conceptos Clave",
        "content": "...",
        "formula": "ax² + bx + c = 0"
      }
    ],
    "metadata": {
      "adaptedFor": {
        "age": 15,
        "isYoungStudent": true,
        "preferences": { ... }
      },
      "context": {
        "isReview": false,
        "isDifficult": false,
        "relatedTopics": ["ecuaciones lineales"],
        "weaknesses": []
      }
    },
    "timestamp": "2025-12-16T..."
  },
  "personalization": {
    "applied": true,
    "contextUsed": 1
  }
}
```

#### Generar ejercicios
```
POST /api/tutor/exercises
Content-Type: application/json

{
  "subject": "matematica",
  "level": "secundaria",
  "topic": "ecuaciones",
  "count": 3,
  
  // OPCIONAL: Datos de personalización (igual que /explain)
  "profileData": { ... },
  "recentSessions": [ ... ]
}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "Ejercicio 1 (nivel básico): ...",
      "correctAnswer": "...",
      "hint": "Pista: Recuerda los conceptos básicos...",
      "difficulty": "fácil",
      "metadata": {
        "adaptedFor": "15 años",
        "focus": "refuerzo"
      }
    }
  ],
  "personalization": {
    "applied": true,
    "difficulty": "fácil",
    "contextUsed": 1
  }
}
```

#### Verificar respuesta
```
POST /api/tutor/check
Content-Type: application/json

{
  "exerciseId": 1,
  "userAnswer": "respuesta del usuario",
  "correctAnswer": "respuesta correcta"
}

Response:
{
  "success": true,
  "isCorrect": true,
  "feedback": "¡Correcto! Excelente trabajo. 🎉"
}
```

### Historial

#### Obtener todas las sesiones
```
GET /api/history

Response:
{
  "success": true,
  "data": [...],
  "count": 5
}
```

#### Obtener sesión por ID
```
GET /api/history/:id
```

#### Guardar nueva sesión
```
POST /api/history
Content-Type: application/json

{
  "id": "uuid",
  "subject": "matematica",
  "level": "secundaria",
  "topic": "...",
  "explanation": {...},
  "exercises": [...],
  "score": {...},
  "timestamp": "..."
}
```

#### Eliminar sesión
```
DELETE /api/history/:id
```

#### Limpiar todo el historial
```
DELETE /api/history
```

## 🔧 Variables de entorno

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=tu_clave_aqui  # Opcional
```

## 📝 Notas

### 🎓 Pedagogía Adaptativa

El backend incluye un sistema de **personalización pedagógica** que adapta las explicaciones y ejercicios según:

#### Perfil del Estudiante (`profileData`):
- **age**: Edad del estudiante (ajusta complejidad del lenguaje)
- **levelDetail**: Detalle específico del nivel (ej. "3er año", "cálculo I")
- **priorKnowledge**: Array de temas ya conocidos
- **difficulties**: Array de conceptos con los que tiene dificultades
- **preferences**: Objeto con preferencias de aprendizaje:
  - `easyReading`: Usar lenguaje simplificado
  - `examples`: Incluir ejemplos prácticos
  - `analogies`: Usar analogías y metáforas
  - `stepByStep`: Desglosar en pasos detallados
  - `realWorldContext`: Conectar con situaciones reales

#### Contexto del Historial (`recentSessions`):
- Analiza sesiones previas para identificar:
  - **Fortalezas**: Temas con score > 80%
  - **Debilidades**: Temas con score < 60%
  - **Conexiones**: Relaciona el tema actual con lo ya estudiado
  - **Progreso**: Ajusta dificultad según desempeño histórico

#### Adaptaciones Automáticas:
1. **Lenguaje**: Simplificado para menores de 16 años o si `easyReading: true`
2. **Profundidad**: Variable según preferencias y edad
3. **Ejemplos**: Más o menos según preferencias y contexto
4. **Dificultad de ejercicios**: Ajustada según historial de rendimiento
5. **Motivación**: Mensajes alentadores si hay debilidades detectadas
6. **Conexiones**: Referencias a temas ya vistos para mejor comprensión

### 💡 Ejemplo de Uso Completo:

```javascript
// Frontend: Preparar datos del estudiante
const profileData = {
  age: 14,
  levelDetail: "2do año secundaria",
  priorKnowledge: ["fracciones", "ecuaciones simples"],
  difficulties: ["factorización"],
  preferences: {
    easyReading: true,
    examples: true,
    analogies: true,
    stepByStep: true,
    realWorldContext: true
  }
};

// Obtener sesiones recientes del localStorage
const recentSessions = sessions.slice(0, 5);

// Solicitar explicación personalizada
const response = await fetch('http://localhost:3000/api/tutor/explain', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    subject: 'matematica',
    level: 'secundaria',
    topic: 'ecuaciones cuadráticas',
    profileData,
    recentSessions
  })
});
```

La respuesta incluirá:
- Resumen adaptado al perfil y contexto
- Pasos ajustados a las preferencias
- Referencias a conocimientos previos
- Lenguaje apropiado para la edad
- Metadata sobre las adaptaciones aplicadas

### 🔧 Sin Personalización

Si no envías `profileData` ni `recentSessions`, el backend funciona igual que antes, generando explicaciones estándar. La personalización es **completamente opcional** y retrocompatible.

---

- **Mock Data**: Actualmente el backend devuelve datos simulados. Para producción, integra con:
  - OpenAI API
  - Anthropic Claude API
  - Google Gemini API
  - O tu propia lógica de IA

- **Almacenamiento**: El historial se guarda en memoria. Para producción, usa:
  - MongoDB
  - PostgreSQL
  - Redis
  - Firebase

## 🚧 TODO

- [ ] Integrar con API de IA (OpenAI/Anthropic)
- [ ] Agregar base de datos para persistencia
- [ ] Implementar autenticación de usuarios
- [ ] Agregar rate limiting
- [ ] Agregar tests unitarios
- [ ] Agregar validación con Joi/Zod
- [ ] Agregar logging con Winston
- [ ] Dockerizar la aplicación
