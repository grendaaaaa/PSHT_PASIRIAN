"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Search, SearchX, X, Loader2 } from 'lucide-react';
import HeroSection from '../../components/ui/HeroSection';
import { supabase } from '@/lib/supabase';

// Remove static POPULAR array as we'll use dynamic data from 'posts' state

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
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('berita')
        .select('*')
        .order('published_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchBerita();
  }, []);

  const nonFeatured = posts.filter(p => p.is_featured !== 'true' && p.is_featured !== true);
  const featured = posts.find(p => p.is_featured === 'true' || p.is_featured === true);

  const filtered = nonFeatured.filter(p => {
    // const matchKat = !activeKat || p.kategori_id === activeKat; // Simplified for now
    const matchSearch = !search || p.judul?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>

        {/* Hero Section */}
        <HeroSection
          title="Warta & Kegiatan"
          description="Informasi terkini mengenai prestasi, kegiatan sosial, dan pengumuman resmi dari PSHT Ranting Pasirian."
          imageSrc="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop"
          imageAlt="Warta dan Kegiatan"
          breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Berita' }]}
        />

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
                          src={featured.image_url || 'https://via.placeholder.com/800x400'}
                        />
                        <div className="absolute top-4 left-4 bg-primary text-on-primary px-sm py-1 rounded font-label-md text-caption font-bold">
                          Utama
                        </div>
                      </div>
                      <div className="p-lg flex flex-col justify-center">
                      <p className="font-label-md text-label-md text-on-surface-variant mb-xs">
                        {featured.published_at ? new Date(featured.published_at).toLocaleDateString('id-ID') : '-'}
                      </p>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-tight mb-md">
                          {featured.judul}
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-lg">{featured.ringkasan}</p>
                        <Link
                          href={`/berita/${featured.slug || featured.id}`}
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
                  <div className="grid grid-cols-2 gap-3 sm:gap-md">
                    {paginated.map(post => (
                      <Link
                        key={post.id}
                        href={`/berita/${post.slug || post.id}`}
                        className="group bg-surface-bright rounded-xl border border-outline-variant/40 overflow-hidden shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 block"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={post.image_url || 'https://via.placeholder.com/400x300'}
                            alt={post.judul}
                          />
                        </div>
                        <div className="p-md">
                          <p className="font-label-md text-label-md text-on-surface-variant mb-xs">
                            {post.published_at ? new Date(post.published_at).toLocaleDateString('id-ID') : '-'}
                          </p>
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
                <div className="bg-surface-bright p-lg rounded-xl shadow-md shadow-black/5 border border-outline-variant/40">
                  <h4 className="font-headline-sm text-on-surface mb-md pb-xs border-b border-outline-variant/30">Berita Populer</h4>
                  <div className="space-y-md">
                    {posts.slice(0, 4).map((p, i) => (
                        <Link
                        key={i}
                        href={`/berita/${p.slug || p.id}`}
                        className="flex gap-md group w-full text-left"
                      >
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-outline-variant/30">
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            src={p.image_url || 'https://via.placeholder.com/150'}
                            alt={p.judul}
                          />
                        </div>
                        <div>
                          <span className="font-label-md text-[10px] text-on-surface-variant block uppercase tracking-wider">
                            {p.published_at ? new Date(p.published_at).toLocaleDateString('id-ID') : '-'}
                          </span>
                          <h5 className="font-label-md text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
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

    </>
  );
}