-- ============================================================
-- SEED DATA BIDANG ORGANISASI
-- Cara: Supabase Dashboard → SQL Editor → Paste → Run
-- ============================================================

-- Insert data ke tabel bidang_organisasi
INSERT INTO bidang_organisasi (nama, deskripsi, icon_name)
SELECT v.nama, v.deskripsi, v.icon_name
FROM (VALUES
  ('Bidang Teknik', 'Fokus pada pengembangan kurikulum latihan, teknik pencak silat, dan standar kompetensi atlet.', 'Dumbbell'),
  ('Bidang Organisasi', 'Mengatur koordinasi antar rayon, pengembangan keanggotaan, dan kepatuhan terhadap AD/ART.', 'Network'),
  ('Bidang Humas', 'Menjalin hubungan dengan masyarakat, instansi pemerintah, serta pengelolaan media komunikasi.', 'Megaphone'),
  ('Bidang Kerohanian', 'Memperdalam pemahaman nilai-nilai spiritual dan budi luhur sebagai inti dari ajaran SH Terate.', 'Sparkles'),
  ('Bidang PAMTER', 'Satuan pengamanan Terate yang bertugas menjaga ketertiban, keamanan internal, dan marwah organisasi.', 'Shield')
) AS v(nama, deskripsi, icon_name)
WHERE NOT EXISTS (SELECT 1 FROM bidang_organisasi b WHERE b.nama = v.nama);

-- Cek Hasil
SELECT * FROM bidang_organisasi ORDER BY id;
