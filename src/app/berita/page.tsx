"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowRight, ChevronLeft, ChevronRight, Search, SearchX, X } from 'lucide-react';

import { POSTS } from '../../data/berita';

const POPULAR = [
  {
    id: 7,
    tanggal: '10 Mei 2024',
    judul: 'Sejarah Singkat PSHT di Wilayah Pasirian',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcgZd5w5VdBzd7r_KTvhZWcLg81oFEy93_tQDMQJ4ViaSzN5hpv55grzLPTfmx3fbRKS6IQ4_T1lvwG4n7K65-vi0kyfK9ST1GpDXdXv7lpqc47WeRaR4IxxaE4y4QkUUr1aM4CCi1L3PoexeG1Nh_fjSrqte3JkABSZVi4JfOS3wQq60IB3f8PCvGjnpBOd3jjPK46iNW1Ww44ymQpPKL9yfad2pF_flRzzqvL8ozGXbB-vCndI3zbAwQzDeVQmJI9VVRj7Fwum6z',
  },
  {
    id: 8,
    tanggal: '05 Mei 2024',
    judul: 'Tips Persiapan Fisik Sebelum Tes Kenaikan Tingkat',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp3Z5sfFAIZckEhmJvk4ToX2UIw_QFZiNIoG2cFiI8vg3WRWC1XALHkUGeHvtpLU_cyE7MdBHRujf70RKaBMD-21JJIWFORwCapn9a2HMc_1RrDcOdg8ImkD47DssHnP8zsxrs2VNsNNTjClleifAtGixNuiNFqZ8n_1dkxvst-WfBBSZ95zgnajyPf4nFKIt-jQch85-tCq66C04Ybkb8HA3I4dXSV_Fm6Wx5nJLFTOQoxVNBUxvWTeSE242FHCYrwrvOu-dDJvG3',
  },
];

const KATEGORI_LIST = [
  { label: 'Semua Berita', value: '' },
  { label: 'Prestasi', value: 'prestasi' },
  { label: 'Kegiatan', value: 'kegiatan' },
  { label: 'Sosial', value: 'sosial' },
];

const PAGE_SIZE = 4;

export default function BeritaPage() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeKat, setActiveKat] = useState('');
  const [page, setPage] = useState(1);

  const nonFeatured = POSTS.filter(p => !p.featured);
  const featured = POSTS.find(p => p.featured)!;

  const filtered = nonFeatured.filter(p => {
    const matchKat = !activeKat || p.cat === activeKat;
    const matchSearch = !search || p.judul.toLowerCase().includes(search.toLowerCase());
    return matchKat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleKat = (val: string) => {
    setActiveKat(val);
    setPage(1);
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />
      <main>

        {/* Hero Section */}
        <section className="relative h-[320px] sm:h-[380px] md:h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Warta dan Kegiatan" src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="max-w-max-width mx-auto px-4 sm:px-gutter relative z-10 w-full text-center flex flex-col items-center">
            <nav className="flex justify-center mb-2 sm:mb-sm gap-xs text-white/70 text-xs sm:text-label-md">
              <a className="hover:text-white transition-colors" href="/">Beranda</a>
              <span>/</span>
              <span className="text-white">Berita</span>
            </nav>
            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg text-white mb-2 sm:mb-md leading-tight">Warta &amp; Kegiatan</h1>
            <p className="text-sm sm:text-base md:text-body-lg text-white/90 max-w-2xl mx-auto">
              Informasi terkini mengenai prestasi, kegiatan sosial, dan pengumuman resmi dari PSHT Ranting Pasirian.
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-lg bg-surface border-b border-outline-variant/30">
          <div className="max-w-max-width mx-auto px-gutter">
            <div className="flex flex-col md:flex-row gap-md items-center">
              <div className="relative flex-grow w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all"
                  placeholder="Cari berita..."
                  type="text"
                  value={searchInput}
                  onChange={e => { setSearchInput(e.target.value); if (e.target.value === '') handleSearch(); }}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="w-full md:w-auto flex items-center gap-sm">
                <button
                  onClick={handleSearch}
                  className="bg-primary text-on-primary px-lg py-sm rounded-lg font-bold hover:bg-primary/90 transition-colors whitespace-nowrap font-label-md text-label-md"
                >
                  Cari
                </button>
                <select
                  className="w-full md:w-56 py-3 px-4 rounded-lg bg-surface-container-low border border-outline-variant/30 focus:border-primary outline-none font-body-md cursor-pointer"
                  value={activeKat}
                  onChange={e => handleKat(e.target.value)}
                >
                  {KATEGORI_LIST.map((kat) => (
                    <option key={kat.value} value={kat.value}>{kat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {search && (
              <div className="mt-md flex items-center">
                <button
                  onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs"
                >
                  <X className="w-4 h-4" />
                  Hapus pencarian "{search}"
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-xl bg-surface">
          <div className="max-w-max-width mx-auto px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">

              {/* Content Area */}
              <div className="lg:col-span-8 space-y-xl">

                {/* Featured Post */}
                {featured && (
                  <div className="bg-surface rounded-2xl overflow-hidden shadow-lg shadow-black/10 border border-outline-variant/30 group cursor-pointer transition-shadow hover:shadow-xl hover:shadow-black/20">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                          alt="Featured News"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={featured.img}
                        />
                        <div className="absolute top-4 left-4 bg-primary text-on-primary px-sm py-1 rounded font-label-md text-caption font-bold">
                          {featured.kategori}
                        </div>
                      </div>
                      <div className="p-lg flex flex-col justify-center">
                      <p className="font-label-md text-label-md text-on-surface-variant mb-xs">{featured.tanggal}</p>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-tight mb-md">
                          {featured.judul}
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-lg">{featured.ringkasan}</p>
                        <Link
                          href={`/berita/${featured.id}`}
                          className="text-primary font-bold flex items-center gap-xs hover:gap-sm transition-all font-label-md text-label-md w-fit"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* News Grid */}
                {paginated.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {paginated.map(post => (
                      <Link
                        key={post.id}
                        href={`/berita/${post.id}`}
                        className="bg-surface rounded-xl overflow-hidden shadow-md shadow-black/10 border border-outline-variant/30 group cursor-pointer hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 block"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={post.img}
                            alt={post.judul}
                          />
                          <div className="absolute top-4 left-4 bg-primary text-on-primary px-sm py-1 rounded font-label-md text-caption font-bold">
                            {post.kategori}
                          </div>
                        </div>
                        <div className="p-md">
                          <p className="font-label-md text-label-md text-on-surface-variant mb-xs">{post.tanggal}</p>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-tight mb-sm">
                            {post.judul}
                          </h3>
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{post.ringkasan}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-xl text-on-surface-variant">
                    <SearchX className="w-12 h-12 mb-md mx-auto block" />
                    <p className="font-body-lg text-body-lg">Tidak ada berita yang cocok.</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-xs pt-lg">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${page === n
                          ? 'bg-primary text-on-primary shadow-md'
                          : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                          }`}
                      >
                        {n}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-xl">

                {/* Popular Posts */}
                <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 border border-outline-variant/30">
                  <h4 className="font-label-md text-label-md text-primary font-bold mb-md uppercase tracking-widest">Berita Terpopuler</h4>
                  <div className="space-y-md">
                    {POPULAR.map((p, i) => (
                      <Link
                        key={i}
                        href={`/berita/${p.id}`}
                        className="flex gap-md group w-full text-left"
                      >
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-outline-variant/30">
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            src={p.img}
                            alt={p.judul}
                          />
                        </div>
                        <div>
                          <span className="font-label-md text-caption text-on-surface-variant block">{p.tanggal}</span>
                          <h5 className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                            {p.judul}
                          </h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Join Banner */}
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] group shadow-md shadow-black/10">
                  <img
                    alt="Join Banner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_7vDUf3WkWsrX4s5kr8gFBUOtNx3Ppmm5nYbysgZ4otJz0tljB-Np2y5FCaq8k-H-CxchXR9FFw0yCS_5dSQe5ajqnj9SkuAEI9VuoZtfDdXN9v2YKuqLVhNrv6opWc57aA6jlz1gu87l1zMgfgMzVOeNuzJMfS0o38hifU1shsMmOMVITX4ARcH1PnqIVrVrHCIY490JwKOIRZnXaxkenxud47eMEdSPs9qZ-MvQlz16t3H_CER6kEQltgx9RPTiUFAhGELqKD_2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-lg text-on-primary">
                    <h4 className="font-headline-sm text-headline-sm mb-xs">Bergabung Bersama Kami</h4>
                    <p className="font-body-md text-body-md text-white/70">
                      Daftarkan diri Anda sekarang untuk menjadi bagian dari keluarga besar PSHT Pasirian.
                    </p>
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}