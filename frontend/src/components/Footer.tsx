const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-primary-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <span className="font-bold text-lg bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
                TutorIA
              </span>
            </div>
            <p className="text-sm text-gray-300">
              © {currentYear} TutorIA. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-sm text-gray-300 hover:text-primary-300 transition-all duration-200 hover:scale-105 flex items-center gap-1"
            >
              🔒 Privacidad
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-300 hover:text-primary-300 transition-all duration-200 hover:scale-105 flex items-center gap-1"
            >
              📜 Términos
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-300 hover:text-primary-300 transition-all duration-200 hover:scale-105 flex items-center gap-1"
            >
              📧 Contacto
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">
            Hecho con ❤️ para estudiantes de todo el mundo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
