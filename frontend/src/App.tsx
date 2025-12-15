import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HistoryProvider } from './contexts/HistoryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tutor from './pages/Tutor';
import History from './pages/History';
import About from './pages/About';

function App() {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tutor" element={<Tutor />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HistoryProvider>
  );
}

export default App;
