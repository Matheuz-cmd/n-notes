import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SupabaseBookRepository } from '../../src/repositories/supabase-book-repository';
import { supabase } from '../../src/lib/supabase';

vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('SupabaseBookRepository', () => {
  let repository: SupabaseBookRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new SupabaseBookRepository();
  });

  it('should return books array on success', async () => {
    const mockBooks = [{ id: '1', title: 'Test Book' }];
    const selectMock = vi.fn().mockReturnValue({ order: vi.fn().mockResolvedValue({ data: mockBooks, error: null }) });
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any);

    const books = await repository.getBooks();
    
    expect(supabase.from).toHaveBeenCalledWith('books');
    expect(books).toEqual(mockBooks);
  });

  it('should return empty array and not throw on supabase error for getBooks', async () => {
    const selectMock = vi.fn().mockReturnValue({ order: vi.fn().mockResolvedValue({ data: null, error: new Error('DB Error') }) });
    vi.mocked(supabase.from).mockReturnValue({ select: selectMock } as any);

    // Spy na console.warn pra n poluir o terminal de tests
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const books = await repository.getBooks();
    
    expect(books).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
