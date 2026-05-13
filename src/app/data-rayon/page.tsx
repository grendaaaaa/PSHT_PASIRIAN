"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Clock3, MapPin, MessageCircle, Search, SearchX, User, Users } from 'lucide-react';
import HeroSection from '../../components/ui/HeroSection';
import { supabase } from '@/lib/supabase';

interface Rayon {
  id: string;
  nama: string;
  sektor: string;
  ketua_nama: string;
  jadwal: string;
  lokasi: string;
  image_url: string;
  is_pusat: boolean;
  whatsapp?: string;
  instagram?: string;
}

const PAGE_SIZE = 6;

const SECTOR_BADGE: Record<string, string> = {
  Utara: 'bg-blue-50 text-blue-800',
  Pusat: 'bg-amber-50 text-amber-800',
  Selatan: 'bg-teal-50 text-teal-800',
};

const SECTORS = ['Utara', 'Pusat', 'Selatan'];

function RayonCard({ rayon }: { rayon: Rayon }) {
  // Format WhatsApp Link
  const waNumber = rayon.whatsapp?.replace(/[^0-9]/g, '');
  const waLink = waNumber ? `https://wa.me/${waNumber}` : null;

  // Format Instagram Link
  const igUsername = rayon.instagram?.replace('@', '');
  const igLink = igUsername ? `https://instagram.com/${igUsername}` : null;

  return (
    <div className="bg-surface-bright border border-outline-variant/40 rounded-2xl overflow-hidden shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-500 group flex flex-col h-full">
      {/* Gambar */}
      <div className="relative h-44 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={rayon.image_url || 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069'}
          alt={`Lokasi latihan Rayon ${rayon.nama}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`font-label-md text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${SECTOR_BADGE[rayon.sektor] ?? 'bg-white/90 text-gray-800'}`}>
            Sektor {rayon.sektor}
          </span>
          {rayon.is_pusat && (
            <span className="bg-tertiary text-on-primary px-2.5 py-1 rounded-full font-label-md text-xs font-bold uppercase shadow-sm">
              Pusat
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-headline-sm text-xl text-primary font-bold mb-4 group-hover:text-primary transition-colors">{rayon.nama}</h3>
        
        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center gap-3 text-on-surface-variant">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/50">Ketua Rayon</span>
              <span className="font-label-md text-sm font-semibold text-on-surface">{rayon.ketua_nama}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-on-surface-variant">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
              <Clock3 className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/50">Jadwal Latihan</span>
              <span className="font-label-md text-sm text-on-surface">{rayon.jadwal}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 text-on-surface-variant">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant/50">Lokasi</span>
              <span className="font-label-md text-sm text-on-surface leading-snug line-clamp-2">{rayon.lokasi}</span>
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-2 pt-4 border-t border-outline-variant/30">
          <a 
            href={waLink || '#'} 
            target={waLink ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              waLink 
                ? 'bg-[#25D366] text-white hover:bg-[#128C7E] shadow-sm hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-95' 
                : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed grayscale'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a 
            href={igLink || '#'} 
            target={igLink ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              igLink 
                ? 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:shadow-lg hover:shadow-[#dc2743]/20 active:scale-95' 
                : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed grayscale'
            }`}
          >
            <Camera className="w-4 h-4" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default function DataRayonPage() {
  const [allRayons, setAllRayons] = useState<Rayon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);

  useEffect(() => {
    async function fetchRayon() {
      setLoading(true);
      const { data, error } = await supabase
        .from('rayon')
        .select('*')
        .order('nama');

      if (!error && data && data.length > 0) {
        setAllRayons(data as Rayon[]);
      }
      setLoading(false);
    }
    fetchRayon();
  }, []);

  const filtered = allRayons.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.nama.toLowerCase().includes(q) || (r.sektor ?? '').toLowerCase().includes(q) || r.lokasi.toLowerCase().includes(q);
    const matchSector = !sectorFilter || r.sektor === sectorFilter;
    return matchSearch && matchSector;
  });

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Data Rayon"
        description="Informasi lengkap mengenai sebaran wilayah latihan, kepengurusan, dan jadwal kegiatan resmi di seluruh wilayah Kecamatan Pasirian."
        imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCktuaEfTkzXjACJFkfkkZixMF9LY6PaBh3jV9yvPSMxWYJxRBh5ddv_4csQcyoy-dUSqgLmY-iO0eIc4tVP6hXBEnpVIbFQOqNX_GBtud0x6W2B0F61n-9c8xtbBlGFx1gLjfj0Z0USiMqRFiKbYqkr21zHtLn_HGG4_CgG2BrYZxH3zufWJPPkyjnVhWkciVcvG2k4_m2wPmXV2F5cvpDR3xQxLWff9wzqTG5nZagcgpundAjXG8SIq-lCgFkzJoaYOyywvrMw8X9"
        imageAlt="Data Rayon PSHT Pasirian"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Data Rayon' }]}
        maxWidthClass="max-w-3xl"
      />

      {/* Statistics */}
      <section className="relative z-20 -mt-14 sm:-mt-16 md:-mt-20 pt-0 pb-sm sm:pb-md bg-transparent">
        <div className="max-w-max-width mx-auto px-4 sm:px-gutter">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-surface-bright p-4 sm:p-8 rounded-xl shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 text-center flex flex-col items-center justify-center border border-outline-variant/40">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-1.5 sm:mb-2 block" />
              <div className="text-xl sm:text-3xl font-bold text-on-surface leading-tight">
                {loading ? '...' : allRayons.length}
              </div>
              <div className="text-xs sm:text-sm font-medium text-on-surface-variant uppercase tracking-wide sm:tracking-wider">Total Rayon</div>
            </div>
            <div className="bg-surface-bright p-4 sm:p-8 rounded-xl shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 text-center flex flex-col items-center justify-center border border-outline-variant/40">
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
          <p className="text-on-surface-variant font-label-md text-label-md mt-2">
            {loading ? 'Memuat data...' : `${filtered.length} rayon ditemukan`}
          </p>
        </div>
      </section>

      {/* Grid Rayon */}
      <section className="py-xl bg-surface">
        <div className="max-w-max-width mx-auto px-gutter">
          {loading ? (
            <div className="text-center py-xl text-on-surface-variant">
              <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-md" />
              <p className="font-body-lg text-body-lg">Memuat data rayon...</p>
            </div>
          ) : filtered.length === 0 ? (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {group.map(rayon => (
                      <RayonCard key={rayon.id} rayon={rayon} />
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
      <section className="py-xl bg-gradient-to-r from-[#3d5558] via-[#576F72] to-[#3d5558] text-white font-sans relative overflow-hidden">
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
    </>
  );
}