import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ReadingModeToggle from './ReadingModeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-xl" role="navigation" aria-label="Navegación principal">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 py-2">
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-white hover:opacity-90 transition-all">
            <span className="text-3xl">🧠</span>
            <span>TutorIA</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all text-white"
            aria-expanded={isMenuOpen}
            aria-label="Menú de navegación"
          >
            <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-medium transition-all text-white ${
                  isActive('/') 
                    ? 'bg-white bg-opacity-20 shadow-lg' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                🏠 Inicio
              </Link>
              <Link 
                to="/tutor" 
                className={`px-4 py-2 rounded-lg font-medium transition-all text-white ${
                  isActive('/tutor') 
                    ? 'bg-white bg-opacity-20 shadow-lg' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                🎓 Tutor
              </Link>
              <Link 
                to="/history" 
                className={`px-4 py-2 rounded-lg font-medium transition-all text-white ${
                  isActive('/history') 
                    ? 'bg-white bg-opacity-20 shadow-lg' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                📚 Historial
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 rounded-lg font-medium transition-all text-white ${
                  isActive('/about') 
                    ? 'bg-white bg-opacity-20 shadow-lg' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                ℹ️ Acerca de
              </Link>
            </div>
            <div className="ml-4 pl-4 border-l border-white border-opacity-20">
              <ReadingModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className={`block py-3 px-4 rounded-lg font-medium transition-all text-white ${
                isActive('/') 
                  ? 'bg-white bg-opacity-20' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Inicio
            </Link>
            <Link
              to="/tutor"
              className={`block py-3 px-4 rounded-lg font-medium transition-all text-white ${
                isActive('/tutor') 
                  ? 'bg-white bg-opacity-20' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              🎓 Tutor
            </Link>
            <Link
              to="/history"
              className={`block py-3 px-4 rounded-lg font-medium transition-all text-white ${
                isActive('/history') 
                  ? 'bg-white bg-opacity-20' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              📚 Historial
            </Link>
            <Link
              to="/about"
              className={`block py-3 px-4 rounded-lg font-medium transition-all text-white ${
                isActive('/about') 
                  ? 'bg-white bg-opacity-20' 
                  : 'hover:bg-white hover:bg-opacity-10'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              ℹ️ Acerca de
            </Link>
            <div className="px-4 pt-3 border-t border-white border-opacity-20">
              <ReadingModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;