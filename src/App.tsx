import { Routes, Route } from 'react-router-dom';
import { BookShowcase } from './pages/BookShowcase/BookShowcase';
import { BookDetails } from './pages/BookDetails/BookDetails';
import { Header } from './components/Header/Header';
import './index.css';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black font-display tracking-tight text-center mb-12">
          Livros Recomendados
        </h1>
        <main>
          <Routes>
            <Route path="/" element={<BookShowcase />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
