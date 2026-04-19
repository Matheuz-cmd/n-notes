import type { Book } from '../types/book';

export interface IBookRepository {
  /**
   * Retrieves the comprehensive personal collection of books.
   */
  getBooks(): Promise<Book[]>;

  /**
   * Retrieves a single book by identifier.
   */
  getBookById(id: string): Promise<Book | null>;

  /**
   * Updates an existing book by identifier.
   */
  updateBook(id: string, updates: Partial<Book>): Promise<Book | null>;

  /**
   * Deletes a book by identifier.
   */
  deleteBook(id: string): Promise<boolean>;
}
