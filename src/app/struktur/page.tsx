import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Dumbbell, Megaphone, Network, Shield, Sparkles, User } from 'lucide-react';

export default function StrukturPage() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />
      <main>

        {/* Hero Section */}
        <section className="relative h-[320px] sm:h-[380px] md:h-[400px] flex items-center justify-center text-center px-4 sm:px-gutter overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Struktur Organisasi" src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <nav className="flex justify-center mb-2 sm:mb-sm gap-xs text-white/70 text-xs sm:text-label-md">
              <a className="hover:text-white transition-colors" href="/">Beranda</a>
              <span>/</span>
              <span className="text-white">Struktur</span>
            </nav>
            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-display-lg text-white mb-2 sm:mb-md leading-tight">Struktur Organisasi</h1>
            <p className="text-sm sm:text-base md:text-body-lg text-white/90">Sinergi kepemimpinan yang berlandaskan persaudaraan dan disiplin untuk mewujudkan visi Persaudaraan Setia Hati Terate Ranting Pasirian.</p>
          </div>
        </section>

        {/* Top Leadership */}
        <section className="py-xl max-w-max-width mx-auto px-gutter">
          <div className="flex flex-col items-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-xl text-center">Ketua & Wakil Ketua Ranting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full max-w-4xl">
              {/* Ketua Ranting */}
              <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-md border-4 border-tertiary">
                  <img alt="Kangmas Supriadi" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2wX_jJsYmPn_GMEazdvTvdHItb_Qh6yUUAXzQ4yMVHhhwgNoDSIUHqtNwu6CSdn_6FWBoFIktz0drySnhZ_7KThk_t63kSggFX4cTzcr9M8rP-g4M6BZB8ZD_VLDCWM06vSNbs4gmqjou5OOMX6LzJqaxrG7h7PeDdArK7P0PavoP3jeTsiSkp3JJrsYhNqkMN9MKJgKMYFCwbOVUgvVA6CmJYkZiHEiFvrGBjFAqtV4TBHufKQop9csjlDDD8-Nt099FLYpNr36B" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Kangmas Supriadi</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-md">Ketua Ranting Pasirian</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Bertanggung jawab penuh atas arah kebijakan dan pengembangan organisasi di wilayah Ranting Pasirian.</p>
              </div>
              {/* Wakil Ketua Ranting */}
              <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-md border-4 border-outline-variant bg-surface-container flex items-center justify-center">
                  <User className="w-6 h-6 text-on-surface-variant" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">[Nama Wakil Ketua]</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-md">Wakil Ketua Ranting</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Mendampingi Ketua dalam menjalankan roda organisasi dan mengoordinasikan bidang-bidang internal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Board (Pengurus Harian) */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-max-width mx-auto px-gutter">
            <h2 className="font-headline-md text-headline-md text-primary mb-xl text-center">Pengurus Harian</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-5xl mx-auto">
              {/* Sekretaris 1 */}
              <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-md border-2 border-primary">
                  <img alt="Kangmas Ahmad F." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7kDod3MIhN-Hkh5BVtRYQTRg3CziETSUggovoSA03VFb-rdYa2F7zUwdYNn3JeRzJU27w_siykyWsTBlzZCJ1g20kz1-43VrBFkMOGvomIHXGZE9KtEHgzHf0AhqoYM_OQSHkyIR2UWYgu0yEGahPjjfdEmuSXv29EkAVLXlpJI9cqyA9nUzNb8h4qs-tlo8G2cuij_gC_c5mf-GuVUwG47Pa7ysG6TJGXD90HOkKlWc0PPxH7mKLeRNr7s7cBdT2JUQoACaJTd4v" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Kangmas Ahmad F.</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-sm">Sekretaris 1</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Mengelola administrasi pusat dan korespondensi strategis organisasi.</p>
              </div>
              {/* Sekretaris 2 */}
              <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-md border-2 border-primary bg-surface-container flex items-center justify-center">
                  <User className="w-6 h-6 text-on-surface-variant" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">[Nama Sekretaris 2]</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-sm">Sekretaris 2</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Mendukung teknis administrasi dan dokumentasi kegiatan harian.</p>
              </div>
              {/* Bendahara 1 */}
              <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-md border-2 border-primary">
                  <img alt="Kangmas Budi H." className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyw0nktl-G9Ub9INOMqrwhqF94IYMWaSE9hNINAfwlKe9R_ZqPwqhwwlj98oiAVACW1doV7lY7pmDR6UTYffxAlYqzXPNEvV0gZ0zYU5AvXaUhABfaIhTs5LA70JG7WKgABgGKuy9JnV-7AWGaiXlyjRRQ3ABdPOGllUmfLVz99Dun40hiHUG1Kcizqgd5uyNXSMym6r2qb4vY4N2fxC03g-09sJcHc8xr2PD27BUwA82cN5jzhxDK60ANruv_2ibQMVBoZil8vd48" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Kangmas Budi H.</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-sm">Bendahara 1</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Bertanggung jawab atas pengelolaan dana pusat dan anggaran strategis.</p>
              </div>
              {/* Bendahara 2 */}
              <div className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-md border-2 border-primary bg-surface-container flex items-center justify-center">
                  <User className="w-6 h-6 text-on-surface-variant" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">[Nama Bendahara 2]</h3>
                <p className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-sm">Bendahara 2</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Mengelola catatan keuangan operasional dan iuran anggota.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Departments/Division Section */}
        <section className="py-xl max-w-max-width mx-auto px-gutter">
          <h2 className="font-headline-md text-headline-md text-primary mb-xl text-center">Bidang & Divisi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[
              { icon: Dumbbell, title: 'Bidang Teknik', desc: 'Fokus pada pengembangan kurikulum latihan, teknik pencak silat, dan standar kompetensi atlet.' },
              { icon: Network, title: 'Bidang Organisasi', desc: 'Mengatur koordinasi antar rayon, pengembangan keanggotaan, dan kepatuhan terhadap AD/ART.' },
              { icon: Megaphone, title: 'Bidang Humas', desc: 'Menjalin hubungan dengan masyarakat, instansi pemerintah, serta pengelolaan media komunikasi.' },
              { icon: Sparkles, title: 'Bidang Kerohanian', desc: 'Memperdalam pemahaman nilai-nilai spiritual dan budi luhur sebagai inti dari ajaran SH Terate.' },
              { icon: Shield, title: 'Bidang PAMTER', desc: 'Satuan pengamanan Terate yang bertugas menjaga ketertiban, keamanan internal, dan marwah organisasi.' },
            ].map((bidang, idx) => (
              <div key={idx} className="bg-surface p-lg rounded-xl shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-300 border border-outline-variant/30">
                <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center mb-md">
                  <bidang.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">{bidang.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{bidang.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
