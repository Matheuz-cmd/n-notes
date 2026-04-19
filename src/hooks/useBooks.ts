import { useState, useEffect } from 'react';
import type { Book } from '../types/book';
import { bookRepository } from '../repositories/supabase-book-repository';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchBooks() {
      try {
        setLoading(true);
        const data = await bookRepository.getBooks();
        if (mounted) {
          setBooks(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => {
      mounted = false;
    };
  }, []);

  return { books, loading, error };
}
