import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../types/book';
import { Star, StarHalf } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <article className="flex flex-col h-full bg-white rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] group max-w-[340px] w-full mx-auto  p-4">
      
      {/* Cover Image Container */}
      <div className="w-full flex items-center justify-center mb-4 relative min-h-[190px]">
        {book.cover_url ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[140px] h-[190px] bg-slate-200 animate-pulse rounded-md" />
              </div>
            )}
            <img 
              src={book.cover_url} 
              alt={`Cover of ${book.title}`} 
              className={`w-[130px] h-[190px] object-cover rounded-lg shadow-md transition-all duration-300 group-hover:scale-105 bg-gray-50 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <div className="w-[140px] h-[190px] flex items-center justify-center bg-slate-50 text-slate-400 font-display text-sm text-center p-2 rounded-md border border-slate-200">
            <span>No Cover</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 pb-2">
        <h3 className="text-lg font-bold leading-tight mb-1 text-slate-900 line-clamp-2" title={book.title}>
          {book.title}
        </h3>
        
        {book.status === 'Currently Reading' ? (
          <div className="mb-1">
            <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
              Lendo
            </span>
          </div>
        ) : (
          <div className="mb-2">
            {renderStars(book.rating)}
          </div>
        )}
        
        <p className="text-sm font-medium text-slate-500 mb-3">
          {book.author}
        </p>
        
        <p className="text-xs text-slate-500 mb-5 leading-relaxed line-clamp-2 min-h-[40px]">
          {book.description || 'Um dos livros mais fáceis de se recomendar. Todo dev deveria ler.'}
        </p>
        
        <button 
           className="mt-auto w-full bg-slate-900 hover:bg-black text-white font-semibold flex items-center justify-center cursor-pointer gap-2 py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
           onClick={() => navigate(`/book/${book.id}`)}
        >
          Detalhes ↗
        </button>
      </div>
    </article>
  );
};
