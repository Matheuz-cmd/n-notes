import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// Validação e setup do Supabase
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("ERRO: Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no seu .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function runCLI() {
  const rl = readline.createInterface({ input, output });

  console.log('\n📚 --- ADICIONAR NOVO LIVRO ---\n');

  try {
    const title = await rl.question('Título do Livro (ex: Hábitos Atômicos): ');
    if (!title) throw new Error('Título é obrigatório.');

    const author = await rl.question('Autor: ');
    
    // Status
    let status = await rl.question('Status (Read / Currently Reading / Want to Read) [padrão: Read]: ');
    if (!status) status = 'Read';

    const validStatuses = ['Read', 'Currently Reading', 'Want to Read'];
    if (!validStatuses.includes(status)) {
      console.warn('-> Status inválido detectado. Forçando para "Want to Read".');
      status = 'Want to Read';
    }

    // Rating
    const ratingStr = await rl.question('Avaliação (0 a 5, permite frações ex: 4.5) [padrão: 0]: ');
    const rating = ratingStr ? parseFloat(ratingStr) : 0;

    // Cover
    const cover_url = await rl.question('URL da Capa [padrão: vazia]: ');

    // Init Date
    const init_date = await rl.question('Data de Início (YYYY-MM-DD) [opcional]: ');
    
    // Finish Date
    let finish_date = '';
    if (status !== 'Currently Reading') {
      finish_date = await rl.question('Data de Fim (YYYY-MM-DD) [opcional]: ');
    }

    // Descrição
    const description = await rl.question('Descrição curta: ');

    const newBook = {
      title,
      author: author || 'Desconhecido',
      status,
      rating,
      cover_url: cover_url || null,
      description: description || '',
      init_date: init_date ? new Date(init_date).toISOString().split('T')[0] : null,
      finish_date: finish_date ? new Date(finish_date).toISOString().split('T')[0] : null,
    };

    console.log('\nEnviando para o Supabase...');
    
    const { data, error } = await supabaseAdmin
      .from('books')
      .insert([newBook])
      .select();

    if (error) {
      console.error('\n❌ ERRO ao enviar livro:', error.message);
    } else {
      console.log(`\n✅ SUCESSO! Livro "${data[0].title}" adicionado à estante online.`);
    }

  } catch (err: any) {
    console.log('\n❌ Operação cancelada:', err.message);
  } finally {
    rl.close();
  }
}

runCLI();
