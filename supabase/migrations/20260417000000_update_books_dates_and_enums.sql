-- 1. Create the strongly typed Status ENUM
CREATE TYPE public.book_status AS ENUM ('Read', 'Currently Reading', 'Want to Read');

-- 2. Add the Initialization Date
ALTER TABLE public.books ADD COLUMN init_date DATE;

-- 3. Transition the TimeZone to standard Date scaling avoiding destructive dropping by mapping it via USING
ALTER TABLE public.books RENAME COLUMN reading_date TO finish_date;
ALTER TABLE public.books ALTER COLUMN finish_date TYPE DATE USING finish_date::DATE;

-- 4. Cast the standard TEXT generic 'status' column to the enforced book_status ENUM 
ALTER TABLE public.books ALTER COLUMN status DROP DEFAULT;
ALTER TABLE public.books ALTER COLUMN status TYPE public.book_status USING status::public.book_status;
ALTER TABLE public.books ALTER COLUMN status SET DEFAULT 'Want to Read'::public.book_status;
