-- 7. Rekap Jumlah Warga & Siswa
CREATE TABLE public.rekap_warga (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kategori VARCHAR(100) NOT NULL,
    jumlah INTEGER DEFAULT 0,
    keterangan TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed data awal
INSERT INTO public.rekap_warga (kategori, jumlah, keterangan) VALUES
('Warga Purwa', 450, 'Jumlah warga tingkat I aktif'),
('Warga Madya', 50, 'Jumlah warga tingkat II aktif'),
('Siswa Putih', 120, 'Siswa aktif periode 2024'),
('Siswa Hijau', 80, 'Siswa aktif periode 2024'),
('Siswa Jambon', 60, 'Siswa aktif periode 2024'),
('Siswa Polos', 150, 'Siswa baru periode 2024');
