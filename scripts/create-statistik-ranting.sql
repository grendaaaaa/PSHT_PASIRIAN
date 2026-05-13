-- 8. Statistik Ranting (Single Row)
CREATE TABLE public.statistik_ranting (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_warga INTEGER DEFAULT 0,
    total_siswa INTEGER DEFAULT 0,
    total_prestasi INTEGER DEFAULT 0,
    total_rayon INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed data awal (Hanya satu baris)
INSERT INTO public.statistik_ranting (total_warga, total_siswa, total_prestasi, total_rayon)
VALUES (1200, 300, 45, 15);
