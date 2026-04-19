import { supabase } from '../lib/supabase';
import type { Book } from '../types/book';
import type { IBookRepository } from './book-repository';

export class SupabaseBookRepository implements IBookRepository {
  async getBooks(): Promise<Book[]> {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('init_date', { ascending: false, nullsFirst: false });

      if (error) {
        console.warn('Supabase Error (ou credenciais ausentes no .env.local). Fallback para base vazia.');
        return [];
      }

      return (data as Book[]) || [];
    } catch (e) {
      console.error('Falha ao conectar com o Supabase:', e);
      return [];
    }
  }

  async getBookById(id: string): Promise<Book | null> {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return (data as Book) || null;
    } catch (e) {
      console.error(`Falha ao buscar o livro com ID ${id}:`, e);
      return null;
    }
  }

  async updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
    try {
      const { data, error } = await supabase
        .from('books')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return (data as Book) || null;
    } catch (e) {
      console.error(`Falha ao atualizar o livro com ID ${id}:`, e);
      return null;
    }
  }

  async deleteBook(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return true;
    } catch (e) {
      console.error(`Falha ao deletar o livro com ID ${id}:`, e);
      return false;
    }
  }
}

export const bookRepository = new SupabaseBookRepository();
