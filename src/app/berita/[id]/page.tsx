"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS } from '../../../data/berita';
import { ArrowLeft, Bookmark, CalendarDays, Share2 } from 'lucide-react';

export default function DetailBerita({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);
  
  const article = POSTS.find(p => p.id === id);

  if (!article) {
    notFound();
  }

  return (
    <>
        {/* Article Header */}
        <section className="relative h-[340px] sm:h-[400px] md:h-[450px] flex items-end justify-start overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt={article.judul} src={article.img} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-gutter relative z-10 w-full pb-lg sm:pb-xl">
            <div className="flex items-center gap-xs sm:gap-sm mb-sm sm:mb-md flex-wrap">
              <span className="bg-primary text-on-primary px-3 py-1 rounded text-caption font-bold">{article.kategori}</span>
              <span className="text-white/80 text-xs sm:text-label-md flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {article.tanggal}</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg text-white leading-tight mb-sm sm:mb-md">
              {article.judul}
            </h1>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-xl bg-surface">
          <div className="max-w-4xl mx-auto px-gutter">
            <article className="prose prose-lg prose-red max-w-none prose-headings:font-display-sm prose-headings:text-on-surface prose-p:text-on-surface-variant prose-a:text-primary">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </article>
            
            <div className="mt-2xl pt-lg border-t border-outline-variant/30 flex justify-between items-center">
              <Link href="/berita" className="flex items-center gap-xs text-primary font-bold hover:text-primary/80 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Berita
              </Link>
              <div className="flex gap-sm">
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
