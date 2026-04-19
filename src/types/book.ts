export type ReadingStatus = 'Read' | 'Currently Reading' | 'Want to Read';

export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  status: ReadingStatus;
  cover_url?: string;
  init_date?: string;
  finish_date?: string;
  description?: string;
}
