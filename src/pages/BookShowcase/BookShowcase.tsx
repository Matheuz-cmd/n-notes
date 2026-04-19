import React from 'react';
import { useBooks } from '../../hooks/useBooks';
import { BookGrid } from '../../components/BookGrid/BookGrid';

export const BookShowcase: React.FC = () => {
  // Access data strictly through the generic custom hook, maintaining pure decoupling
  const { books, loading, error } = useBooks();

  return (
    <section aria-label="Book Collection Showcase">
      <BookGrid books={books} isLoading={loading} error={error} />
    </section>
  );
};
