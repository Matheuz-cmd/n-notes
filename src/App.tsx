import { Routes, Route } from 'react-router-dom';
import { BookShowcase } from './pages/BookShowcase/BookShowcase';
import { BookDetails } from './pages/BookDetails/BookDetails';
import './index.css';

function App() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <header className="mb-12 text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black font-display tracking-tight">
          Livros Recomendados
        </h1>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<BookShowcase />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
