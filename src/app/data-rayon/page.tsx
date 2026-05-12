"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Camera, Clock3, MapPin, MessageCircle, Search, SearchX, User, Users } from 'lucide-react';

const ALL_RAYONS = [
  { nama: 'Sememu', sektor: 'Utara', ketua: 'Mas Suharto', jadwal: 'Senin & Kamis, 19.30 - Selesai', lokasi: 'Balai Desa Sememu', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ' },
  { nama: 'Nguter', sektor: 'Utara', ketua: 'Mas Doni Prasetyo', jadwal: 'Selasa & Jumat, 19.30 - Selesai', lokasi: 'Lapangan Desa Nguter', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5' },
  { nama: 'Madurejo', sektor: 'Utara', ketua: 'Mas Agung Wibowo', jadwal: 'Rabu & Sabtu, 16.00 - Selesai', lokasi: 'Halaman MI Madurejo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E' },
  { nama: 'Selokanyar', sektor: 'Utara', ketua: 'Mas Rudi Hartanto', jadwal: 'Senin & Kamis, 16.00 - Selesai', lokasi: 'Balai Desa Selokanyar', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ' },
  { nama: 'Pasirian', sektor: 'Pusat', ketua: 'Mas Heri Setiawan', jadwal: 'Senin & Kamis, 19.30 - Selesai', lokasi: 'Halaman SDN Pasirian 01', isPusat: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5' },
  { nama: 'Condro', sektor: 'Pusat', ketua: 'Mas Ahmad Fauzi', jadwal: 'Rabu & Sabtu, 19.30 - Selesai', lokasi: 'Balai Desa Condro', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E' },
  { nama: 'Kalibendo', sektor: 'Pusat', ketua: 'Mas Eko Santoso', jadwal: 'Selasa & Jumat, 16.00 - Selesai', lokasi: 'Lapangan Kalibendo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ' },
  { nama: 'Bades', sektor: 'Selatan', ketua: 'Mas Wahyu Nugroho', jadwal: 'Senin & Kamis, 19.30 - Selesai', lokasi: 'Balai Desa Bades', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5' },
  { nama: 'Bago', sektor: 'Selatan', ketua: 'Mas Bambang Wijaya', jadwal: 'Selasa & Jumat, 16.00 - Selesai', lokasi: 'Lapangan Desa Bago', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhD6l2gzzLwOG39Jm1BDhMYJF8_RJwyYzsvm3mNTTv6znuC4P07_l3AkGOskTZV0H1aroTFrK-wFDQMeAoPJDK9amR33da8hUI5aWroB_GdevECKjrlE0C34X-38yG4bJtSOHEX9ExqIa_2uBnw8QwUhYzVpma5flffmq57a5uvGlUPMK3TfG7znnDwtMm4LG0a_vJxb1kPv5ptRJhzm-OvOhzfqvG3fJ0m4jH7iSwzwFWAwRiNQUfcF9NpxieVRcK4PQ01EW8bY5E' },
  { nama: 'Selok Awar-Awar', sektor: 'Selatan', ketua: 'Mas Firmansyah', jadwal: 'Rabu & Sabtu, 19.30 - Selesai', lokasi: 'Balai Desa Selok Awar-Awar', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2xtRptYHmt_X0OAD2e7R9I7jilurdyGuV8K48dURQKIvh6OiMB67znu7euD-CS7AhBmenVhYu3Sa5g_oO9EsgxsfBoZW_pIVH3pAPeHVyuFJpQJ9kz5LQzwNLpcPuIoxiJmL-vas04AIrz9NkG2pU9iBDC-Y5pmlnPQOOkv2kRtQKBne7obx-VqHsI5m3jaR7pZRRiV8M0NV2qL3OUuTB3V6TeSgLs9RZAdIsmnPTuq19igr16HAJ8EDVpwODSIea59NLACeZglpJ' },
  { nama: 'Gondoruso', sektor: 'Selatan', ketua: 'Mas Slamet Riyadi', jadwal: 'Senin & Kamis, 16.00 - Selesai', lokasi: 'Lapangan Gondoruso', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyDH41frjlbPNLSCJBzBLUQGr2OstOYCYyn4r0lokj_e_FGR8URyxQFh0sodIwmKOCgF2phnGv-rl0nDGg2RDH2RbwCeTHaVX7fKMO0p7tjKinA2A6KVBYf2kT0uG2gKzr0ZR4_KK-RbHFM-NLIRYraPJ32fYUI9_HbFP8FI4eJU4EB6lkMZ2FR3AG64zZ3g3KvIYbOTakQ1Kmt3UyT5_FjSOM1Vycby5sGhZ5HyokmNqK5KdKSZ43q-mof5JaXRqrIPESUWgBUd5' },
];

const PAGE_SIZE = 6;

const SECTOR_BADGE: Record<string, string> = {
  Utara: 'bg-blue-50 text-blue-800',
  Pusat: 'bg-amber-50 text-amber-800',
  Selatan: 'bg-teal-50 text-teal-800',
};

const SECTORS = ['Utara', 'Pusat', 'Selatan'];

function RayonCard({ rayon }: { rayon: typeof ALL_RAYONS[0] }) {
  return (
    <div className="bg-surface border border-outline-variant/30 rounded-xl p-md shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 group">
      {/* Gambar */}
      <div className="relative h-48 rounded-lg overflow-hidden mb-md">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={rayon.img}
          alt={`Lokasi latihan Rayon ${rayon.nama}`}
        />
        {rayon.isPusat && (
          <span className="absolute top-4 right-4 bg-tertiary text-on-primary px-sm py-1 rounded-full font-label-md text-label-md font-bold uppercase">
            Pusat
          </span>
        )}
        <span className={`absolute top-4 left-4 font-label-md text-label-md font-bold px-sm py-1 rounded-full ${SECTOR_BADGE[rayon.sektor]}`}>
          Sektor {rayon.sektor}
        </span>
      </div>

      {/* Info */}
      <div className="mb-lg">
        <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">{rayon.nama}</h3>
        <div className="space-y-xs">
          <div className="flex items-center gap-xs text-on-surface-variant">
            <User className="w-[18px] h-[18px]" />
            <span className="font-label-md text-label-md">{rayon.ketua}</span>
          </div>
          <div className="flex items-center gap-xs text-on-surface-variant">
            <Clock3 className="w-[18px] h-[18px]" />
            <span className="font-label-md text-label-md">{rayon.jadwal}</span>
          </div>
          <div className="flex items-start gap-xs text-on-surface-variant">
            <MapPin className="w-[18px] h-[18px] mt-0.5 shrink-0" />
            <span className="font-label-md text-label-md leading-snug">{rayon.lokasi}</span>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex gap-sm pt-md border-t border-outline-variant/30">
        <a href="#" className="flex-1 flex items-center justify-center gap-xs bg-primary text-on-primary py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all">
          <MessageCircle className="w-[18px] h-[18px]" />
          WhatsApp
        </a>
        <a href="#" className="flex-1 flex items-center justify-center gap-xs border border-outline-variant text-primary py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-all">
          <Camera className="w-[18px] h-[18px]" />
          Instagram
        </a>
      </div>
    </div>
  );
}

export default function DataRayonPage() {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = ALL_RAYONS.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.nama.toLowerCase().includes(q) || r.sektor.toLowerCase().includes(q) || r.lokasi.toLowerCase().includes(q);
    const matchSector = !sectorFilter || r.sektor === sectorFilter;
    return matchSearch && matchSector;
  });

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />
      <main>

        {/* Hero Section */}
        <section className="relative h-[320px] sm:h-[380px] md:h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Data Rayon PSHT Pasirian" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCktuaEfTkzXjACJFkfkkZixMF9LY6PaBh3jV9yvPSMxWYJxRBh5ddv_4csQcyoy-dUSqgLmY-iO0eIc4tVP6hXBEnpVIbFQOqNX_GBtud0x6W2B0F61n-9c8xtbBlGFx1gLjfj0Z0USiMqRFiKbYqkr21zHtLn_HGG4_CgG2BrYZxH3zufWJPPkyjnVhWkciVcvG2k4_m2wPmXV2F5cvpDR3xQxLWff9wzqTG5nZagcgpundAjXG8SIq-lCgFkzJoaYOyywvrMw8X9" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 text-center text-white px-4 sm:px-gutter max-w-3xl flex flex-col items-center">
            <nav className="flex justify-center mb-2 sm:mb-sm gap-xs text-white/70 text-xs sm:text-label-md">
              <a className="hover:text-white transition-colors" href="/">Beranda</a>
              <span>/</span>
              <span className="text-white">Data Rayon</span>
            </nav>
            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg text-white mb-2 sm:mb-md leading-tight">Data Rayon</h1>
            <p className="text-sm sm:text-base md:text-body-lg text-white/90">
              Informasi lengkap mengenai sebaran wilayah latihan, kepengurusan, dan jadwal kegiatan resmi di seluruh wilayah Kecamatan Pasirian.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="relative z-20 -mt-14 sm:-mt-16 md:-mt-20 pt-0 pb-sm sm:pb-md bg-transparent">
          <div className="max-w-max-width mx-auto px-4 sm:px-gutter">
            {/* Perubahan: Menghapus max-w-lg agar kartu punya ruang, dan menambah gap yang lebih konsisten */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">

              {/* Card 1 */}
              <div className="bg-surface p-4 sm:p-8 rounded-xl shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 text-center flex flex-col items-center justify-center border border-outline-variant/20">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-1.5 sm:mb-2 block" />
                <div className="text-xl sm:text-3xl font-bold text-on-surface leading-tight">11</div>
                <div className="text-xs sm:text-sm font-medium text-on-surface-variant uppercase tracking-wide sm:tracking-wider">Total Rayon</div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface p-4 sm:p-8 rounded-xl shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 text-center flex flex-col items-center justify-center border border-outline-variant/20">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-1.5 sm:mb-2 block" />
                <div className="text-xl sm:text-3xl font-bold text-on-surface leading-tight">850+</div>
                <div className="text-xs sm:text-sm font-medium text-on-surface-variant uppercase tracking-wide sm:tracking-wider">Total Warga</div>
              </div>

            </div>
          </div>
        </section>
        {/* Search & Filter */}
        <section className="pt-sm pb-md sm:py-lg bg-surface-container-low/60 border-b border-outline-variant/20 -mt-1">
          <div className="max-w-max-width mx-auto px-gutter">
            <div className="flex flex-col md:flex-row gap-sm md:gap-md items-center">
              <div className="relative flex-grow w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all"
                  placeholder="Cari nama rayon, wilayah, atau lokasi..."
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShown(PAGE_SIZE); }}
                />
              </div>
              <select
                className="w-full md:w-52 py-3 px-4 rounded-lg bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none font-body-md cursor-pointer"
                value={sectorFilter}
                onChange={e => { setSectorFilter(e.target.value); setShown(PAGE_SIZE); }}
              >
                <option value="">Semua Sektor</option>
                <option value="Utara">Sektor Utara</option>
                <option value="Pusat">Sektor Pusat</option>
                <option value="Selatan">Sektor Selatan</option>
              </select>
            </div>
            <p className="text-on-surface-variant font-label-md text-label-md mt-2">{filtered.length} rayon ditemukan</p>
          </div>
        </section>

        {/* Grid Rayon */}
        <section className="py-xl bg-surface">
          <div className="max-w-max-width mx-auto px-gutter">
            {filtered.length === 0 ? (
              <div className="text-center py-xl text-on-surface-variant">
                <SearchX className="w-12 h-12 mb-md mx-auto block" />
                <p className="font-body-lg text-body-lg">Tidak ada rayon yang cocok dengan pencarian.</p>
              </div>
            ) : (
              SECTORS.map(sektor => {
                const group = visible.filter(r => r.sektor === sektor);
                if (!group.length) return null;
                return (
                  <div key={sektor} className="mb-xl">
                    <div className="flex items-center gap-md mb-lg">
                      <h2 className="font-headline-sm text-headline-sm text-primary">Sektor {sektor}</h2>
                      <div className="flex-1 h-px bg-outline-variant/40"></div>
                      <span className="font-label-md text-label-md text-on-surface-variant">{group.length} rayon</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                      {group.map(rayon => (
                        <RayonCard key={rayon.nama} rayon={rayon} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}

            {hasMore && (
              <div className="mt-xl flex justify-center">
                <button
                  onClick={() => setShown(prev => prev + PAGE_SIZE)}
                  className="border border-outline-variant px-xl py-md rounded-lg font-bold hover:bg-surface-container transition-all active:scale-95 text-on-surface font-label-md text-label-md"
                >
                  Muat Lebih Banyak Rayon ({filtered.length - shown} tersisa)
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-xl bg-gradient-to-r from-[#6b1f1f] via-[#7f1d1d] to-[#6b1f1f] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto px-gutter text-center">
            <span className="inline-block font-label-md text-label-md uppercase tracking-widest text-on-primary/80 border border-white/30 rounded-full px-lg py-xs mb-lg">
              Pendaftaran Siswa Baru
            </span>
            <h2 className="font-headline-md text-headline-md text-on-primary leading-tight mb-md">Ingin Bergabung dengan Kami?</h2>
            <div className="w-12 h-[3px] bg-tertiary rounded-full mx-auto mb-lg" />
            <p className="font-body-lg text-body-lg text-on-primary/80 leading-relaxed">
              Pendaftaran siswa baru dibuka sepanjang tahun. Silakan hubungi pengurus rayon terdekat atau kunjungi sekretariat ranting untuk informasi lebih lanjut.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}