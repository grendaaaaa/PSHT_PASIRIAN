// Data rayon hardcode — digunakan sebagai fallback jika Supabase kosong atau belum diisi
// Jangan hapus! Update data via Dashboard Admin → Data Rayon

export interface RayonData {
  id?: string | number;
  nama: string;
  sektor?: string;
  ketua_nama: string;
  jadwal: string;
  lokasi: string;
  image_url: string;
  is_pusat?: boolean | string;
}

// Mapping nama rayon → sektor (karena kolom sektor mungkin belum ada di DB lama)
export const RAYON_SEKTOR_MAP: Record<string, string> = {
  Sememu: 'Utara',
  Nguter: 'Utara',
  Madurejo: 'Utara',
  Selokanyar: 'Utara',
  Pasirian: 'Pusat',
  Condro: 'Pusat',
  Kalibendo: 'Pusat',
  Bades: 'Selatan',
  Bago: 'Selatan',
  'Selok Awar-Awar': 'Selatan',
  Gondoruso: 'Selatan',
};

export const HARDCODE_RAYON: RayonData[] = [
  {
    nama: 'Sememu',
    sektor: 'Utara',
    ketua_nama: 'Mas Suharto',
    jadwal: 'Senin & Kamis, 19.30 - Selesai',
    lokasi: 'Balai Desa Sememu',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ',
    is_pusat: false,
  },
  {
    nama: 'Nguter',
    sektor: 'Utara',
    ketua_nama: 'Mas Doni Prasetyo',
    jadwal: 'Selasa & Jumat, 19.30 - Selesai',
    lokasi: 'Lapangan Desa Nguter',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5',
    is_pusat: false,
  },
  {
    nama: 'Madurejo',
    sektor: 'Utara',
    ketua_nama: 'Mas Agung Wibowo',
    jadwal: 'Rabu & Sabtu, 16.00 - Selesai',
    lokasi: 'Halaman MI Madurejo',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E',
    is_pusat: false,
  },
  {
    nama: 'Selokanyar',
    sektor: 'Utara',
    ketua_nama: 'Mas Rudi Hartanto',
    jadwal: 'Senin & Kamis, 16.00 - Selesai',
    lokasi: 'Balai Desa Selokanyar',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ',
    is_pusat: false,
  },
  {
    nama: 'Pasirian',
    sektor: 'Pusat',
    ketua_nama: 'Mas Heri Setiawan',
    jadwal: 'Senin & Kamis, 19.30 - Selesai',
    lokasi: 'Halaman SDN Pasirian 01',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5',
    is_pusat: true,
  },
  {
    nama: 'Condro',
    sektor: 'Pusat',
    ketua_nama: 'Mas Ahmad Fauzi',
    jadwal: 'Rabu & Sabtu, 19.30 - Selesai',
    lokasi: 'Balai Desa Condro',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E',
    is_pusat: false,
  },
  {
    nama: 'Kalibendo',
    sektor: 'Pusat',
    ketua_nama: 'Mas Eko Santoso',
    jadwal: 'Selasa & Jumat, 16.00 - Selesai',
    lokasi: 'Lapangan Kalibendo',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ',
    is_pusat: false,
  },
  {
    nama: 'Bades',
    sektor: 'Selatan',
    ketua_nama: 'Mas Wahyu Nugroho',
    jadwal: 'Senin & Kamis, 19.30 - Selesai',
    lokasi: 'Balai Desa Bades',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5',
    is_pusat: false,
  },
  {
    nama: 'Bago',
    sektor: 'Selatan',
    ketua_nama: 'Mas Bambang Wijaya',
    jadwal: 'Selasa & Jumat, 16.00 - Selesai',
    lokasi: 'Lapangan Desa Bago',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E',
    is_pusat: false,
  },
  {
    nama: 'Selok Awar-Awar',
    sektor: 'Selatan',
    ketua_nama: 'Mas Firmansyah',
    jadwal: 'Rabu & Sabtu, 19.30 - Selesai',
    lokasi: 'Balai Desa Selok Awar-Awar',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ',
    is_pusat: false,
  },
  {
    nama: 'Gondoruso',
    sektor: 'Selatan',
    ketua_nama: 'Mas Slamet Riyadi',
    jadwal: 'Senin & Kamis, 16.00 - Selesai',
    lokasi: 'Lapangan Gondoruso',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5',
    is_pusat: false,
  },
];
