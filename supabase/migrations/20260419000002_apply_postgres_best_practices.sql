-- 1. SECURITY: Ativar Proteção de Nível de Linha (RLS)
-- Omission de policies subjacentes garante que NENHUMA inserção, edição ou deleção ocorra 
-- através de chamadas com Chaves Públicas/Anon do Frontend (bloqueio por default da Spec Postgres).
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- 2. SECURITY: Política Expansiva Mínima
-- Liberar para o Frontend (Anon/Public API) estritamente apenas a visualização do catálogo,
-- já que o App depende do fetch dinâmico de covers e títulos pra construir a grade.
CREATE POLICY "Public Read Access" 
ON public.books 
FOR SELECT 
USING (true);

-- 3. PERFORMANCE: Indexação Focada no Workload Principal do App
-- Esta indexação otimiza a listagem Primária da Home que faz o OrderBy decrescente do `init_date`,
-- evitando 'Table/Seq Scans' massivos mesmo que a coleção chegue à casa dos milhares.
CREATE INDEX idx_books_init_date_desc 
ON public.books (init_date DESC NULLS LAST);
