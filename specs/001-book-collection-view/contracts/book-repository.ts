export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  status: 'Read' | 'Currently Reading' | 'Want to Read';
  cover_url?: string;
  init_date?: string;
  finish_date?: string;
}

export interface IBookRepository {
  /**
   * Retrieves the full personal collection of books.
   * This is a read-only payload. Any sorting or filtering is applied via standard config 
   * defined in the repository implementation, hiding backend query structures from the UI.
   */
  getBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
  updateBook(id: string, updates: Partial<Book>): Promise<Book | null>;
  deleteBook(id: string): Promise<boolean>;
}
