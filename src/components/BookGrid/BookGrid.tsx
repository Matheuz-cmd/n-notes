import React from 'react';
import type { Book } from '../../types/book';
import { BookCard } from '../BookCard/BookCard';

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, isLoading, error }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-16 min-h-[400px] border border-dashed border-red-300 rounded-xl bg-white">
        <div className="text-6xl mb-6 opacity-50 drop-shadow-sm">⚠️</div>
        <h3 className="text-2xl mb-2 text-red-500 font-display">Failed to load collection</h3>
        <p className="text-slate-500 max-w-md">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 py-8 max-w-4xl mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="h-[450px] rounded-xl bg-slate-100 animate-pulse border border-slate-50"></div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-16 min-h-[400px] border border-dashed border-slate-200 rounded-xl bg-white">
        <div className="text-6xl mb-6 opacity-50">📚</div>
        <h3 className="text-2xl mb-2 text-slate-900 font-display">Your library is empty</h3>
        <p className="text-slate-500 max-w-md leading-relaxed">
          There are no books currently tracked down over the backend endpoint.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 py-8 max-w-4xl mx-auto">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
