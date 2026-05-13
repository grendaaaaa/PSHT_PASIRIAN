-- Enable RLS for statistik_ranting
ALTER TABLE public.statistik_ranting ENABLE ROW LEVEL SECURITY;

-- 1. Policies for statistik_ranting
-- Allow public to read
CREATE POLICY "Allow public read access for statistik_ranting"
ON public.statistik_ranting FOR SELECT
TO public
USING (true);

-- Allow authenticated users to manage
CREATE POLICY "Allow auth all access for statistik_ranting"
ON public.statistik_ranting FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
