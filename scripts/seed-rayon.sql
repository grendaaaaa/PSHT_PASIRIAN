-- ============================================================
-- SEED DATA RAYON PSHT PASIRIAN (dengan WA & IG)
-- Cara: Supabase Dashboard → SQL Editor → Paste → Run
-- ============================================================

-- STEP 1: Tambah kolom yang belum ada
ALTER TABLE rayon ADD COLUMN IF NOT EXISTS sektor    TEXT;
ALTER TABLE rayon ADD COLUMN IF NOT EXISTS whatsapp  TEXT;
ALTER TABLE rayon ADD COLUMN IF NOT EXISTS instagram TEXT;

-- STEP 2: Insert data (skip jika nama sudah ada)
INSERT INTO rayon (nama, sektor, ketua_nama, jadwal, lokasi, whatsapp, instagram, image_url, is_pusat)
SELECT v.nama, v.sektor, v.ketua_nama, v.jadwal, v.lokasi, v.whatsapp, v.instagram, v.image_url, v.is_pusat
FROM (VALUES
  ('Sememu',          'Utara',   'Mas Suharto',        'Senin & Kamis, 19.30 - Selesai',  'Balai Desa Sememu',          '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ', false),
  ('Nguter',          'Utara',   'Mas Doni Prasetyo',  'Selasa & Jumat, 19.30 - Selesai', 'Lapangan Desa Nguter',        '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5', false),
  ('Madurejo',        'Utara',   'Mas Agung Wibowo',   'Rabu & Sabtu, 16.00 - Selesai',   'Halaman MI Madurejo',         '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E', false),
  ('Selokanyar',      'Utara',   'Mas Rudi Hartanto',  'Senin & Kamis, 16.00 - Selesai',  'Balai Desa Selokanyar',       '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ', false),
  ('Pasirian',        'Pusat',   'Mas Heri Setiawan',  'Senin & Kamis, 19.30 - Selesai',  'Halaman SDN Pasirian 01',     '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5', true),
  ('Condro',          'Pusat',   'Mas Ahmad Fauzi',    'Rabu & Sabtu, 19.30 - Selesai',   'Balai Desa Condro',           '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E', false),
  ('Kalibendo',       'Pusat',   'Mas Eko Santoso',    'Selasa & Jumat, 16.00 - Selesai', 'Lapangan Kalibendo',          '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ', false),
  ('Bades',           'Selatan', 'Mas Wahyu Nugroho',  'Senin & Kamis, 19.30 - Selesai',  'Balai Desa Bades',            '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5', false),
  ('Bago',            'Selatan', 'Mas Bambang Wijaya', 'Selasa & Jumat, 16.00 - Selesai', 'Lapangan Desa Bago',          '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E', false),
  ('Selok Awar-Awar', 'Selatan', 'Mas Firmansyah',     'Rabu & Sabtu, 19.30 - Selesai',   'Balai Desa Selok Awar-Awar',  '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ', false),
  ('Gondoruso',       'Selatan', 'Mas Slamet Riyadi',  'Senin & Kamis, 16.00 - Selesai',  'Lapangan Gondoruso',          '', '', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5', false)
) AS v(nama, sektor, ketua_nama, jadwal, lokasi, whatsapp, instagram, image_url, is_pusat)
WHERE NOT EXISTS (
  SELECT 1 FROM rayon r WHERE r.nama = v.nama
);

-- STEP 3: Cek hasil
SELECT id, nama, sektor, ketua_nama, whatsapp, instagram FROM rayon ORDER BY sektor, nama;
