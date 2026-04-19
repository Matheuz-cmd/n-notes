import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';
import { Star, StarHalf } from 'lucide-react';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(id);

  const renderStars = (stars: number) => {
    if (!stars) return null;
    
    return (
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${stars} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => {
          const starKey = `star-${index}`;
          const isFull = index < Math.floor(stars);
          const isHalf = !isFull && index < stars;

          if (isHalf) {
            return <StarHalf key={starKey} className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />;
          }

          return (
            <Star
              key={starKey}
              className={`h-4 w-4 drop-shadow-sm ${
                isFull ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'
              }`}
            />
          );
        })}
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-16 min-h-[400px]">
        <div className="text-6xl mb-6 opacity-50 drop-shadow-sm">⚠️</div>
        <h3 className="text-2xl mb-2 text-red-500 font-display">Falha ao carregar o livro</h3>
        <p className="text-slate-500 max-w-md">{error}</p>
        <button onClick={() => navigate('/')} className="mt-6 text-slate-900 font-semibold underline">Voltar para Home</button>
      </div>
    );
  }

  if (loading || !book) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-16 min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
           <div className="h-[300px] w-[200px] bg-slate-100 rounded-md mb-6"></div>
           <div className="h-8 w-64 bg-slate-100 rounded mb-2"></div>
           <div className="h-4 w-32 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <button 
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium cursor-pointer"
      >
        <span>←</span> Voltar para Coleção
      </button>

      <div className="flex flex-wrap md:flex-nowrap gap-10 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        {/* Poster */}
        <div className="w-full md:w-[30%] shrink-0 flex justify-center">
            {book.cover_url ? (
              <img 
                src={book.cover_url} 
                alt={`Cover of ${book.title}`} 
                className="w-full max-w-[240px] object-contain rounded-md shadow-lg" 
              />
            ) : (
              <div className="w-full max-w-[240px] aspect-[3/4] flex items-center justify-center bg-slate-50 text-slate-400 font-display text-lg text-center p-4 rounded-md border border-slate-200">
                <span>No Cover</span>
              </div>
            )}
        </div>

        {/* Content */}
        <div className="w-full flex-1 flex flex-col">
           <h2 className="text-3xl font-display font-extrabold text-slate-900 mb-2">{book.title}</h2>
           <p className="text-lg text-slate-600 font-medium mb-6">{book.author}</p>
           
           <div className="flex items-center gap-6 mb-8 border-y border-slate-100 py-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Status</span>
                <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold">
                  {book.status}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Avaliação</span>
                <div className="mt-0.5">
                  {renderStars(book.rating)}
                </div>
              </div>

              {book.init_date && (
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Iniciado em</span>
                  <span className="text-slate-700 font-medium">{new Date(book.init_date).toLocaleDateString()}</span>
                </div>
              )}

              {book.finish_date && book.status !== 'Currently Reading' && (
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Concluído em</span>
                  <span className="text-slate-700 font-medium">{new Date(book.finish_date).toLocaleDateString()}</span>
                </div>
              )}
           </div>

           <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sinopse / Detalhes</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {book.description || "Nenhuma descrição fornecida para esta obra estruturada no repositório Supabase até o momento."}
              </p>
           </div>
        </div>
      </div>
    </article>
  );
};
