import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("ERRO: Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no seu .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceKey);

// Data structure pre-filled from your Notion/Print list
const booksToInsert = [
  {
    title: 'Investidor de Bom Senso',
    author: 'John C. Bogle',
    rating: 4,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/41Ip4wSi1nL._SL1500_.jpg',
    description: 'Um livro que ensina a investir melhor de forma simples e eficaz.',
    init_date: '2024-05-11',
    finish_date: '2024-06-17'
  },
  {
    title: 'A Fórmula Mágica de Joel Greenblatt para Bater o Mercado de Ações',
    author: 'Joel Greenblatt',
    rating: 3.5,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/41rqRp-U2tL._SL1500_.jpg',
    description: 'Parece uma conversa simples que o autor teve com os filhos para ensinar a investir melhor.',
    init_date: '2024-06-13',
    finish_date: '2024-06-20'
  },
  {
    title: 'O alquimista',
    author: 'Paulo Coelho',
    rating: 4,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/51cF7jnQGBS._SL1500_.jpg',
    description: 'É simples, mas deixa mensagens que ficam na cabeça depois que você termina.',
    init_date: '2024-06-18',
    finish_date: '2024-06-24'
  },
  {
    title: 'A Psicologia Financeira',
    author: 'Morgan Housel',
    rating: 4.5,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/41WqYpP0S7L._SL1500_.jpg',
    description: 'Reitera que no mercado de ações, o órgão mais importante é o estômago. Não o cérebro',
    init_date: '2024-08-10',
    finish_date: '2024-10-08'
  },
  {
    title: 'Dinheiro Domine esse jogo',
    author: 'Tony Robbins',
    rating: 3,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/41iiwNB644L._SL1500_.jpg',
    description: 'Traz a visão prática de grandes nomes do mercado. Entretanto, é um livro muito longo.',
    init_date: '2024-10-14',
    finish_date: '2025-01-22'
  },
  {
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    rating: 4,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL._SL1500_.jpg',
    description: 'É uma boa introdução para estruturas de dados e algoritmos.',
    init_date: '2025-01-23',
    finish_date: '2025-03-08'
  },
  {
    title: 'Ultra-aprendizado',
    author: 'Scott H. Young',
    rating: 3.5,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/41l8sxNzCEL._SL1500_.jpg',
    description: 'Um livro objetivo e direto ao ponto sobre como aprender qualquer coisa de forma mais intensa e estratégica.',
    init_date: '2025-05-11',
    finish_date: '2025-09-23'
  },
  {
    title: 'O almanaque de Naval Ravikant',
    author: 'Eric Jorgenson',
    rating: 4,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/31MVrcbxXUL._SL1500_.jpg',
    description: 'Um daqueles livros que vc precisa ter contato com as ideias por um tempo. Filósofo do silício.',
    init_date: '2025-09-24',
    finish_date: '2025-10-24'
  },
  {
    title: 'Rápido e devagar: Duas formas de pensar',
    author: 'Daniel Kahneman',
    rating: 4,
    status: 'Read',
    cover_url: 'https://m.media-amazon.com/images/I/61pt9lG-PvL._SL1500_.jpg',
    description: 'Um livro muito bom. Entretanto, a partir da metade a leitura fica meio chata',
    init_date: '2025-10-31',
    finish_date: '2026-04-14'
  },
  {
    title: 'Cracking the coding interview',
    author: 'Gayle Laakmann McDowell',
    rating: 0,
    status: 'Currently Reading',
    cover_url: 'https://m.media-amazon.com/images/I/61mIq2iJUXL._SL1500_.jpg',
    description: '',
    init_date: '2026-04-01'
    // Finish date omitted since it's Currently Reading!
  }
];

async function seedDatabase() {
  console.log('Iniciando envio de livros da sua lista para o Supabase...');

  // Deleta todas as duplicatas/livros existentes primeiro para evitar colisões
  const { error: errorClear } = await supabaseAdmin.from('books').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  if (errorClear) {
    console.error('Falha ao limpar a estante base:', errorClear.message);
    return;
  }
  console.log('Estante zerada com sucesso. Injetando dados recém-formados...');

  const { data, error } = await supabaseAdmin
    .from('books')
    .insert(booksToInsert)
    .select();

  if (error) {
    console.error('Falha ao enviar dados:', error.message);
  } else {
    console.log(`Sucesso! ${data.length} livros da sua wishlist foram adicionados ao banco.`);
  }
}

seedDatabase();
