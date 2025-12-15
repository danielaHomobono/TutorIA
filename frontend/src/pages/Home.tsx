import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-6xl">🧠</span>
              <span className="text-5xl">✨</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Bienvenido a <span className="text-gradient">TutorIA</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tu asistente de aprendizaje personalizado con 
              <span className="text-gradient font-semibold"> inteligencia artificial</span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="card p-6 text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Múltiples Materias</h3>
              <p className="text-gray-600">Matemáticas, Física, Química y más. Aprende cualquier tema a tu ritmo.</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Personalizado</h3>
              <p className="text-gray-600">Explicaciones adaptadas a tu nivel de conocimiento y estilo de aprendizaje.</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Ejercicios Dinámicos</h3>
              <p className="text-gray-600">Practica con ejercicios generados automáticamente y recibe feedback inmediato.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/tutor" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3 no-underline"
            >
              <span>🚀</span>
              <span>Comenzar a Aprender</span>
            </Link>
            
            <Link 
              to="/about" 
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-all inline-flex items-center gap-2 no-underline"
            >
              <span>📖</span>
              <span>Saber más</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600 font-medium">Materias</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600 font-medium">Ejercicios</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Disponible</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Gratis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tres simples pasos para comenzar tu experiencia de aprendizaje
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Elige tu materia</h3>
            <p className="text-gray-600">Selecciona la materia y el nivel que quieres estudiar</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Recibe explicaciones</h3>
            <p className="text-gray-600">Obtén explicaciones claras y detalladas del tema</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Practica</h3>
            <p className="text-gray-600">Resuelve ejercicios personalizados y mejora tus habilidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
