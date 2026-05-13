'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, MessageCircle, Play, Send, Share2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-gradient-to-r from-[#3d5558] via-[#576F72] to-[#3d5558] text-white font-sans">

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 px-12 py-12 border-b border-white/10">

        {/* Brand */}
        <div className="md:pr-8 md:border-r border-white/10 mb-8 md:mb-0">
          <h2 className="text-lg font-bold tracking-widest mb-3">PSHT PASIRIAN</h2>
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            Lembaga pendidikan bela diri dan karakter yang berdedikasi tinggi
            terhadap pelestarian tradisi Pencak Silat Indonesia.
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-md flex items-center justify-center bg-[#576F72] text-white text-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-md flex items-center justify-center bg-[#7D9D9C] text-white text-sm hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-md flex items-center justify-center bg-[#E4DCCF] text-[#576F72] text-sm hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigasi */}
        <div className="px-8 border-r border-white/10 mb-8 md:mb-0">
          <h3 className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/45 mb-4">
            Navigasi
          </h3>
          <Link href="/" className="block text-sm text-white/80 hover:text-white py-1 transition-colors">Beranda</Link>
          <Link href="/profil" className="block text-sm text-white/80 hover:text-white py-1 transition-colors">Profil</Link>
          <Link href="/struktur" className="block text-sm text-white/80 hover:text-white py-1 transition-colors">Struktur</Link>
        </div>

        {/* Informasi */}
        <div className="px-8 border-r border-white/10 mb-8 md:mb-0">
          <h3 className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/45 mb-4">
            Informasi
          </h3>
          <Link href="/data-rayon" className="block text-sm text-white/80 hover:text-white py-1 transition-colors">Rayon</Link>
          <Link href="/berita" className="block text-sm text-white/80 hover:text-white py-1 transition-colors">Berita</Link>
          <Link href="/kontak" className="block text-sm text-white/80 hover:text-white py-1 transition-colors">Kontak</Link>
        </div>

        {/* Peta Pasirian */}
        <div className="px-8">
          <h3 className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/45 mb-4">
            Peta Pasirian
          </h3>
          <div className="rounded-xl overflow-hidden border border-white/15 bg-black/20">
            <iframe
              title="Peta Pasirian"
              src="https://maps.google.com/maps?q=Pasirian%2C%20Lumajang&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-40"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Sekretariat row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-12 py-6 border-b border-white/10">
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/45 mb-2">
            Sekretariat
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Jl. Raya Pasirian No. 45, Pasirian, Lumajang, Jawa Timur<br />
            Email: info@pshtpasirian.or.id
          </p>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Bagikan"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            aria-label="Website"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/25 text-center py-4 px-12">
        <p className="text-xs text-white/45 tracking-wide">
          © 2024 PSHT Pasirian. Institutional Trust &amp; Tradition.&nbsp;&nbsp;|&nbsp;&nbsp;Kebijakan Privasi
        </p>
      </div>
    </footer>
  );
}