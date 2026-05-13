import React from 'react';
import { Dumbbell, Megaphone, Network, Shield, Sparkles, User, Briefcase, Users } from 'lucide-react';
import HeroSection from '../../components/ui/HeroSection';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function StrukturPage() {
  // Fetch from two tables: pengurus (for INTI/HARIAN) and bidang_organisasi (for divisions)
  const [{ data: pengurus }, { data: bidangDivisi }] = await Promise.all([
    supabase.from('pengurus').select('*').order('urutan'),
    supabase.from('bidang_organisasi').select('*').order('id')
  ]);

  const inti = pengurus?.filter(p => p.tipe_pengurus === 'INTI') || [];
  const harian = pengurus?.filter(p => p.tipe_pengurus === 'HARIAN') || [];
  const bidang = bidangDivisi || [];

  return (
    <>
      {/* ... (Hero and Top Leadership remain same) ... */}
      {/* Hero Section */}
      <HeroSection
        title="Struktur Organisasi"
        description="Sinergi kepemimpinan yang berlandaskan persaudaraan dan disiplin untuk mewujudkan visi Persaudaraan Setia Hati Terate Ranting Pasirian."
        imageSrc="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Struktur Organisasi"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Struktur' }]}
        maxWidthClass="max-w-3xl"
      />

      {/* Top Leadership */}
      <section className="py-xl max-w-max-width mx-auto px-gutter">
        <div className="flex flex-col items-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-xl text-center">Ketua & Wakil Ketua Ranting</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-gutter w-full max-w-4xl">
            {inti.length > 0 ? inti.map(p => (
              <div key={p.id} className="bg-surface-bright p-lg rounded-xl shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 border border-outline-variant/40 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-md border-4 border-tertiary flex items-center justify-center bg-surface-container">
                  {p.image_url ? (
                    <img alt={p.nama} className="w-full h-full object-cover" src={p.image_url} />
                  ) : (
                    <User className="w-8 h-8 text-on-surface-variant" />
                  )}
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">{p.nama}</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-md">{p.jabatan}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{p.deskripsi_tugas}</p>
              </div>
            )) : (
              <p className="text-on-surface-variant col-span-2 text-center">Data pengurus inti belum ditambahkan.</p>
            )}
          </div>
        </div>
      </section>

      {/* Daily Board (Pengurus Harian) */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-max-width mx-auto px-gutter">
          <h2 className="font-headline-md text-headline-md text-primary mb-xl text-center">Pengurus Harian</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-gutter max-w-5xl mx-auto">
            {harian.length > 0 ? harian.map(p => (
              <div key={p.id} className="bg-surface-bright p-lg rounded-xl shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 border border-outline-variant/40 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-md border-2 border-primary bg-surface-container flex items-center justify-center">
                  {p.image_url ? (
                    <img alt={p.nama} className="w-full h-full object-cover" src={p.image_url} />
                  ) : (
                    <User className="w-6 h-6 text-on-surface-variant" />
                  )}
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">{p.nama}</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-sm">{p.jabatan}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{p.deskripsi_tugas}</p>
              </div>
            )) : (
              <p className="text-on-surface-variant col-span-2 text-center">Data pengurus harian belum ditambahkan.</p>
            )}
          </div>
        </div>
      </section>

      {/* Departments/Division Section */}
      <section className="py-xl max-w-max-width mx-auto px-gutter">
        <h2 className="font-headline-md text-headline-md text-primary mb-xl text-center">Bidang & Divisi</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-gutter">
          {bidang.length > 0 ? bidang.map((b) => {
            // Icon Mapping logic
            const IconComponent = (() => {
              switch (b.icon_name) {
                case 'Dumbbell': return Dumbbell;
                case 'Megaphone': return Megaphone;
                case 'Network': return Network;
                case 'Shield': return Shield;
                case 'Sparkles': return Sparkles;
                case 'Users': return Users;
                default: return Briefcase;
              }
            })();


            return (
              <div key={b.id} className="bg-surface-bright p-5 rounded-xl shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/15 transition-all duration-300 border border-outline-variant/40 flex flex-col h-full">
                <div className="flex flex-col items-center text-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    {b.image_url ? (
                      <img src={b.image_url} alt="icon" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <IconComponent className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <h3 className="font-headline-sm text-lg text-primary font-bold leading-tight">
                    {b.nama.replace('Bidang ', '').replace('BIDANG ', '')}
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant text-center leading-relaxed">{b.deskripsi}</p>
              </div>
            );

          }) : (
            <p className="text-on-surface-variant col-span-3 text-center">Data bidang belum ditambahkan.</p>
          )}
        </div>
      </section>

    </>
  );
}
