-- Altera a restrição nativa da coluna rating de número impermutável (integer) 
-- para suportar quebras decimais. Mantendo no máximo 3 dígitos de representatividade 
-- onde 1 dele fica trancado na ponta decimal (ex: 5.0, 3.5, 99.8).
ALTER TABLE public.books ALTER COLUMN rating TYPE numeric(3,1);
