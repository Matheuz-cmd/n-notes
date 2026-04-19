import { renderHook, waitFor } from '@testing-library/react';
import { useBook } from '../../src/hooks/useBook';
import { bookRepository } from '../../src/repositories/supabase-book-repository';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/repositories/supabase-book-repository', () => ({
  bookRepository: {
    getBookById: vi.fn(),
  },
}));

describe('useBook hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with loading state true', async () => {
    vi.mocked(bookRepository.getBookById).mockResolvedValueOnce(null);
    const { result } = renderHook(() => useBook('123'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.book).toBe(null);
  });

  it('should fetch and return a book', async () => {
    const mockBook = { id: '123', title: 'Test Book', author: 'Author', rating: 5, status: 'Read' };
    vi.mocked(bookRepository.getBookById).mockResolvedValueOnce(mockBook as any);

    const { result } = renderHook(() => useBook('123'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.book).toEqual(mockBook);
    expect(result.current.error).toBe(null);
  });

  it('should handle errors if repository throws', async () => {
    vi.mocked(bookRepository.getBookById).mockRejectedValueOnce(new Error('DB failure'));

    const { result } = renderHook(() => useBook('123'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // The hook natively stores err.message
    expect(result.current.error).toBe('DB failure');
    expect(result.current.book).toBe(null);
  });
});
