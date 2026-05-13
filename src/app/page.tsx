import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Dumbbell, Handshake, History, MapPin, Palette, Shield, Sparkles, Trophy, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const STATISTICS = [
  { number: "15+", label: "Rayon Aktif", icon: MapPin },
  { number: "1.200+", label: "Siswa & Warga", icon: Users },
  { number: "45+", label: "Prestasi Daerah", icon: Trophy },
  { number: "1922", label: "Tahun Berdiri", icon: History },
];

const PILAR_PSHT = [
  { icon: Handshake, title: "Persaudaraan", desc: "Ikatan batin yang kuat tanpa memandang suku, agama, dan status sosial." },
  { icon: Dumbbell, title: "Olahraga", desc: "Membangun kebugaran jasmani sebagai fondasi diri yang kuat dan sehat." },
  { icon: Palette, title: "Seni", desc: "Keindahan gerakan Pencak Silat yang menjadi warisan budaya nusantara." },
  { icon: Shield, title: "Beladiri", desc: "Kemampuan melindungi diri dan orang lain dengan teknik yang terlatih." },
  { icon: Sparkles, title: "Kerohanian", desc: "Pembinaan spiritual untuk keseimbangan lahir dan batin." },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544098485-2a2ed6da40ba?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576485290814-1c72aa4faa8e?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=500&auto=format&fit=crop",
];
export default async function BerandaPage() {
  const [{ data: gallery }, { data: statsData }] = await Promise.all([
    supabase.from('galeri').select('*').order('created_at', { ascending: false }),
    supabase.from('statistik_ranting').select('*')
  ]);

  const galleryImages = gallery || [];
  const s = statsData?.[0] || { total_warga: 0, total_siswa: 0, total_prestasi: 0, total_rayon: 0 };

  const dynamicStats = [
    { number: `${s.total_rayon || 0}`, label: "Rayon Aktif", icon: MapPin },
    { number: `${(s.total_warga || 0) + (s.total_siswa || 0)}+`, label: "Siswa & Warga", icon: Users },
    { number: `${s.total_prestasi || 0}+`, label: "Prestasi Daerah", icon: Trophy },
    { number: "1922", label: "Tahun Berdiri", icon: History },
  ];

  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/images/foto_bareng.jpeg"
            alt="PSHT Ranting Pasirian"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 text-center">

    {/* Logo Ranting */}
    <div className="mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
      <Image
        src="/images/psht_logo_ranting.png"
        alt="Logo PSHT Ranting Pasirian"
        width={120}
        height={120}
        className="object-contain mx-auto"
        priority
      />
    </div>

    <p className="text-white/85 text-sm sm:text-base md:text-lg leading-tight mb-2 max-w-2xl">
      Selamat Datang di Website
    </p>

    <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight mb-3 max-w-4xl">
      PSHT RANTING PASIRIAN
    </h1>

    <p className="text-white/85 text-sm sm:text-base md:text-lg leading-tight mb-5 max-w-2xl">
      Pusat Informasi, Kegiatan, dan Komunikasi Warga PSHT Ranting Pasirian .
    </p>

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Link
        href="/profil"
        className="inline-flex items-center justify-center bg-[#7D9D9C] text-white hover:bg-[#576F72] px-8 py-3 rounded-full font-bold transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#7D9D9C]/30 text-sm sm:text-base"
      >
        Tentang Kami
      </Link>

      <Link
        href="/data-rayon"
        className="inline-flex items-center justify-center border-2 border-white/60 text-white hover:bg-white/10 hover:border-white px-8 py-3 rounded-full font-bold transition-all hover:-translate-y-0.5 text-sm sm:text-base"
      >
        Lihat Rayon
      </Link>
    </div>
  </div>
</header>

      {/* Statistics */}
      <section className="relative z-20 max-w-max-width mx-auto px-4 sm:px-gutter -mt-12 sm:-mt-16 mb-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-md">
          {dynamicStats.map((stat, idx) => (
            <div key={idx} className="bg-surface-bright p-4 sm:p-6 md:p-8 rounded-xl shadow-xl shadow-black/5 border border-outline-variant/40 text-center hover:-translate-y-1 transition-all duration-300 group">
              <stat.icon className="w-6 h-6 text-primary/20 mb-sm mx-auto block group-hover:text-primary/40 transition-colors" />
              <span className="block text-primary font-bold text-xl sm:text-2xl md:text-headline-md mb-xs">{stat.number}</span>
              <span className="text-on-surface-variant text-[11px] sm:text-label-md uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-xl max-w-max-width mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          <div>
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-widest mb-3 block">Institusi Tradisi</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-md">Tradisi dan Integritas Sejak 1922</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-sm leading-relaxed">
              PSHT Ranting Pasirian berdedikasi melestarikan warisan budaya Pencak Silat dengan standar profesionalisme tinggi. Kami tidak hanya mengajarkan teknik bela diri, tetapi menanamkan nilai moral dan spiritual mendalam.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed">
              Sebagai bagian dari organisasi yang berdiri sejak tahun 1922, kami terus bertransformasi menjadi institusi modern namun tetap memegang teguh asas persaudaraan.
            </p>
            <Link href="/profil" className="inline-flex items-center gap-xs text-primary font-bold font-label-md hover:gap-sm transition-all">
              Selengkapnya tentang kami
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-xl translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
            <img className="rounded-xl w-full shadow-2xl shadow-black/20 object-cover h-[450px]" alt="Master Pencak Silat" src="/images/foto_kangmass.png" />
          </div>
        </div>
      </section>

      {/* 5 Pilar PSHT */}
      <section className="py-xl bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-tertiary rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7D9D9C] rounded-full blur-[150px]" />
        </div>
        <div className="max-w-max-width mx-auto px-gutter relative z-10">
          <div className="text-center mb-xl">
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-widest mb-3 block">Lima Aspek Utama</span>
            <h2 className="font-headline-md text-headline-md">Pilar Ajaran PSHT</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-md">
            {PILAR_PSHT.map((pilar, idx) => (
              <div
                key={idx}
                className="bg-primary-container/10 border border-white/10 rounded-xl p-3 sm:p-md text-left sm:text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-start sm:items-center shadow-lg shadow-black/20"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mb-3 sm:mb-md rounded-xl bg-tertiary/10 flex items-center justify-center group-hover:bg-tertiary/20 transition-colors shrink-0">
                  <pilar.icon className="w-6 h-6 text-tertiary" />
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-1 sm:mb-xs">{pilar.title}</h3>
                <p className="text-on-primary/70 font-body-md text-body-md leading-relaxed sm:leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rayon Preview */}
      <section className="py-xl bg-surface-container-low border-t border-outline-variant/20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-gutter relative z-10">
          <span className="text-tertiary font-label-md text-label-md uppercase tracking-widest mb-3 block">Pusat Pelatihan</span>
          <h2 className="font-headline-md text-headline-md text-primary mb-md">Tersebar di {s.total_rayon || 0}+ Rayon</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">
            PSHT Ranting Pasirian saat ini menaungi {s.total_rayon || 0} rayon aktif yang tersebar di berbagai desa.
            Temukan lokasi tempat latihan atau pusat pelatihan terdekat dari tempat tinggal Anda untuk bergabung bersama kami.
          </p>
          <Link
            href="/data-rayon"
            className="inline-flex items-center gap-xs bg-primary text-on-primary font-bold px-8 py-3 rounded-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all"
          >
            Lihat Semua Daftar Rayon
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Gallery Slider */}
      <section className="py-xl bg-surface overflow-hidden">
        <div className="max-w-max-width mx-auto px-gutter mb-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md">
            <div>
              <span className="text-tertiary font-label-md text-label-md uppercase tracking-widest mb-3 block">Dokumentasi</span>
              <h2 className="font-headline-md text-headline-md text-primary">Galeri Foto Ranting</h2>
            </div>
            <div className="flex gap-2 pb-1">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <div className="h-1 w-4 bg-outline-variant rounded-full"></div>
              <div className="h-1 w-4 bg-outline-variant rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Container */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 pt-4 gap-4 px-gutter snap-x snap-mandatory scrollbar-hide no-scrollbar">
            {galleryImages.length > 0 ? (
              galleryImages.map((img: any, idx: number) => (
                <div 
                  key={img.id || idx} 
                  className="flex-none w-[280px] sm:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden snap-center shadow-xl shadow-black/10 border border-outline-variant/30 group"
                >
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Dokumentasi PSHT" 
                    src={img.image_url} 
                  />
                </div>
              ))
            ) : (
              <div className="w-full py-xl text-center text-on-surface-variant font-body-md">
                Belum ada foto dokumentasi.
              </div>
            )}
            {/* Spacer for padding at the end of scroll */}
            <div className="flex-none w-px h-full"></div>
          </div>
        </div>
      </section>

    </>
  );
}
