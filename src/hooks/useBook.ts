import { useState, useEffect } from 'react';
import type { Book } from '../types/book';
import { bookRepository } from '../repositories/supabase-book-repository';

export function useBook(id: string | undefined) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchBook() {
      if (!id) {
        if (mounted) {
          setError('ID do livro não fornecido');
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const data = await bookRepository.getBookById(id);
        if (mounted) {
          if (data) {
            setBook(data);
            setError(null);
          } else {
            setError('Livro não encontrado.');
          }
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

    fetchBook();

    return () => {
      mounted = false;
    };
  }, [id]);

  return { book, loading, error };
}
