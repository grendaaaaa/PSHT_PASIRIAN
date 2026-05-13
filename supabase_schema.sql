-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Sektor
CREATE TABLE public.sektor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Rayon
CREATE TABLE public.rayon (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(255) NOT NULL,
    sektor_id UUID REFERENCES public.sektor(id) ON DELETE CASCADE,
    ketua_nama VARCHAR(255) NOT NULL,
    jadwal VARCHAR(255) NOT NULL,
    lokasi TEXT NOT NULL,
    is_pusat BOOLEAN DEFAULT false,
    image_url TEXT,
    whatsapp_url VARCHAR(255),
    instagram_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Kategori Berita
CREATE TABLE public.kategori_berita (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL
);

-- 4. Berita
CREATE TABLE public.berita (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    judul VARCHAR(255) NOT NULL,
    ringkasan TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    kategori_id UUID REFERENCES public.kategori_berita(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Bidang Organisasi
CREATE TABLE public.bidang_organisasi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    icon_name VARCHAR(100)
);

-- 6. Pengurus
CREATE TABLE public.pengurus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    deskripsi_tugas TEXT,
    image_url TEXT,
    bidang_id UUID REFERENCES public.bidang_organisasi(id) ON DELETE SET NULL,
    tipe_pengurus VARCHAR(50) NOT NULL CHECK (tipe_pengurus IN ('INTI', 'HARIAN', 'BIDANG')),
    urutan INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
