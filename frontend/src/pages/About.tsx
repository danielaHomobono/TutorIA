const About = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="text-6xl animate-bounce-gentle">🧠</span>
            <span className="text-5xl animate-pulse-soft">✨</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">Acerca de TutorIA</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolucionando la educación con 
            <span className="text-gradient font-semibold"> inteligencia artificial</span>
          </p>
        </div>

        {/* Mission Section */}
        <div className="card p-8 mb-12 animate-slideUp">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">🎯</span>
            <h2 className="text-3xl font-bold text-gray-800">Nuestra Misión</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            TutorIA es una plataforma educativa impulsada por inteligencia artificial 
            diseñada para democratizar el acceso a una educación de calidad. Nuestro objetivo 
            es proporcionar apoyo personalizado y accesible en tu proceso de aprendizaje.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Creemos que cada estudiante merece tener acceso a un tutor personal que se adapte 
            a su ritmo de aprendizaje y estilo único.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-6 animate-slideUp" style={{animationDelay: '0.1s'}}>
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Aprendizaje Personalizado</h3>
            <p className="text-gray-600">
              Explicaciones adaptadas a tu nivel de conocimiento y preferencias de aprendizaje.
            </p>
          </div>
          
          <div className="card p-6 animate-slideUp" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Respuestas Instantáneas</h3>
            <p className="text-gray-600">
              Obtén explicaciones detalladas y ejercicios prácticos en segundos.
            </p>
          </div>
          
          <div className="card p-6 animate-slideUp" style={{animationDelay: '0.3s'}}>
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Seguimiento de Progreso</h3>
            <p className="text-gray-600">
              Mantén un registro de tus sesiones de estudio y mejora continua.
            </p>
          </div>
          
          <div className="card p-6 animate-slideUp" style={{animationDelay: '0.4s'}}>
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Acceso Universal</h3>
            <p className="text-gray-600">
              Disponible 24/7 desde cualquier dispositivo con conexión a internet.
            </p>
          </div>
        </div>

        {/* Technology Section */}
        <div className="card p-8 mb-12 animate-slideUp" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">🛠️</span>
            <h2 className="text-3xl font-bold text-gray-800">Tecnología</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            TutorIA está construido con las tecnologías web más modernas para garantizar 
            una experiencia rápida, confiable y accesible.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
              <div className="text-2xl mb-2">⚛️</div>
              <div className="font-semibold text-blue-800">React</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
              <div className="text-2xl mb-2">📜</div>
              <div className="font-semibold text-blue-800">TypeScript</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center border border-purple-200">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-purple-800">Vite</div>
            </div>
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-xl text-center border border-cyan-200">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold text-cyan-800">Tailwind</div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center animate-slideUp" style={{animationDelay: '0.6s'}}>
          <div className="card p-8">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Nuestra Visión</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Imaginamos un futuro donde cada estudiante tenga acceso a educación personalizada 
              de alta calidad, sin barreras geográficas o económicas. TutorIA es nuestro primer 
              paso hacia ese futuro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
