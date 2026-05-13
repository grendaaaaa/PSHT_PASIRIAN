-- ============================================================
-- SEED DATA BIDANG & DIVISI (Dengan Icon Lucide)
-- Cara: Supabase Dashboard → SQL Editor → Paste → Run
-- ============================================================

-- STEP 1: Tambah kolom icon_name jika belum ada
ALTER TABLE pengurus ADD COLUMN IF NOT EXISTS icon_name TEXT;

-- STEP 2: Insert data Bidang & Divisi
INSERT INTO pengurus (nama, jabatan, tipe_pengurus, deskripsi_tugas, urutan, icon_name, image_url)
SELECT v.nama, v.jabatan, v.tipe_pengurus, v.deskripsi_tugas, v.urutan, v.icon_name, v.image_url
FROM (VALUES
  ('DIVISI', 'Bidang Teknik',     'BIDANG', 'Fokus pada pengembangan kurikulum latihan, teknik pencak silat, dan standar kompetensi atlet.', 7,  'Dumbbell', ''),
  ('DIVISI', 'Bidang Organisasi', 'BIDANG', 'Mengatur koordinasi antar rayon, pengembangan keanggotaan, dan kepatuhan terhadap AD/ART.', 8,  'Network', ''),
  ('DIVISI', 'Bidang Humas',      'BIDANG', 'Menjalin hubungan dengan masyarakat, instansi pemerintah, serta pengelolaan media komunikasi.', 9,  'Megaphone', ''),
  ('DIVISI', 'Bidang Kerohanian', 'BIDANG', 'Memperdalam pemahaman nilai-nilai spiritual dan budi luhur sebagai inti dari ajaran SH Terate.', 10, 'Sparkles', ''),
  ('DIVISI', 'Bidang PAMTER',     'BIDANG', 'Satuan pengamanan Terate yang bertugas menjaga ketertiban, keamanan internal, dan marwah organisasi.', 11, 'Shield', '')
) AS v(nama, jabatan, tipe_pengurus, deskripsi_tugas, urutan, icon_name, image_url)
WHERE NOT EXISTS (SELECT 1 FROM pengurus p WHERE p.jabatan = v.jabatan);

-- Cek Hasil
SELECT jabatan, icon_name FROM pengurus WHERE tipe_pengurus = 'BIDANG' ORDER BY urutan;
